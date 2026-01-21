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
			<Icon iconName="moon" className="hidden dark:block" />
			<Icon iconName="sun" className="dark:hidden" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	)
}
