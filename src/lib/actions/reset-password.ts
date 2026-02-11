'use server'
import config from '@payload-config'
import { getPayload } from 'payload'

import { getUser } from '@/lib/actions/user'
import { resetPasswordFormSchema } from '@/lib/schema/reset-password.schema'
import type { TResetPasswordForm } from '@/lib/types'
import { formMessages } from '@/lib/utils/constants'
import { rateLimit } from '@/lib/utils/rate-limit'

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

	const { isLimited } = rateLimit(email, { prefix: 'reset-pw', limit: 3, windowSec: 86400 })
	if (isLimited) {
		return { error: 'Too many reset requests. Please try again tomorrow.' }
	}

	const existingUser = await getUser(email)

	if (!existingUser || !existingUser.email) {
		return { error: emailNotExists }
	}

	const payload = await getPayload({ config })

	await payload.forgotPassword({
		collection: 'users', // required
		data: {
			email: email,
		},
	})
	return { success: emailResetSend }
}
