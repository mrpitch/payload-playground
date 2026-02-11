import { headers } from 'next/headers'
import { getPayload } from 'payload'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getSession } from '../get-session'

describe('getSession', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns user when authenticated', async () => {
		const mockUser = { id: '1', email: 'test@test.com' }
		const mockPayload = { auth: vi.fn().mockResolvedValue({ user: mockUser }) }
		vi.mocked(getPayload).mockResolvedValue(mockPayload as any)
		vi.mocked(headers).mockResolvedValue({} as any)

		const result = await getSession()
		expect(result).toEqual(mockUser)
	})

	it('returns null when not authenticated', async () => {
		const mockPayload = { auth: vi.fn().mockResolvedValue({ user: null }) }
		vi.mocked(getPayload).mockResolvedValue(mockPayload as any)
		vi.mocked(headers).mockResolvedValue({} as any)

		const result = await getSession()
		expect(result).toBeNull()
	})
})
