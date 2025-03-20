'use server'
import { getPayload } from 'payload'
import config from '@payload-config'

import { getUser } from '@/lib/actions/user'

import { resetPasswordFormSchema } from '@/lib/schema/reset-password.schema'
import type { TResetPasswordForm } from '@/lib/types'

import { formMessages } from '@/lib/utils/constants'

export async function resetPassword(data: TResetPasswordForm) {
	const {
		error: { emailNotExists },
		success: { emailResetSend },
	} = formMessages
	const validatedData = resetPasswordFormSchema.safeParse(data)

	if (!validatedData.success) {
		return { errors: validatedData.error.flatten() }
	}
	const { email } = validatedData.data

	const existingUser = await getUser(email)

	if (!existingUser || !existingUser.email) {
		return { error: emailNotExists }
	}

	const payload = await getPayload({ config })

	// Returned token will allow for a password reset
	const token = await payload.forgotPassword({
		collection: 'users', // required
		data: {
			email: email,
		},
	})
	console.log('url:', `http://localhost:3000/change-password?token=${token}`)

	return { success: emailResetSend }
}
