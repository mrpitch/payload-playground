import { beforeEach, describe, expect, it } from 'vitest'

import { useNavStore } from '../nav-store'

describe('useNavStore', () => {
	beforeEach(() => {
		useNavStore.setState({ navOpen: false })
	})

	it('starts closed', () => {
		expect(useNavStore.getState().navOpen).toBe(false)
	})

	it('setNavOpen(false) sets navOpen to true (inverts param)', () => {
		useNavStore.getState().setNavOpen(false)
		expect(useNavStore.getState().navOpen).toBe(true)
	})

	it('setNavOpen(true) sets navOpen to false (inverts param)', () => {
		useNavStore.setState({ navOpen: true })
		useNavStore.getState().setNavOpen(true)
		expect(useNavStore.getState().navOpen).toBe(false)
	})
})
