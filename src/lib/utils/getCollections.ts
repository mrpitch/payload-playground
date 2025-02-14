import { unstable_cache } from 'next/cache'

import { getPayload } from 'payload'

import configPromise from '@payload-config'
import type { Config } from '@payload-types'

import { revalidate } from '@/payload/utils/constants'
type TCollection = keyof Config['collections']

const payload = await getPayload({ config: configPromise })

export const getSlugs = async (collection: TCollection, draft?: boolean, limit?: number) => {
	const cached = unstable_cache(
		async () => {
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
		[`slugs_${collection}`],
		{ revalidate: revalidate, tags: ['slugs', `slugs_${collection}`] },
	)
	return cached()
}

export const getCollectionBySlug = async ({
	collection,
	slug,
	draft,
}: {
	collection: TCollection
	slug: string
	draft?: boolean
	limit?: number
}) => {
	const cached = unstable_cache(
		async () => {
			const result = await payload.find({
				collection: collection,
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
		[`${collection}_${slug}`],
		{ revalidate: revalidate, tags: [`collection_${collection}`, `${collection}_${slug}`] },
	)
	return cached()
}

export const getAllPosts = async (draft?: boolean, limit?: number) => {
	const collection = 'posts'
	const cached = unstable_cache(
		async () => {
			return await payload.find({
				collection: collection,
				draft: draft || false,
				limit: limit || 1000,
				overrideAccess: true,
				depth: 1,
				pagination: false,
				sort: 'title',
				select: {
					slug: true,
					title: true,
					createdAt: true,
					updatedAt: true,
					publishedAt: true,
					categories: true,
					relatedPosts: true,
				},
				populate: {
					categories: {
						title: true,
						slug: true,
					},
				},
			})
		},
		[`all_${collection}`],
		{ revalidate: revalidate, tags: [`collection_${collection}`] },
	)

	return cached()
}
