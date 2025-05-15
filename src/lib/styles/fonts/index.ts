import { NextFontWithVariable } from 'next/dist/compiled/@next/font'

const shouldIgnoreLocalFont =
	process.env.IGNORE_LOCAL_FONT === 'true' || typeof window === 'undefined'

// Import fonts only when not generating types
const fonts = shouldIgnoreLocalFont
	? {
			lightFont: { variable: '--font-typeNextLight' } as NextFontWithVariable,
			regularFont: { variable: '--font-typeNextRegular' } as NextFontWithVariable,
			semiBoldFont: { variable: '--font-typeNextSemiBold' } as NextFontWithVariable,
			boldFont: { variable: '--font-typeNextBold' } as NextFontWithVariable,
		}
	: require('./load-fonts')

export const typeNextLight = fonts.lightFont
export const typeNextRegular = fonts.regularFont
export const typeNextSemiBold = fonts.semiBoldFont
export const typeNextBold = fonts.boldFont
