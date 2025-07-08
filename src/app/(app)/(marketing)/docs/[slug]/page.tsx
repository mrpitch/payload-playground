import { Fragment } from 'react'

import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { generateMeta } from '@/lib/utils/generateMeta'
import { getSlugs, getCollectionBySlug } from '@/lib/utils/getCollections'

import type { Doc } from '@payload-types'
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
import { Toc } from '@/components/layout/toc'

// Utility function to build breadcrumb trail
function buildBreadcrumbTrail(folder: any): Array<{ id: number; name: string; slug?: string }> {
	const trail: Array<{ id: number; name: string; slug?: string }> = []

	// Recursively traverse up the folder hierarchy
	let currentFolder = folder
	while (currentFolder) {
		trail.unshift({
			id: currentFolder.id,
			name: currentFolder.name,
			slug: currentFolder.slug || currentFolder.name?.toLowerCase().replace(/\s+/g, '-'),
		})
		currentFolder = currentFolder.folder
	}

	return trail
}

// Component to render breadcrumbs
function FolderBreadcrumb({ folder, pageTitle }: { folder: any; pageTitle: string }) {
	const breadcrumbTrail = buildBreadcrumbTrail(folder)

	return (
		<Breadcrumb className="mb-8">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">
						<Icon iconName="house" />
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />

				{/* Render all folders as links */}
				{breadcrumbTrail.map((item, index) => (
					<Fragment key={item.id}>
						<BreadcrumbItem>
							<BreadcrumbLink href={`/${item.slug}`}>{item.name}</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
					</Fragment>
				))}

				{/* Always render the current page as the last item */}
				<BreadcrumbItem>
					<BreadcrumbPage>{pageTitle}</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	)
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
	const { slug } = await paramsPromise
	const { isEnabled } = await draftMode()

	const doc: Doc = await getCollectionBySlug({
		collection: 'docs',
		slug: slug || '',
		draft: isEnabled,
	})

	return generateMeta({ doc: doc } as TGenerateMeta)
}

export async function generateStaticParams() {
	const docs = await getSlugs('docs')

	return (
		docs.docs
			?.filter((doc: Doc) => {
				return doc && 'slug' in doc && typeof doc.slug === 'string'
			})
			.map((doc: Doc) => ({ slug: (doc as { slug: string }).slug })) || []
	)
}

type Args = {
	params: Promise<{
		slug?: string
	}>
}

export default async function Doc({ params: paramsPromise }: Args) {
	const { slug } = await paramsPromise
	const { isEnabled } = await draftMode()
	const docs = await getCollectionBySlug({
		collection: 'docs',
		slug: slug || '',
		draft: isEnabled,
	})

	if (!docs) {
		notFound()
	}

	const { title, publishedAt, categories, layout, thumbnail, excerpt, author, folder } = docs as Doc

	return (
		<>
			<article className="mt-8" id="content-view">
				<RefreshRouteOnSave />
				<Container as="section" className="max-w-5xl 2xl:max-w-5xl">
					{folder && typeof folder !== 'number' && (
						<FolderBreadcrumb folder={folder} pageTitle={title} />
					)}
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
					<div className="mb-6 flex items-center gap-2">
						{typeof author !== 'number' && author?.avatar && typeof author.avatar !== 'number' ? (
							<Image
								src={author.avatar.url ?? '/placeholder.png'}
								alt={author.firstName}
								width={24}
								height={24}
								className="rounded-full"
							/>
						) : (
							<Icon
								iconName="user"
								className="border-muted-foreground h-6 w-6 rounded-full border"
							/>
						)}
						<span className="text-sm font-medium">
							{typeof author !== 'number' ? `${author?.firstName} ${author?.lastName}` : ''}
						</span>
						<span className="text-muted-foreground text-xs"> • </span>
						{publishedAt && (
							<time dateTime={publishedAt} className="text-muted-foreground text-xs">
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
				<Container as="section" id="content" className="max-w-5xl overflow-y-scroll 2xl:max-w-5xl">
					<Typography as="h2" size="2xl" className="mb-4">
						Headline 1
					</Typography>
					<Typography as="p" size="lg">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas deleniti possimus at
						harum delectus quo quia non hic totam! Fuga ullam quaerat velit eum ea omnis itaque
						similique excepturi provident!
					</Typography>
					<Typography as="h3" size="2xl" className="mb-4">
						Sub Headline 1
					</Typography>
					<Typography as="p" size="lg">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas deleniti possimus at
						harum delectus quo quia non hic totam! Fuga ullam quaerat velit eum ea omnis itaque
						similique excepturi provident!
					</Typography>

					<Typography as="h3" size="2xl" className="mb-4">
						Sub Headline 2
					</Typography>
					<Typography as="p" size="lg">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas deleniti possimus at
						harum delectus quo quia non hic totam! Fuga ullam quaerat velit eum ea omnis itaque
						similique excepturi provident!
					</Typography>
					<Typography as="h2" size="2xl" className="mb-4">
						Headline 2
					</Typography>
					<Typography as="p" size="lg">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas deleniti possimus at
						harum delectus quo quia non hic totam! Fuga ullam quaerat velit eum ea omnis itaque
						similique excepturi provident!
					</Typography>
					<Typography as="h2" size="2xl" className="mb-4">
						Headline 3
					</Typography>
					<Typography as="p" size="lg">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas deleniti possimus at
						harum delectus quo quia non hic totam! Fuga ullam quaerat velit eum ea omnis itaque
						similique excepturi provident!
					</Typography>
					<Typography as="h2" size="2xl" className="mb-4">
						Headline 4
					</Typography>
					<Typography as="p" size="lg">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas deleniti possimus at
						harum delectus quo quia non hic totam! Fuga ullam quaerat velit eum ea omnis itaque
						similique excepturi provident!
					</Typography>
					<Typography as="h2" size="2xl" className="mb-4">
						Headline 5
					</Typography>
					<Typography as="p" size="lg">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas deleniti possimus at
						harum delectus quo quia non hic totam! Fuga ullam quaerat velit eum ea omnis itaque
						similique excepturi provident!
					</Typography>
				</Container>
				{/* <RenderBlocks blocks={layout} /> */}
				<Container as="div" className="overflow-x-scroll">
					<pre>{JSON.stringify(docs, null, 2)}</pre>
				</Container>
			</article>
			<aside className="relative mt-8 flex flex-col gap-4">
				<Toc contentId="content" containerId="content" />
			</aside>
		</>
	)
}
