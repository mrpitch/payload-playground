import plugin from 'tailwindcss/plugin'

import { styles } from './styles'
import { theme } from './theme'

export const themePlugin = plugin(
	//add css variables to base layer
	function ({ addBase }) {
		addBase(styles)
	},
	//extend tailwind theme with "themable" utilities
	theme
)
