import { describe, expect, it } from 'vitest'

import { registerFormSchema } from '../register.schema'

const validData = {
	firstName: 'John',
	lastName: 'Doe',
	email: 'john@example.com',
	password: 'pass1234',
	confirmPassword: 'pass1234',
}

describe('registerFormSchema', () => {
	it('accepts valid data', () => {
		const result = registerFormSchema.safeParse(validData)
		expect(result.success).toBe(true)
	})

	it('rejects short password', () => {
		const result = registerFormSchema.safeParse({
			...validData,
			password: 'abc',
			confirmPassword: 'abc',
		})
		expect(result.success).toBe(false)
		if (!result.success) {
			expect(result.error.flatten().fieldErrors.password).toBeDefined()
		}
	})

	it('rejects mismatched passwords', () => {
		const result = registerFormSchema.safeParse({
			...validData,
			confirmPassword: 'different',
		})
		expect(result.success).toBe(false)
		if (!result.success) {
			expect(result.error.flatten().fieldErrors.confirmPassword).toBeDefined()
		}
	})

	it('rejects invalid email', () => {
		const result = registerFormSchema.safeParse({
			...validData,
			email: 'not-email',
		})
		expect(result.success).toBe(false)
	})

	it('rejects missing fields', () => {
		const result = registerFormSchema.safeParse({})
		expect(result.success).toBe(false)
	})
})
