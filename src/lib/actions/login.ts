'use server'

import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

import type { User } from '@payload-types'

import { getUser } from '@/lib/actions/user'
import { loginFormSchema } from '@/lib/schema/login.schema'
import type { TLoginForm } from '@/lib/types'
import { formMessages } from '@/lib/utils/constants'
interface LoginResult {
	exp?: number
	token?: string
	user?: User
}

export async function login(data: TLoginForm) {
	const {
		error: { credentialsInvalid, emailNotVerified, somethingWrong },
	} = formMessages

	const validatedData = loginFormSchema.safeParse(data)

	if (!validatedData.success) {
		return { errors: validatedData.error.flatten() }
	}
	const { email, password } = validatedData.data
	const payload = await getPayload({ config })

	try {
		// Check if user exists and is verified
		const user = await getUser(email)
		if (!user) {
			return { error: credentialsInvalid }
		}
		if (!user._verified) {
			return { error: emailNotVerified }
		}

		const result: LoginResult = await payload.login({
			collection: 'users',
			data: { email, password },
			showHiddenFields: true,
		})

		if (result && result.token) {
			const cookieStore = await cookies()
			cookieStore.set('payload-token', result.token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				path: '/',
			})
			return { success: true }
		}
	} catch (error) {
		console.log('error', error)
		return { error: somethingWrong }
	}
}
