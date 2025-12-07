import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { generateMeta } from '@/lib/utils/generateMeta'
import { getCollectionBySlug, getSlugs } from '@/lib/utils/getCollections'

import type { Page } from '@payload-types'
import type { TGenerateMeta } from '@/lib/types'

import { Typography } from '@/components/ui/custom/typography'

import { RenderBlocks } from '@/components/utils/render-blocks'
import { RefreshRouteOnSave } from '@/components/utils/refresh-route-onsave'
import { Container } from '@/components/ui/custom/container'

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
	const { isEnabled } = await draftMode()
	const { slug = 'home' } = await paramsPromise
	const page = await getCollectionBySlug({
		collection: 'pages',
		slug,
		draft: isEnabled,
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
	const { isEnabled } = await draftMode()
	const { slug = 'home' } = await paramsPromise

	const page = await getCollectionBySlug({
		collection: 'pages',
		slug,
		draft: isEnabled,
	})

	if (!page) {
		notFound()
	}

	const { title, showPageTitle, layout } = page as Page

	return (
		<>
			<RefreshRouteOnSave />
			{showPageTitle ? (
				<Container as="section" className="mt-8 mb-8">
					<Typography as="h1">{title}</Typography>
				</Container>
			) : null}
			<RenderBlocks blocks={layout} />
			{/* <Container as="div" className="overflow-x-scroll">
				<pre>{JSON.stringify(page, null, 2)}</pre>
			</Container> */}
		</>
	)
}
