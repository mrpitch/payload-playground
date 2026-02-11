import { beforeEach, describe, expect, it, vi } from 'vitest'

import { formMessages } from '@/lib/utils/constants'

vi.mock('@/lib/actions/user', () => ({
	getUser: vi.fn(),
}))

vi.mock('@/lib/utils/rate-limit', () => ({
	rateLimit: vi.fn(() => ({ isLimited: false, remaining: 2, resetAt: Date.now() + 86400000 })),
}))

import { getPayload } from 'payload'

import { getUser } from '@/lib/actions/user'
import { rateLimit } from '@/lib/utils/rate-limit'

import { resetPassword } from '../reset-password'

describe('resetPassword', () => {
	const validData = { email: 'user@example.com' }

	beforeEach(() => {
		vi.clearAllMocks()
		vi.mocked(rateLimit).mockReturnValue({
			isLimited: false,
			remaining: 2,
			resetAt: Date.now() + 86400000,
		})
	})

	it('returns validation errors for invalid data', async () => {
		const result = await resetPassword({ email: 'bad' })
		expect(result).toHaveProperty('errors')
	})

	it('returns error when rate limited', async () => {
		vi.mocked(rateLimit).mockReturnValue({ isLimited: true, remaining: 0, resetAt: 0 })
		const result = await resetPassword(validData)
		expect(result).toEqual({ error: 'Too many reset requests. Please try again tomorrow.' })
	})

	it('returns error when user not found', async () => {
		vi.mocked(getUser).mockResolvedValue(null)
		const result = await resetPassword(validData)
		expect(result).toEqual({ error: formMessages.error.emailNotExists })
	})

	it('calls forgotPassword and returns success', async () => {
		vi.mocked(getUser).mockResolvedValue({ id: '1', email: 'user@example.com' } as any)
		const mockPayload = { forgotPassword: vi.fn().mockResolvedValue({}) }
		vi.mocked(getPayload).mockResolvedValue(mockPayload as any)

		const result = await resetPassword(validData)
		expect(result).toEqual({ success: formMessages.success.emailResetSend })
		expect(mockPayload.forgotPassword).toHaveBeenCalledWith({
			collection: 'users',
			data: { email: 'user@example.com' },
		})
	})
})
