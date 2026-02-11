import { beforeEach, describe, expect, it } from 'vitest'

import { useUserStore } from '../user-store'

describe('useUserStore', () => {
	beforeEach(() => {
		useUserStore.setState({ user: null })
	})

	it('starts with null user', () => {
		expect(useUserStore.getState().user).toBeNull()
	})

	it('setUser stores user', () => {
		const mockUser = { id: '1', email: 'test@test.com' } as any
		useUserStore.getState().setUser(mockUser)
		expect(useUserStore.getState().user).toEqual(mockUser)
	})

	it('isAuthenticated returns true when user set', () => {
		useUserStore.getState().setUser({ id: '1' } as any)
		expect(useUserStore.getState().isAuthenticated()).toBe(true)
	})

	it('isAuthenticated returns false when user null', () => {
		expect(useUserStore.getState().isAuthenticated()).toBe(false)
	})

	it('reset clears user', () => {
		useUserStore.getState().setUser({ id: '1' } as any)
		useUserStore.getState().reset()
		expect(useUserStore.getState().user).toBeNull()
	})
})
