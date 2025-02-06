import { unstable_cache } from 'next/cache'

import { getPayload } from 'payload'

import configPromise from '@payload-config'
import type { Config } from '@payload-types'

type Global = keyof Config['globals']

const payload = await getPayload({ config: configPromise })

export const getGlobals = (slug: Global, draft?: boolean, revalidate?: number) => {
	if (!revalidate) {
		revalidate = parseInt(process.env.NEXT_PUBLIC_REVALIDATE || '20')
	}

	return unstable_cache(
		async () => {
			console.log('revalidate', slug)
			return await payload.findGlobal({ slug: slug, draft: draft || false })
		},
		[slug],
		{ revalidate: revalidate, tags: [`global_${slug}`] },
	)
}
