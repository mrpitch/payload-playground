import { unstable_cache } from 'next/cache'

import { getPayload } from 'payload'

import configPromise from '@payload-config'
import type { Config } from '@payload-types'

type TCollection = keyof Config['collections']

const payload = await getPayload({ config: configPromise })

export const getSlugs = async (
	slug: TCollection,
	draft?: boolean,
	revalidate?: number,
	limit?: number,
) => {
	if (!revalidate) {
		revalidate = parseInt(process.env.NEXT_PUBLIC_REVALIDATE || '20')
	}

	const cached = unstable_cache(
		async () => {
			console.log('revalidate', slug)
			return await payload.find({
				collection: slug,
				draft: draft || false,
				limit: limit || 1000,
				overrideAccess: false,
				pagination: false,
				select: {
					slug: true,
				},
			})
		},
		[slug],
		{ revalidate: revalidate, tags: [`pages_${slug}`] },
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
		[slug],
		{ revalidate: revalidate, tags: [`pages_${slug}`] },
	)
	return cached()
}
