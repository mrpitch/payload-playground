import type { Category } from '@payload-types'
export type TPostMeta = {
	id: number
	title: string
	slug: string
	publishedAt: string
	categories: Category[]
}
