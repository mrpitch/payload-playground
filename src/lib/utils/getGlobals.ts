import { unstable_cache } from 'next/cache'

import { getPayload } from 'payload'

import configPromise from '@payload-config'
import type { Config } from '@payload-types'

import { revalidate } from '@/lib/utils/constants'

type TGlobal = keyof Config['globals']

type GetGlobalOptions = {
	draft?: boolean
	depth?: number
}

const payload = await getPayload({ config: configPromise })

export const getGlobals = async (slug: TGlobal, options?: GetGlobalOptions) => {
	const draft = options?.draft ?? false
	const depth = options?.depth

	const cacheKey = [`global_${slug}`, `draft_${draft}`, `depth_${depth ?? 'default'}`]

	const cached = unstable_cache(
		async () => {
			return await payload.findGlobal({
				slug,
				draft,
				...(typeof depth === 'number' ? { depth } : {}),
			})
		},
		cacheKey,
		{ revalidate: revalidate, tags: ['global', `global_${slug}`] },
	)

	return cached()
}
