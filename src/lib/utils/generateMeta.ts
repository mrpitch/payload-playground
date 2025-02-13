import type { Metadata } from 'next'

import type { Page, Post } from '@payload-types'

export const generateMeta = async (args: {
	doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
	const { doc } = args

	const title = doc?.meta?.title
		? doc?.meta?.title + ' | Payload Website Template'
		: 'Payload Website Template'

	return {
		description: doc?.meta?.description,
		title,
	}
}
