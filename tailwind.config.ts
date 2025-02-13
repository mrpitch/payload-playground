/**
 * DON'T EDIT THIS FILE DIRECTLY:
 * USE src/lib/styles/styles.ts to change styles variables values
 * USE src/lib/styles/theme.ts to add new styles variables
 */
import { Config } from 'tailwindcss'
import { themePreset } from './src/lib/styles/themePresets'

const config = {
	presets: [themePreset],
	content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
} satisfies Config

export default config
