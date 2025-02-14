import type { Post, Category, Page } from '@payload-types'

export type TGenerateMeta = {
	doc: Post | Page
}

export type TPostMeta = Pick<
	Post,
	'id' | 'title' | 'slug' | 'publishedAt' | 'updatedAt' | 'createdAt' | 'categories'
> & {
	categories?: Array<Pick<Category, 'id' | 'title' | 'slug'>>
}
