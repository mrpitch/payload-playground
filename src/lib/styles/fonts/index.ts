import { NextFontWithVariable } from 'next/dist/compiled/@next/font'
import localFont from 'next/font/local'

/**
 * NOT USED - localFont({src}) requires src to be an explicit written literal, so importing and destructuring is not working
import fonts from '../fonts.json'
const {
	font: { light, regular, semibold, bold },
} = fonts
*/

export const typeNextLight: NextFontWithVariable = localFont({
	src: './inter-latin-200.woff2',
	display: 'swap',
	variable: '--font-typeNextLight',
})

export const typeNextRegular: NextFontWithVariable = localFont({
	src: './inter-latin-regular.woff2',
	display: 'swap',
	variable: '--font-typeNextRegular',
})

export const typeNextSemiBold: NextFontWithVariable = localFont({
	src: './inter-latin-600.woff2',
	display: 'swap',
	variable: '--font-typeNextSemiBold',
})
export const typeNextBold: NextFontWithVariable = localFont({
	src: './inter-latin-800.woff2',
	display: 'swap',
	variable: '--font-typeNextBold',
})

/* Workarround for running pnpm genearte types, this is causes error message: "TypeError: localFont is not a function". No issue during build process.
uncomment following to run without error
*/
// export const typeNextLight = {
// 	variable: '--font-typeNextLight',
// }
// export const typeNextRegular = {
// 	variable: '--font-typeNextRegular',
// }
// export const typeNextSemiBold = {
// 	variable: '--font-typeNextSemiBold',
// }
// export const typeNextBold = {
// 	variable: '--font-typeNextBold',
// }
