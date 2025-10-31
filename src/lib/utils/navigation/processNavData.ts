import type { Menu } from '@payload-types'
import type {
	TNavData,
	TProcessedNavData,
	NavLink,
	MainNavEntry,
	MainNavGroup,
	NavFolder,
} from '@/lib/types/navigation'
import type { MenuGroupItem } from '@/lib/utils/navigation/payloadMenuTypes'
import { createNavLink, warnEmptyGroup } from '@/lib/utils/navigation/resolveNavLink'
import {
	processDashboardNav,
	processDocsNav,
	collectGroupEntriesWithFolders,
} from '@/lib/utils/navigation/navGrouping'
import { toIcon } from './sharedUtils'

/**
 * Creates a main navigation group from a menu group item
 * @param item - Menu group item to convert
 * @param items - Array of navigation links and folders for the group
 * @returns MainNavGroup object or null if invalid
 */
const createMainNavGroup = (
	item: MenuGroupItem | undefined,
	items: Array<NavLink | NavFolder>,
): MainNavGroup | null => {
	if (!item) return null

	const label = item.label
	if (!label) return null

	return {
		type: 'group',
		label,
		icon: toIcon(item.icon),
		items,
	}
}

/**
 * Processes main navigation menu into structured entries
 * Supports both individual links and grouped navigation
 * @param menu - Menu to process
 * @returns Array of main navigation entries
 */
const processMainNav = (menu?: Menu): MainNavEntry[] => {
	if (!menu?.menuItems) return []

	try {
		return menu.menuItems.reduce<MainNavEntry[]>((acc, block) => {
			const menuItem = block?.menuItems
			if (!menuItem) return acc

			if (menuItem.type === 'page') {
				const navItem = createNavLink(menuItem)
				if (navItem) acc.push(navItem)
			} else if (menuItem.type === 'group') {
				const groupItems = collectGroupEntriesWithFolders(menuItem)
				if (!groupItems.length) {
					warnEmptyGroup('main group', menuItem.label ?? '', menu?.name ?? undefined)
					return acc
				}

				const group = createMainNavGroup(menuItem, groupItems)
				if (group) acc.push(group)
			}

			return acc
		}, [])
	} catch (error) {
		console.error('[Navigation] Error processing main nav:', error)
		return []
	}
}

/**
 * Processes footer or profile navigation menu into flat link array
 * @param menu - Menu to process
 * @returns Array of navigation links
 */
const processFooterNav = (menu?: Menu): NavLink[] => {
	if (!menu?.menuItems) return []

	try {
		return menu.menuItems
			.map((block) => createNavLink(block?.menuItems))
			.filter((item): item is NavLink => Boolean(item))
	} catch (error) {
		console.error('[Navigation] Error processing footer nav:', error)
		return []
	}
}

/**
 * Extracts only link entries from main navigation for mobile overflow menu
 * @param entries - Main navigation entries
 * @returns Array of navigation links only (no groups)
 */
const processMainNavForThreeDots = (entries: MainNavEntry[]): NavLink[] => {
	try {
		return entries.reduce<NavLink[]>((acc, entry) => {
			if (entry.type === 'link') acc.push(entry)
			return acc
		}, [])
	} catch (error) {
		console.error('[Navigation] Error processing three dots nav:', error)
		return []
	}
}

/**
 * Processes raw navigation data from CMS into structured navigation
 * Handles all navigation types: main, footer, profile, dashboard, and docs
 * @param navData - Raw navigation data from CMS
 * @returns Processed navigation data ready for rendering
 * @example
 * processNavData({ mainNav: menu1, footerNav: menu2, ... })
 * // => { mainNav: [...], footerNav: [...], settings: {...} }
 */
export const processNavData = (navData: TNavData): TProcessedNavData => {
	try {
		// Validate input
		if (!navData || typeof navData !== 'object') {
			console.error('[Navigation] Invalid navData provided')
			return {
				mainNav: [],
				dashboardNav: [],
				footerNav: [],
				docsNav: [],
				profileNav: [],
				threedotsNav: [],
				settings: {
					siteName: undefined,
					siteDescription: undefined,
				},
			}
		}

		const mainNav = processMainNav(navData.mainNav)
		const footerNav = processFooterNav(navData.footerNav)
		const profileNav = processFooterNav(navData.profileNav)
		const dashboardNav = processDashboardNav(navData.dashboardNav)
		const docsNav = processDocsNav(navData.docsNav)
		const threedotsNav = processMainNavForThreeDots(mainNav)

		return {
			mainNav,
			dashboardNav,
			footerNav,
			docsNav,
			profileNav,
			threedotsNav,
			settings: {
				siteName: navData.settings?.siteName,
				siteDescription: navData.settings?.siteDescription,
			},
		}
	} catch (error) {
		console.error('[Navigation] Error processing nav data:', error)
		return {
			mainNav: [],
			dashboardNav: [],
			footerNav: [],
			docsNav: [],
			profileNav: [],
			threedotsNav: [],
			settings: {
				siteName: undefined,
				siteDescription: undefined,
			},
		}
	}
}
