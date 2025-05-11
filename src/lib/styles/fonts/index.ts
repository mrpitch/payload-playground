import { NextFontWithVariable } from 'next/dist/compiled/@next/font'
import localFont from 'next/font/local'

const shouldIgnoreLocalFont =
	process.env.IGNORE_LOCAL_FONT === 'true' || typeof window === 'undefined'

// Create font instances at module scope
const lightFont = localFont({
	src: './inter-latin-200.woff2',
	display: 'swap',
	variable: '--font-typeNextLight',
})

const regularFont = localFont({
	src: './inter-latin-regular.woff2',
	display: 'swap',
	variable: '--font-typeNextRegular',
})

const semiBoldFont = localFont({
	src: './inter-latin-600.woff2',
	display: 'swap',
	variable: '--font-typeNextSemiBold',
})

const boldFont = localFont({
	src: './inter-latin-800.woff2',
	display: 'swap',
	variable: '--font-typeNextBold',
})

// Export fonts with conditional logic
export const typeNextLight: NextFontWithVariable = shouldIgnoreLocalFont
	? ({ variable: '--font-typeNextLight' } as NextFontWithVariable)
	: lightFont

export const typeNextRegular: NextFontWithVariable = shouldIgnoreLocalFont
	? ({ variable: '--font-typeNextRegular' } as NextFontWithVariable)
	: regularFont

export const typeNextSemiBold: NextFontWithVariable = shouldIgnoreLocalFont
	? ({ variable: '--font-typeNextSemiBold' } as NextFontWithVariable)
	: semiBoldFont

export const typeNextBold: NextFontWithVariable = shouldIgnoreLocalFont
	? ({ variable: '--font-typeNextBold' } as NextFontWithVariable)
	: boldFont
