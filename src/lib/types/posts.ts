import type { Post, Category } from '@payload-types'

export type TPostMeta = Pick<
	Post,
	'id' | 'title' | 'slug' | 'publishedAt' | 'updatedAt' | 'createdAt' | 'categories'
> & {
	categories?: Array<Pick<Category, 'id' | 'title' | 'slug'>>
}
