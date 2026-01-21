import type { Menu, Page, Doc } from '@payload-types'
import type { IconType } from '@/components/ui/custom/icons'

/**
 * Converts an unknown icon value to IconType
 * @param icon - Icon value to convert
 * @returns IconType if valid string, undefined otherwise
 * @example
 * toIcon('home') // => 'home'
 * toIcon(null) // => undefined
 */
export const toIcon = (icon: unknown): IconType | undefined => {
	return typeof icon === 'string' ? (icon as IconType) : undefined
}

/**
 * Ensures a menu value is a proper Menu object, not a relationship ID
 * @param menu - Menu value that could be a Menu object, ID, null, or undefined
 * @returns Menu object if valid, undefined otherwise
 * @example
 * ensureMenu({ id: '123', name: 'Main' }) // => { id: '123', name: 'Main' }
 * ensureMenu(123) // => undefined
 * ensureMenu(null) // => undefined
 */
export const ensureMenu = (menu: Menu | number | null | undefined): Menu | undefined => {
	return menu && typeof menu === 'object' ? (menu as Menu) : undefined
}

/**
 * Ensures an array of menus are all proper Menu objects, filtering out IDs
 * @param menus - Array that may contain Menu objects, IDs, null, or undefined
 * @returns Array of valid Menu objects
 * @example
 * ensureMenuArray([{ id: '1', name: 'Menu1' }, 123, null]) // => [{ id: '1', name: 'Menu1' }]
 * ensureMenuArray(null) // => []
 */
export const ensureMenuArray = (menus: (Menu | number)[] | null | undefined): Menu[] => {
	if (!Array.isArray(menus)) return []
	return menus.map((menu) => ensureMenu(menu)).filter((menu): menu is Menu => Boolean(menu))
}

/**
 * Type guard to check if a value is a valid Page object
 * @param value - Value to check
 * @returns True if value is a Page object
 */
export const isPage = (value: unknown): value is Page => {
	return Boolean(value && typeof value === 'object' && 'slug' in value)
}

/**
 * Type guard to check if a value is a valid Doc object
 * @param value - Value to check
 * @returns True if value is a Doc object
 */
export const isDoc = (value: unknown): value is Doc => {
	return Boolean(value && typeof value === 'object' && 'slug' in value)
}

/**
 * Logs a warning in development mode for empty navigation groups
 * @param context - Description of where the empty group was found
 * @param label - The label of the empty group
 * @param detail - Optional additional context information
 * @example
 * warnEmptyGroup('dashboard group', 'Settings', 'MainMenu')
 */
export const warnEmptyGroup = (context: string, label: string, detail?: string): void => {
	if (process.env.NODE_ENV === 'development') {
		const extra = detail ? ` (${detail})` : ''
		console.warn(
			`[Navigation] Empty ${context}${extra} detected: "${label || '<unnamed>'}". Check CMS configuration.`,
		)
	}
}

// Constants
export const HOME_SLUG = 'home'
export const DOCS_BASE_PATH = '/docs'
export const ROOT_PATH = '/'
export const HEADING_TYPE = 'heading'

