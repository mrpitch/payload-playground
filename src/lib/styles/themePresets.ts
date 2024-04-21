/**
 * DON'T EDIT THIS FILE DIRECTLY:
 * USE src/lib/styles/styles.ts to change styles variables values
 * USE src/lib/styles/theme.ts to add new styles variables
 */
import type { Config } from 'tailwindcss'
import aspectRatioPlugIn from '@tailwindcss/aspect-ratio'
import containerQueriesPlugIn from '@tailwindcss/container-queries'
import animatePlugin from 'tailwindcss-animate'
import { themePlugin } from './themePlugin'

export const themePreset = {
	darkMode: ['class', '[data-mode="dark"]'],
	content: [],
	plugins: [
		aspectRatioPlugIn,
		containerQueriesPlugIn,
		animatePlugin,
		themePlugin,
	],
} satisfies Config
