'use client'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/custom/icons'

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
			<Icon iconName="moon" className="hidden h-[1.5rem] w-[1.3rem] dark:block" />
			<Icon iconName="sun" className="h-5 w-5 dark:hidden" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	)
}
