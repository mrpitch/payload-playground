'use server'

import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

import { User } from '@payload-types'

import * as z from 'zod'

import { loginFormSchema } from '@/lib/schema/login.schema'
import type { TLoginForm } from '@/lib/types'
import { formMessages } from '@/lib/utils/constants'

interface LoginResult {
	exp?: number
	token?: string
	user?: User
}

export async function login(data: TLoginForm) {
	const validatedData = loginFormSchema.safeParse(data)

	if (!validatedData.success) {
		return { errors: validatedData.error.flatten() }
	}
	const { email, password } = validatedData.data

	console.log('email', email)
	console.log('password', password)

	const payload = await getPayload({ config })

	try {
		const result: LoginResult = await payload.login({
			collection: 'users',
			data: { email, password },
		})

		if (result && result.token) {
			const cookieStore = await cookies()
			cookieStore.set('payload-token', result.token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				path: '/',
			})
		} else {
			return { error: 'Failed to login. Please try again.' }
		}
	} catch (error) {
		console.error('Login error:', error)
		return { error: 'Failed to login. Please try again.' }
	}
}
