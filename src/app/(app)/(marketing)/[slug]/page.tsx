import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { generateMeta } from '@/lib/utils/generateMeta'
import { queryPageBySlug, getSlugs } from '@/lib/utils/getPages'
import { getAllPosts } from '@/lib/utils/getPosts'

import type { Page } from '@payload-types'
import type { TPostMeta } from '@/lib/types/posts'
import { buttonVariants } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { Badge } from '@/components/ui/badge'

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
	const { slug = 'home' } = await paramsPromise
	const page = await queryPageBySlug({
		slug,
	})

	return generateMeta({ doc: page })
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

	const page = await queryPageBySlug({
		slug,
	})

	if (!page) {
		notFound()
	}

	const { title } = page
	let posts = { docs: [] as TPostMeta[] }
	if (slug === 'blog') {
		posts = (await getAllPosts('posts')) as unknown as { docs: TPostMeta[] }
	}
	return (
		<section>
			<Typography as="h1" size="4xl">
				{title}
			</Typography>
			{slug !== 'blog' ? (
				<div className="mt-8 flex gap-4">
					<Link href="/blog" className={buttonVariants()}>
						Blog
					</Link>
					<Link href="/example" className={buttonVariants({ variant: 'outline' })}>
						Example Page
					</Link>
				</div>
			) : null}
			{slug === 'blog' && (
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
			)}
			<div className="mt-8">
				<pre>{JSON.stringify(posts, null, 2)}</pre>
			</div>
		</section>
	)
}
