import { unstable_cache } from 'next/cache'

import { getPayload } from 'payload'

import configPromise from '@payload-config'
import type { Config } from '@payload-types'

import { revalidate } from '@/lib/utils/constants'

type TGlobal = keyof Config['globals']

const payload = await getPayload({ config: configPromise })

export const getGlobals = async (slug: TGlobal, draft?: boolean) => {
	const cached = unstable_cache(
		async () => {
			return await payload.findGlobal({ slug: slug, draft: draft || false })
		},
		[`global_${slug}`],
		{ revalidate: revalidate, tags: ['global', `global_${slug}`] },
	)

	return cached()
}
