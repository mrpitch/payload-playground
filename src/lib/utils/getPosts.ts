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
		revalidate = 300 //parseInt(process.env.NEXT_PUBLIC_REVALIDATE || '20')
	}
	const cached = unstable_cache(
		async () => {
			const result = await payload.find({
				collection: 'posts',
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
		[`post_${slug}`],
		{ revalidate: revalidate, tags: [`collection_post_${slug}`] },
	)
	return cached()
}

export const getAllPosts = async (
	collection: TCollection,
	draft?: boolean,
	revalidate?: number,
	limit?: number,
) => {
	if (!revalidate) {
		revalidate = 300 //parseInt(process.env.NEXT_PUBLIC_REVALIDATE || '20')
	}

	const cached = unstable_cache(
		async () => {
			console.log('revalidate1', collection)
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
		['getAllPosts'],
		{ revalidate: revalidate, tags: [`collection_${collection}_getAllPosts`] },
	)

	return cached()
}
