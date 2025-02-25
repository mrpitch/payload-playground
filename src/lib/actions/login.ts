import * as z from 'zod'

import { formMessages } from '@/lib/utils/constants'

export const loginFormSchema = z.object({
	email: z.string().email({ message: formMessages.validation.emailNotValid }),
	password: z.string(),
})

export type TLoginForm = z.infer<typeof loginFormSchema>

export async function login(data: TLoginForm) {
	const validatedData = loginFormSchema.safeParse(data)

	if (!validatedData.success) {
		return { errors: validatedData.error.flatten() }
	}
	const { email, password } = validatedData.data

	return { errors: { password: 'Invalid password' } }
}
