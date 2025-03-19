'use server'
import { getUser, createUser } from '@/lib/actions/user'
import { registerFormSchema } from '@/lib/schema/register.schema'
import type { TRegisterForm } from '@/lib/types'

import { formMessages } from '@/lib/utils/constants'

export async function register(data: TRegisterForm) {
	const {
		error: { credentialsInvalid, emailInUse },
		success: { emailConfirmationSent },
	} = formMessages

	const validatedData = registerFormSchema.safeParse(data)

	if (!validatedData.success) {
		return { errors: validatedData.error.flatten() }
	}

	const { email, password, firstName, lastName } = validatedData.data
	const existingUser = await getUser(email)

	if (existingUser) {
		return {
			errors: {
				formError: credentialsInvalid,
				fieldErrors: {
					email: [emailInUse],
				},
			},
		}
	}

	await createUser({
		firstName: firstName,
		lastName: lastName,
		email: email,
		password: password,
	})

	return { success: emailConfirmationSent }
}
