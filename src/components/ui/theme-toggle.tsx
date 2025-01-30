'use client'
import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { Theme, useThemeStore } from '@/lib/store/theme-store'

export function ThemeToggle() {
	const { isLightTheme, theme, setCurrentTheme } = useThemeStore()
	return (
		<Button
			variant="neutral"
			size="icon"
			onClick={() => {
				isLightTheme()
					? setCurrentTheme(Theme.dark)
					: setCurrentTheme(Theme.light)
			}}
		>
			<Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
			<Moon className="hidden h-5 w-5 dark:block" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	)
}
