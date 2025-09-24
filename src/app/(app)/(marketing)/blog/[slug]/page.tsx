import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'

import { generateMeta } from '@/lib/utils/generateMeta'
import { getSlugs, getCollectionBySlug } from '@/lib/utils/getCollections'

import type { Post } from '@payload-types'
import { TGenerateMeta } from '@/lib/types'

import { RenderBlocks } from '@/components/utils/render-blocks'
import { RefreshRouteOnSave } from '@/components/utils/refresh-route-onsave'

import { Badge } from '@/components/ui/badge'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import { Container } from '@/components/ui/custom/container'
import { Typography } from '@/components/ui/custom/typography'
import { Icon } from '@/components/ui/custom/icons'

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
	const { slug } = await paramsPromise
	const { isEnabled } = await draftMode()

	const page = await getCollectionBySlug({
		collection: 'posts',
		slug: slug || '',
		draft: isEnabled,
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
	const { isEnabled } = await draftMode()
	const post = await getCollectionBySlug({
		collection: 'posts',
		slug: slug || '',
		draft: isEnabled,
	})

	if (!post) {
		notFound()
	}

	const { title, publishedAt, categories, layout, thumbnail, excerpt, author } = post as Post

	return (
		<article className="mt-8">
			<RefreshRouteOnSave />
			<Container as="section" className="mb-12">
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
			</Container>
			<Container as="section" className="max-w-5xl 2xl:max-w-5xl">
				<Breadcrumb className="mb-8">
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="/">
									<Icon iconName="house" />
								</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="/blog">Blog</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{title}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<div className="flex-start mt-4 mb-2 flex gap-2">
					{categories?.map(
						(category) =>
							typeof category !== 'number' && (
								<Badge key={category.id} variant="outline">
									{category.title}
								</Badge>
							),
					)}
				</div>
				<Typography as="h1" size="4xl">
					{title}
				</Typography>
				<div className="text-muted-foreground mb-6 flex items-center gap-2">
					{typeof author !== 'number' && author?.avatar && typeof author.avatar !== 'number' ? (
						<Image
							src={author.avatar.url ?? '/placeholder.png'}
							alt={author.firstName}
							width={24}
							height={24}
							className="rounded-full"
						/>
					) : (
						<Icon iconName="user" className="border-muted-foreground h-6 w-6 rounded-full border" />
					)}
					<span className="text-sm font-medium">
						{typeof author !== 'number' ? `${author?.firstName} ${author?.lastName}` : ''}
					</span>
					<span className="text-xs"> • </span>
					{publishedAt && (
						<time dateTime={publishedAt} className="text-xs">
							{new Date(publishedAt).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'short',
								day: 'numeric',
							})}
						</time>
					)}
				</div>
				{excerpt ? (
					<Typography as="p" size="lg" className="mt-2 italic">
						{excerpt}
					</Typography>
				) : null}
			</Container>
			<RenderBlocks blocks={layout} />
			{/* <Container as="div" className="overflow-x-scroll">
				<pre>{JSON.stringify(post, null, 2)}</pre>
			</Container> */}
		</article>
	)
}
