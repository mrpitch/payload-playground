import * as z from 'zod'

import { formMessages } from '@/lib/utils/constants'

const {
	validation: { passwordLength, passwordNotMatch },
} = formMessages

export const changePasswordFormSchema = z
	.object({
		password: z.string().min(4, {
			message: passwordLength,
		}),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: passwordNotMatch,
		path: ['confirmPassword'],
	})
