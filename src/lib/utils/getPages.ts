import { unstable_cache } from 'next/cache'

import { getPayload } from 'payload'

import configPromise from '@payload-config'
import type { Config } from '@payload-types'

type TCollection = keyof Config['collections']

const payload = await getPayload({ config: configPromise })

export const getSlugs = async (
	collection: TCollection,
	draft?: boolean,
	revalidate?: number,
	limit?: number,
) => {
	if (!revalidate) {
		revalidate = parseInt(process.env.NEXT_PUBLIC_REVALIDATE || '20')
	}

	const cached = unstable_cache(
		async () => {
			console.log('revalidate', collection)
			return await payload.find({
				collection: collection,
				draft: draft || false,
				limit: limit || 1000,
				overrideAccess: true,
				pagination: false,
				select: {
					slug: true,
				},
			})
		},
		[`collection_slugs_${collection}`],
		{ revalidate: revalidate, tags: [`collection_slugs_${collection}`] },
	)

	return cached()
}

export const queryPageBySlug = async ({
	slug,
	draft,
	revalidate,
}: {
	slug: string
	draft?: boolean
	revalidate?: number
	limit?: number
}) => {
	if (!revalidate) {
		revalidate = parseInt(process.env.NEXT_PUBLIC_REVALIDATE || '20')
	}
	const cached = unstable_cache(
		async () => {
			const result = await payload.find({
				collection: 'pages',
				draft: draft || false,
				overrideAccess: true,
				limit: 1,
				pagination: false,
				where: {
					slug: {
						equals: slug,
					},
				},
			})
			return result.docs?.[0] || null
		},
		[`page_${slug}`],
		{ revalidate: revalidate, tags: [`collection_page_${slug}`] },
	)
	return cached()
}
