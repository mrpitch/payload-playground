import { NextFontWithVariable } from 'next/dist/compiled/@next/font'
import localFont from 'next/font/local'

/* Workarround for running pnpm genearte:types, this is causes error message: "TypeError: localFont is not a function". No issue during build process. 
Function createFont is checking if IGNORE_LOCAL_FONT is true, if so it will return a NextFontWithVariable object with the variable set to the config.variable and not use localFont.
*/
const ignoreLocalFont = process.env.IGNORE_LOCAL_FONT

type FontConfig = {
	src: string
	variable: `--${string}`
}

const fontConfigs: Record<string, FontConfig> = {
	light: {
		src: './inter-latin-200.woff2',
		variable: '--font-typeNextLight',
	},
	regular: {
		src: './inter-latin-regular.woff2',
		variable: '--font-typeNextRegular',
	},
	semiBold: {
		src: './inter-latin-600.woff2',
		variable: '--font-typeNextSemiBold',
	},
	bold: {
		src: './inter-latin-800.woff2',
		variable: '--font-typeNextBold',
	},
}

const createFont = (config: FontConfig): NextFontWithVariable => {
	if (ignoreLocalFont) {
		return {
			variable: config.variable,
		} as NextFontWithVariable
	}
	return localFont({
		src: config.src,
		display: 'swap',
		variable: config.variable,
	})
}

export const typeNextLight = createFont(fontConfigs.light)
export const typeNextRegular = createFont(fontConfigs.regular)
export const typeNextSemiBold = createFont(fontConfigs.semiBold)
export const typeNextBold = createFont(fontConfigs.bold)
