import { Suspense } from 'react'

import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'

import { generateMeta } from '@/lib/utils/generateMeta'
import { getSlugs, getCollectionBySlug } from '@/lib/utils/getCollections'

import { getSession } from '@/lib/actions/get-session'

import type { Doc } from '@payload-types'
import { TGenerateMeta } from '@/lib/types'

import { RichText } from '@/components/utils/richtext'

import { RefreshRouteOnSave } from '@/components/utils/refresh-route-onsave'

import { Badge } from '@/components/ui/badge'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { Typography } from '@/components/ui/custom/typography'
import { Icon } from '@/components/ui/custom/icons'
import { NavigationProvider } from '@/components/utils/nav-provider.server'
import { ThreedotsNav } from '@/components/layout/nav/threedots-nav'
import { ThreedotsNavSkeleton } from '@/components/layout/nav/threedots-nav'
import { TableOfContents } from '@/components/layout/nav/toc'
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

	const { title, publishedAt, categories, copy, excerpt, author, folder } = docs as Doc

	const tocData = processToc({ copy })

	return (
		<>
			<RefreshRouteOnSave />
			<header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
				{folder && typeof folder !== 'number' && (
					<BreadcrumbNav folder={folder} pageTitle={title} />
				)}
				<div className="ml-auto">
					<Suspense fallback={<ThreedotsNavSkeleton />}>
						<NavigationProvider>
							<ThreedotsNav user={user} context="app" />
						</NavigationProvider>
					</Suspense>
				</div>
			</header>
			<div className="flex gap-4 p-4">
				<div className="flex-1 xl:max-w-4xl">
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
					{copy ? <RichText data={copy} className="prose w-full" /> : null}
					{/* <Container as="div" className="overflow-x-scroll">
					<pre>{JSON.stringify(docs, null, 2)}</pre>
				</Container> */}
				</div>
				<TableOfContents items={tocData} />
			</div>
		</>
	)
}
