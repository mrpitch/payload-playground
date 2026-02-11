import type { Doc } from '@payload-types'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import {
	BreadcrumbNav,
	DocsPrevNextNav,
	NavigationProvider,
	TableOfContents,
	ThreedotsNav,
	ThreedotsNavSkeleton,
} from '@/components/layout/nav'
import { Badge } from '@/components/ui/badge'
import { Icon } from '@/components/ui/custom/icons'
import { Typography } from '@/components/ui/custom/typography'
import { RefreshRouteOnSave } from '@/components/utils/refresh-route-onsave'
import { RichText, type TRichTextData } from '@/components/utils/richtext'
import { getSession } from '@/lib/actions/get-session'
import { TGenerateMeta } from '@/lib/types'
import { generateMeta } from '@/lib/utils/generateMeta'
import { getCollectionBySlug, getSlugs } from '@/lib/utils/getCollections'
import { getNavData } from '@/lib/utils/navigation'
import { resolvePrevNextFromDocsNav } from '@/lib/utils/navigation'
import { processToc } from '@/lib/utils/navigation/processToc'

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
	const user = await getSession()
	const docs = await getCollectionBySlug({
		collection: 'docs',
		slug: slug || '',
		draft: isEnabled,
	})

	if (!docs) {
		notFound()
	}

	const { title, publishedAt, categories, copy, excerpt, author } = docs as Doc

	const tocData = processToc({ copy })

	// Load navigation data to compute previous/next for docs
	const navData = await getNavData()
	const { previous, next } = resolvePrevNextFromDocsNav(navData.docsNav, slug || '')

	return (
		<div className="@container/docs">
			<RefreshRouteOnSave />
			<header className="sticky top-0 z-50 flex shrink-0 items-center gap-2 border-b bg-background p-4">
				<BreadcrumbNav pageTitle={title} slug={slug ?? ''} />
				<div className="ml-auto">
					<Suspense fallback={<ThreedotsNavSkeleton />}>
						<NavigationProvider>
							<ThreedotsNav user={user} context="app" />
						</NavigationProvider>
					</Suspense>
				</div>
			</header>

			<TableOfContents items={tocData} type="mobile" />
			{/* Main content area */}
			<div className="flex gap-4 p-4">
				{/* Article content */}
				<article className="flex-1 xl:max-w-4xl">
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
								className="h-6 w-6 rounded-full border border-muted-foreground"
							/>
						)}
						<span className="text-sm font-medium">
							{typeof author !== 'number' ? `${author?.firstName} ${author?.lastName}` : ''}
						</span>
						<span className="text-xs text-muted-foreground"> • </span>
						{publishedAt && (
							<time dateTime={publishedAt} className="text-xs text-muted-foreground">
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
					{copy ? (
						<RichText
							data={copy as TRichTextData}
							className="prose w-full prose-headings:scroll-mt-36 @5xl/docs:prose-headings:scroll-mt-20"
						/>
					) : null}
					{/* Previous / Next navigation */}
					<DocsPrevNextNav previous={previous} next={next} />
				</article>

				{/* Desktop TOC - sidebar */}
				<TableOfContents items={tocData} />
			</div>
		</div>
	)
}
