import { beforeEach, describe, expect, it, vi } from 'vitest'

import { formMessages } from '@/lib/utils/constants'

// Mock sibling action
vi.mock('@/lib/actions/user', () => ({
	getUser: vi.fn(),
}))

// Mock rate-limit
vi.mock('@/lib/utils/rate-limit', () => ({
	rateLimit: vi.fn(() => ({ isLimited: false, remaining: 4, resetAt: Date.now() + 300000 })),
}))

import { cookies, headers } from 'next/headers'
import { getPayload } from 'payload'

import { getUser } from '@/lib/actions/user'
import { rateLimit } from '@/lib/utils/rate-limit'

import { login } from '../login'

describe('login', () => {
	const validData = { email: 'user@example.com', password: 'password123' }

	beforeEach(() => {
		vi.clearAllMocks()
		const mockHeaders = { get: vi.fn(() => '127.0.0.1') }
		vi.mocked(headers).mockResolvedValue(mockHeaders as any)
		vi.mocked(rateLimit).mockReturnValue({
			isLimited: false,
			remaining: 4,
			resetAt: Date.now() + 300000,
		})
	})

	it('returns validation errors for invalid data', async () => {
		const result = await login({ email: 'bad', password: '' })
		expect(result).toHaveProperty('errors')
	})

	it('returns error when rate limited', async () => {
		vi.mocked(rateLimit).mockReturnValue({ isLimited: true, remaining: 0, resetAt: 0 })
		const result = await login(validData)
		expect(result).toEqual({ error: 'Too many login attempts. Please try again later.' })
	})

	it('returns error when user not found', async () => {
		vi.mocked(getUser).mockResolvedValue(null)
		const result = await login(validData)
		expect(result).toEqual({ error: formMessages.error.credentialsInvalid })
	})

	it('returns error when user not verified', async () => {
		vi.mocked(getUser).mockResolvedValue({ _verified: false } as any)
		const result = await login(validData)
		expect(result).toEqual({ error: formMessages.error.emailNotVerified })
	})

	it('sets cookie and returns success on valid login', async () => {
		vi.mocked(getUser).mockResolvedValue({ _verified: true } as any)
		const mockPayload = { login: vi.fn().mockResolvedValue({ token: 'abc123' }) }
		vi.mocked(getPayload).mockResolvedValue(mockPayload as any)
		const mockCookieStore = { set: vi.fn() }
		vi.mocked(cookies).mockResolvedValue(mockCookieStore as any)

		const result = await login(validData)
		expect(result).toEqual({ success: true })
		expect(mockCookieStore.set).toHaveBeenCalledWith(
			'payload-token',
			'abc123',
			expect.objectContaining({ httpOnly: true }),
		)
	})

	it('returns error on payload login failure', async () => {
		vi.mocked(getUser).mockResolvedValue({ _verified: true } as any)
		const mockPayload = { login: vi.fn().mockRejectedValue(new Error('fail')) }
		vi.mocked(getPayload).mockResolvedValue(mockPayload as any)

		const result = await login(validData)
		expect(result).toEqual({ error: formMessages.error.somethingWrong })
	})
})
