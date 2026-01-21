import type { Metadata } from 'next'

import type { Page, Post, Doc } from '@payload-types'

export const generateMeta = async (args: {
	doc: Partial<Page> | Partial<Post> | Partial<Doc> | Partial<Doc> | null
}): Promise<Metadata> => {
	const { doc } = args

	const title = doc?.meta?.title ? doc?.meta?.title + ' | Payload Playground' : 'Payload Playground'
	return {
		description: doc?.meta?.description,
		title,
	}
}
