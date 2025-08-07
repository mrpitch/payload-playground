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
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { Container } from '@/components/ui/custom/container'
import { Typography } from '@/components/ui/custom/typography'
import { Icon } from '@/components/ui/custom/icons'
import { Toc } from '@/components/layout/toc'

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
	const { slug } = await paramsPromise
	const { isEnabled } = await draftMode()

	const doc = await getCollectionBySlug({
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

	const { title, publishedAt, categories, layout, excerpt, author, folder } = docs as Doc

	return (
		<>
			<article className="mt-8" id="content-view">
				<RefreshRouteOnSave />
				<Container as="section" className="max-w-5xl 2xl:max-w-5xl">
					<div className="mb-8">
						{folder && typeof folder !== 'number' && (
							<BreadcrumbNav folder={folder} pageTitle={title} />
						)}
						<Toc contentId="content" containerId="content" type="mobile" />
					</div>
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
				<Container as="section" id="content" className="max-w-5xl 2xl:max-w-5xl">
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
				<RenderBlocks blocks={layout} />
				{/* <Container as="div" className="overflow-x-scroll">
					<pre>{JSON.stringify(docs, null, 2)}</pre>
				</Container> */}
			</article>

			<Toc contentId="content" containerId="content" type="desktop" />
		</>
	)
}
