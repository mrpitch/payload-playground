'use server'
import { getPayload } from 'payload'
import config from '@payload-config'

import { changePasswordFormSchema } from '@/lib/schema/change-password.schema'
import type { TChangePasswordForm } from '@/lib/types'

import { formMessages } from '@/lib/utils/constants'

export async function changePassword(data: TChangePasswordForm, token: string) {
	const {
		error: { tokenNotExists },
		success: { passwordUpdated },
	} = formMessages
	const validatedData = changePasswordFormSchema.safeParse(data)

	if (!validatedData.success) {
		return { errors: validatedData.error.flatten() }
	}
	const { password } = validatedData.data
	const payload = await getPayload({ config })

	try {
		await payload.resetPassword({
			collection: 'users',
			data: {
				password: password,
				token: token,
			},
			overrideAccess: true,
		})

		return { success: passwordUpdated }
	} catch (error) {
		// Handle invalid token error
		if (
			error instanceof Error &&
			error.message.includes('Token is either invalid or has expired.')
		) {
			return { error: tokenNotExists }
		}
	}
}
