import type { Post, Category, Page } from '@payload-types'
import type { z } from 'zod'
import { loginFormSchema } from '@/lib/schema/login.schema'
import { registerFormSchema } from '@/lib/schema/register.schema'
import { resetPasswordFormSchema } from '@/lib/schema/reset-password.schema'
import { changePasswordFormSchema } from '@/lib/schema/change-password.schema'
//authentication
export type TLoginForm = z.infer<typeof loginFormSchema>
export type TRegisterForm = z.infer<typeof registerFormSchema>
export type TCreateUser = Pick<
	z.infer<typeof registerFormSchema>,
	'firstName' | 'lastName' | 'email' | 'password'
>
export type TResetPasswordForm = z.infer<typeof resetPasswordFormSchema>
export type TChangePasswordForm = z.infer<typeof changePasswordFormSchema>

export type TGenerateMeta = {
	doc: Post | Page
}

export type TPostMeta = Pick<
	Post,
	'id' | 'title' | 'slug' | 'publishedAt' | 'updatedAt' | 'createdAt' | 'categories'
> & {
	categories?: Array<Pick<Category, 'id' | 'title' | 'slug'>>
}
