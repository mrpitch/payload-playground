import { describe, expect, it } from 'vitest'

import { resetPasswordFormSchema } from '../reset-password.schema'

describe('resetPasswordFormSchema', () => {
	it('accepts valid email', () => {
		const result = resetPasswordFormSchema.safeParse({ email: 'user@example.com' })
		expect(result.success).toBe(true)
	})

	it('rejects invalid email', () => {
		const result = resetPasswordFormSchema.safeParse({ email: 'bad' })
		expect(result.success).toBe(false)
		if (!result.success) {
			expect(result.error.flatten().fieldErrors.email).toBeDefined()
		}
	})

	it('rejects empty email', () => {
		const result = resetPasswordFormSchema.safeParse({ email: '' })
		expect(result.success).toBe(false)
	})
})
