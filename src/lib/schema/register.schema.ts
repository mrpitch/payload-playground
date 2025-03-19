import * as z from 'zod'

import { formMessages } from '@/lib/utils/constants'

export const registerFormSchema = z
	.object({
		firstName: z.string(),
		lastName: z.string(),
		email: z.string().email(),
		password: z.string().min(4, {
			message: formMessages.validation.passwordLength,
		}),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: formMessages.validation.passwordNotMatch,
		path: ['confirmPassword'],
	})
