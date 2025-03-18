'use server'
import { getPayload } from 'payload'
import config from '@payload-config'

import { changePasswordFormSchema } from '@/lib/schema/change-password.schema'
import type { TChangePasswordForm } from '@/lib/types'

import { formMessages } from '@/lib/utils/constants'

export async function changePassword(data: TChangePasswordForm, token: string) {
	const {
		error: { emailNotExists },
		success: { passwordUpdated },
	} = formMessages
	const validatedData = changePasswordFormSchema.safeParse(data)

	if (!validatedData.success) {
		return { errors: validatedData.error.flatten() }
	}
	const { password } = validatedData.data
	const payload = await getPayload({ config })

	// const existingUser = await getUser(email)

	// if (!existingUser) {
	// 	return {
	// 		error: emailNotExists,
	// 	}
	// }

	await payload.resetPassword({
		collection: 'users',
		data: {
			password: password,
			token: token,
		},
		overrideAccess: true,
	})

	return { success: passwordUpdated }
}
