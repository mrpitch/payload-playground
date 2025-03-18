'use server'
import { redirect } from 'next/navigation'

import { getPayload } from 'payload'
import config from '@payload-config'

import { formMessages } from '@/lib/utils/constants'

export async function verifyEmail(token: string) {
	const {
		error: { tokenMissing, tokenNotExists, failedToVerify },
		success: { emailVerified },
	} = formMessages
	let result = false
	let message = ''

	if (!token || typeof token !== 'string') {
		console.log(tokenMissing)
		redirect('/')
	}

	try {
		const payload = await getPayload({ config })

		result = await payload.verifyEmail({
			collection: 'users', // required
			token: token, // the token saved on the user as `_verificationToken`
		})
		if (result === true) {
			message = emailVerified
		} else {
			message = tokenNotExists
		}
	} catch (error) {
		// Handle invalid token error
		if (error instanceof Error && error.message.includes('Verification token is invalid')) {
			message = tokenNotExists
		}
		// Handle other errors
		message = failedToVerify
	}

	return { result, message }
}
