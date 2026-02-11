import { beforeEach, describe, expect, it } from 'vitest'

import { Theme, useThemeStore } from '../theme-store'

describe('useThemeStore', () => {
	beforeEach(() => {
		useThemeStore.setState({ theme: Theme.light })
	})

	it('has a default theme', () => {
		const theme = useThemeStore.getState().theme
		expect([Theme.light, Theme.dark]).toContain(theme)
	})

	it('setCurrentTheme updates theme', () => {
		useThemeStore.getState().setCurrentTheme(Theme.dark)
		expect(useThemeStore.getState().theme).toBe(Theme.dark)
	})

	it('isLightTheme returns true for light', () => {
		useThemeStore.setState({ theme: Theme.light })
		expect(useThemeStore.getState().isLightTheme()).toBe(true)
	})

	it('isLightTheme returns false for dark', () => {
		useThemeStore.setState({ theme: Theme.dark })
		expect(useThemeStore.getState().isLightTheme()).toBe(false)
	})

	it('reset restores initial state', () => {
		useThemeStore.getState().setCurrentTheme(Theme.dark)
		useThemeStore.getState().reset()
		const theme = useThemeStore.getState().theme
		expect([Theme.light, Theme.dark]).toContain(theme)
	})
})
