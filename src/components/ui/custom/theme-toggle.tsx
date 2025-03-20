'use client'
import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { Theme, useThemeStore } from '@/lib/store/theme-store'

export function ThemeToggle() {
	const { isLightTheme, setCurrentTheme } = useThemeStore()
	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => {
				if (isLightTheme()) {
					setCurrentTheme(Theme.dark)
				} else {
					setCurrentTheme(Theme.light)
				}
			}}
		>
			<Sun className="hidden h-[1.5rem] w-[1.3rem] dark:block" />
			<Moon className="h-5 w-5 dark:hidden" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	)
}
