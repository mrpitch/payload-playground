import type { Post, Category, Page } from '@payload-types'
import type { z } from 'zod'
import { loginFormSchema } from '@/lib/actions/login'

//authentication
export type TLoginForm = z.infer<typeof loginFormSchema>

export type TGenerateMeta = {
	doc: Post | Page
}

export type TPostMeta = Pick<
	Post,
	'id' | 'title' | 'slug' | 'publishedAt' | 'updatedAt' | 'createdAt' | 'categories'
> & {
	categories?: Array<Pick<Category, 'id' | 'title' | 'slug'>>
}
