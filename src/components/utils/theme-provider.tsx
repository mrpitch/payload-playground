'use client'

import { useEffect } from 'react'

import { Theme, useThemeStore } from '@/lib/store/theme-store'
import { setCookie } from '@/lib/utils/cookies'

export interface IThemeProviderProps {
	children: React.ReactNode
}

export const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
	const { theme, setCurrentTheme } = useThemeStore()

	useEffect(() => {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
			if (event.matches) {
				setCurrentTheme(Theme.dark)
			} else {
				setCurrentTheme(Theme.light)
			}
		})

		return () => {
			window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', (event) => {
				if (event.matches) {
					setCurrentTheme(Theme.dark)
				} else {
					setCurrentTheme(Theme.light)
				}
			})
		}
	}, [setCurrentTheme])

	useEffect(() => {
		document?.querySelector?.('html')?.setAttribute?.('data-mode', theme)
		document?.querySelector?.('html')?.setAttribute?.('class', theme)
		setCookie('theme', theme)
	}, [theme])

	return children
}
