import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { formMessages } from '@/lib/utils/constants'

import { verifyEmail } from '../verify-email'

describe('verifyEmail', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('redirects when token is empty', async () => {
		await verifyEmail('')
		expect(redirect).toHaveBeenCalledWith('/')
	})

	it('returns success when token is valid', async () => {
		const mockPayload = { verifyEmail: vi.fn().mockResolvedValue(true) }
		vi.mocked(getPayload).mockResolvedValue(mockPayload as any)

		const result = await verifyEmail('valid-token')
		expect(result.result).toBe(true)
		expect(result.message).toBe(formMessages.success.emailVerified)
	})

	it('returns error when verification returns false', async () => {
		const mockPayload = { verifyEmail: vi.fn().mockResolvedValue(false) }
		vi.mocked(getPayload).mockResolvedValue(mockPayload as any)

		const result = await verifyEmail('invalid-token')
		expect(result.result).toBe(false)
		expect(result.message).toBe(formMessages.error.tokenNotExists)
	})

	it('returns error on exception', async () => {
		const mockPayload = {
			verifyEmail: vi.fn().mockRejectedValue(new Error('Verification token is invalid')),
		}
		vi.mocked(getPayload).mockResolvedValue(mockPayload as any)

		const result = await verifyEmail('bad-token')
		expect(result.result).toBe(false)
		expect(result.message).toBe(formMessages.error.failedToVerify)
	})
})
