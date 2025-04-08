import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { generateMeta } from '@/lib/utils/generateMeta'
import { getSlugs, getCollectionBySlug } from '@/lib/utils/getCollections'

import type { Post } from '@payload-types'
import { TGenerateMeta } from '@/lib/types'

import { RenderBlocks } from '@/components/utils/render-blocks'

import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/custom/container'
import { Typography } from '@/components/ui/custom/typography'

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

	const { title, publishedAt, categories, layout, thumbnail, excerpt } = post as Post

	return (
		<article className="mt-8">
			<Container as="section" className="mb-12">
				<Typography as="h1" size="4xl">
					{title}
				</Typography>
				<Typography as="p">{publishedAt}</Typography>
				<div className="flex-start mt-4 mb-6 flex gap-2">
					{categories?.map(
						(category) =>
							typeof category !== 'number' && (
								<Badge key={category.id} variant="outline">
									{category.title}
								</Badge>
							),
					)}
				</div>
				{thumbnail && typeof thumbnail !== 'number' ? (
					<div
						className="relative isolate mb-4 w-full overflow-hidden rounded-lg"
						style={{ aspectRatio: '10/3' }}
					>
						<div className="bg-secondary absolute inset-0 z-10" style={{ opacity: 0.1 }} />
						<Image
							src={thumbnail.url || ''}
							alt={`Featured image for ${title}`}
							fill
							className="object-cover"
							priority
						/>
					</div>
				) : null}
				{excerpt ? (
					<Typography as="p" size="lg" className="mt-2 italic">
						{excerpt}
					</Typography>
				) : null}
			</Container>
			<RenderBlocks blocks={layout} />
			<Container as="div" className="overflow-x-scroll">
				<pre>{JSON.stringify(post, null, 2)}</pre>
			</Container>
		</article>
	)
}
