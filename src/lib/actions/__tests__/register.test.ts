import { beforeEach, describe, expect, it, vi } from 'vitest'

import { formMessages } from '@/lib/utils/constants'

vi.mock('@/lib/actions/user', () => ({
	getUser: vi.fn(),
	createUser: vi.fn(),
}))

import { createUser, getUser } from '@/lib/actions/user'

import { register } from '../register'

describe('register', () => {
	const validData = {
		firstName: 'John',
		lastName: 'Doe',
		email: 'john@example.com',
		password: 'password1234',
		confirmPassword: 'password1234',
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns validation errors for invalid data', async () => {
		const result = await register({ ...validData, email: 'bad' })
		expect(result).toHaveProperty('errors')
	})

	it('returns error when email exists', async () => {
		vi.mocked(getUser).mockResolvedValue({ id: '1' } as any)
		const result = await register(validData)
		expect(result.errors?.fieldErrors?.email).toContain(formMessages.error.emailInUse)
	})

	it('creates user and returns success', async () => {
		vi.mocked(getUser).mockResolvedValue(null)
		vi.mocked(createUser).mockResolvedValue({} as any)

		const result = await register(validData)
		expect(result).toEqual({ success: formMessages.success.emailConfirmationSent })
		expect(createUser).toHaveBeenCalledWith({
			firstName: 'John',
			lastName: 'Doe',
			email: 'john@example.com',
			password: 'password1234',
		})
	})
})
