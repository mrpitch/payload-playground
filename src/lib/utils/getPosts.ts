import { unstable_cache } from 'next/cache'

import { getPayload } from 'payload'

import configPromise from '@payload-config'
import type { Config } from '@payload-types'

type TCollection = keyof Config['collections']

const payload = await getPayload({ config: configPromise })

export const queryPostBySlug = async ({
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
				collection: 'posts',
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
		{ revalidate: revalidate, tags: [`collection_${slug}`] },
	)
	return cached()
}

export const getAllPosts = async (
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
				sort: 'title',
				select: {
					slug: true,
					title: true,
					content: true,
					createdAt: true,
					updatedAt: true,
					publishedAt: true,
					categories: true,
				},
			})
		},
		[slug],
		{ revalidate: revalidate, tags: [`collection_${slug}`] },
	)

	return cached()
}
