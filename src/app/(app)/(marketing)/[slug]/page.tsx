import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { generateMeta } from '@/lib/utils/generateMeta'
import { getAllPosts, getCollectionBySlug, getSlugs } from '@/lib/utils/getCollections'

import type { Page } from '@payload-types'
import type { TPostMeta, TGenerateMeta } from '@/lib/types'

import { Typography } from '@/components/ui/custom/typography'
import { Badge } from '@/components/ui/badge'

import { RenderBlocks } from '@/components/utils/render-blocks'
import { Container } from '@/components/ui/custom/container'

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
	const { slug = 'home' } = await paramsPromise
	const page = await getCollectionBySlug({
		collection: 'pages',
		slug,
	})

	return generateMeta({ doc: page } as TGenerateMeta)
}

export async function generateStaticParams() {
	const pages = await getSlugs('pages')

	return (
		pages.docs
			?.filter((doc) => {
				return doc && 'slug' in doc && typeof doc.slug === 'string' && doc.slug !== 'home'
			})
			.map((doc) => ({ slug: (doc as { slug: string }).slug })) || []
	)
}

type Args = {
	params: Promise<{
		slug?: string
	}>
}

export default async function Page({ params: paramsPromise }: Args) {
	const { slug = 'home' } = await paramsPromise

	const page = await getCollectionBySlug({
		collection: 'pages',
		slug,
	})

	if (!page) {
		notFound()
	}

	const { title, showPageTitle, layout } = page as Page
	let posts = { docs: [] as TPostMeta[] }
	if (slug === 'blog') {
		posts = (await getAllPosts()) as unknown as { docs: TPostMeta[] }
	}

	return (
		<>
			{showPageTitle ? (
				<Container as="section" className="mt-8 mb-8">
					<Typography as="h1">{title}</Typography>
				</Container>
			) : null}
			<RenderBlocks blocks={layout} />

			{slug === 'blog' && (
				<Container as="section">
					<div className="mt-8">
						<ul>
							{posts.docs?.map((post) => (
								<li key={post.id}>
									<Link href={`/blog/${post.slug}`}>
										<Typography as="h3">{post.title}</Typography>
									</Link>
									<Typography as="p">{post.publishedAt}</Typography>
									<div className="flex-start mt-4 flex gap-2">
										{post.categories?.map(
											(category) =>
												typeof category !== 'number' && (
													<Badge key={category.id} variant="outline">
														{category.title}
													</Badge>
												),
										)}
									</div>
								</li>
							))}
						</ul>
					</div>
				</Container>
			)}
		</>
	)
}
