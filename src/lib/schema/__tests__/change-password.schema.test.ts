import { describe, expect, it } from 'vitest'

import { changePasswordFormSchema } from '../change-password.schema'

describe('changePasswordFormSchema', () => {
	it('accepts valid data', () => {
		const result = changePasswordFormSchema.safeParse({
			password: 'newpass1234',
			confirmPassword: 'newpass1234',
		})
		expect(result.success).toBe(true)
	})

	it('rejects short password', () => {
		const result = changePasswordFormSchema.safeParse({
			password: 'ab',
			confirmPassword: 'ab',
		})
		expect(result.success).toBe(false)
		if (!result.success) {
			expect(result.error.flatten().fieldErrors.password).toBeDefined()
		}
	})

	it('rejects mismatched passwords', () => {
		const result = changePasswordFormSchema.safeParse({
			password: 'password1234',
			confirmPassword: 'different',
		})
		expect(result.success).toBe(false)
		if (!result.success) {
			expect(result.error.flatten().fieldErrors.confirmPassword).toBeDefined()
		}
	})
})
