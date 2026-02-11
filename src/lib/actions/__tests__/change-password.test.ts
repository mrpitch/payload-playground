import { getPayload } from 'payload'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { formMessages } from '@/lib/utils/constants'

import { changePassword } from '../change-password'

describe('changePassword', () => {
	const validData = { password: 'newpass1234', confirmPassword: 'newpass1234' }

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns validation errors for invalid data', async () => {
		const result = await changePassword({ password: 'ab', confirmPassword: 'ab' }, 'token')
		expect(result).toHaveProperty('errors')
	})

	it('returns success on valid password change', async () => {
		const mockPayload = { resetPassword: vi.fn().mockResolvedValue({}) }
		vi.mocked(getPayload).mockResolvedValue(mockPayload as any)

		const result = await changePassword(validData, 'valid-token')
		expect(result).toEqual({ success: formMessages.success.passwordUpdated })
		expect(mockPayload.resetPassword).toHaveBeenCalledWith(
			expect.objectContaining({
				collection: 'users',
				data: { password: 'newpass1234', token: 'valid-token' },
			}),
		)
	})

	it('returns error on expired token', async () => {
		const mockPayload = {
			resetPassword: vi
				.fn()
				.mockRejectedValue(new Error('Token is either invalid or has expired.')),
		}
		vi.mocked(getPayload).mockResolvedValue(mockPayload as any)

		const result = await changePassword(validData, 'expired-token')
		expect(result).toEqual({ error: formMessages.error.tokenNotExists })
	})
})
