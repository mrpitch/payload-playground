import { describe, expect, it } from 'vitest'

import { loginFormSchema } from '../login.schema'

describe('loginFormSchema', () => {
	it('accepts valid data', () => {
		const result = loginFormSchema.safeParse({
			email: 'user@example.com',
			password: 'password123',
		})
		expect(result.success).toBe(true)
	})

	it('rejects invalid email', () => {
		const result = loginFormSchema.safeParse({
			email: 'not-an-email',
			password: 'password123',
		})
		expect(result.success).toBe(false)
		if (!result.success) {
			expect(result.error.flatten().fieldErrors.email).toBeDefined()
		}
	})

	it('rejects empty email', () => {
		const result = loginFormSchema.safeParse({
			email: '',
			password: 'password123',
		})
		expect(result.success).toBe(false)
	})

	it('accepts any non-empty password', () => {
		const result = loginFormSchema.safeParse({
			email: 'user@example.com',
			password: 'x',
		})
		expect(result.success).toBe(true)
	})
})
