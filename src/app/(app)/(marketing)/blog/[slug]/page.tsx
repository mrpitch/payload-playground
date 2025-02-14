import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { generateMeta } from '@/lib/utils/generateMeta'
import { getSlugs, getCollectionBySlug } from '@/lib/utils/getCollections'

import type { Post } from '@payload-types'
import { TGenerateMeta } from '@/lib/types'

import { Badge } from '@/components/ui/badge'
import { Typography } from '@/components/ui/typography'

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
	const { slug } = await paramsPromise
	const page = await getCollectionBySlug({
		collection: 'posts',
		slug: slug || '',
	})

	return generateMeta({ doc: page } as TGenerateMeta)
}

export async function generateStaticParams() {
	const posts = await getSlugs('posts')

	return (
		posts.docs
			?.filter((doc) => {
				return doc && 'slug' in doc && typeof doc.slug === 'string'
			})
			.map((doc) => ({ slug: (doc as { slug: string }).slug })) || []
	)
}

type Args = {
	params: Promise<{
		slug?: string
	}>
}

export default async function Post({ params: paramsPromise }: Args) {
	const { slug } = await paramsPromise

	const post = await getCollectionBySlug({
		collection: 'posts',
		slug: slug || '',
	})

	if (!post) {
		notFound()
	}

	const { title, publishedAt, categories } = post as Post

	return (
		<section>
			<Typography as="h1" size="4xl">
				{title}
			</Typography>
			<Typography as="p">{publishedAt}</Typography>
			<div className="flex-start mt-4 flex gap-2">
				{categories?.map(
					(category) =>
						typeof category !== 'number' && (
							<Badge key={category.id} variant="outline">
								{category.title}
							</Badge>
						),
				)}
			</div>

			<div className="mt-8">
				<pre>{JSON.stringify(post, null, 2)}</pre>
			</div>
		</section>
	)
}
