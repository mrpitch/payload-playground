import { cookies } from 'next/headers'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { logout } from '../logout'

describe('logout', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('deletes cookie and returns success', async () => {
		const mockCookieStore = { delete: vi.fn() }
		vi.mocked(cookies).mockResolvedValue(mockCookieStore as any)

		const result = await logout()
		expect(result).toEqual({ success: true })
		expect(mockCookieStore.delete).toHaveBeenCalledWith('payload-token')
	})

	it('returns error on failure', async () => {
		vi.mocked(cookies).mockRejectedValue(new Error('fail'))

		const result = await logout()
		expect(result.success).toBe(false)
		expect(result.error).toBeDefined()
	})
})
