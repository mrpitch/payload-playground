import { cache } from 'react'
import { getGlobals } from '@/lib/utils/getGlobals'
import type { AppSetting } from '@payload-types'
import type { TNavData, TProcessedNavData } from '@/lib/types/navigation'
import { processNavData } from '@/lib/utils/navigation/processNavData'
import { ensureMenu, ensureMenuArray } from './sharedUtils'

// Constants
const APP_SETTINGS_SLUG = 'app-settings'
const DEPTH_LEVEL = 4

/**
 * Fetches and processes all navigation data from CMS
 * Uses Next.js request-level caching for performance optimization
 * @returns Processed navigation data for all navigation types
 * @throws Error if globals fetch fails
 * @example
 * const navData = await getNavData()
 * // => { mainNav: [...], footerNav: [...], docsNav: [...], ... }
 */
const getNavDataInternal = async (): Promise<TProcessedNavData> => {
	try {
		// Fetch app settings with depth for related menus
		const appSettings = (await getGlobals(APP_SETTINGS_SLUG, { depth: DEPTH_LEVEL })) as AppSetting

		// Validate app settings
		if (!appSettings) {
			console.error('[Navigation] Failed to fetch app settings')
			return processNavData({
				mainNav: undefined,
				footerNav: undefined,
				profileNav: undefined,
				dashboardNav: undefined,
				docsNav: undefined,
				settings: undefined,
			})
		}

		// Extract and validate menus
		const docsMenus = ensureMenuArray(appSettings?.menus?.docsMenu)

		const rawData: TNavData = {
			mainNav: ensureMenu(appSettings?.menus?.mainMenu),
			footerNav: ensureMenu(appSettings?.menus?.footerMenu),
			profileNav: ensureMenu(appSettings?.menus?.profileMenu),
			dashboardNav: ensureMenu(appSettings?.menus?.dashboardMenu),
			docsNav: docsMenus.length ? docsMenus : undefined,
			settings: appSettings?.settings,
		}

		return processNavData(rawData)
	} catch (error) {
		console.error('[Navigation] Error fetching nav data:', error)
		// Return empty structure on error
		return processNavData({
			mainNav: undefined,
			footerNav: undefined,
			profileNav: undefined,
			dashboardNav: undefined,
			docsNav: undefined,
			settings: undefined,
		})
	}
}

/**
 * Cached version of getNavData using Next.js request-level caching
 * This provides automatic memoization within a single request
 * All navigation data is fetched once per request and reused
 */
export const getNavData = cache(getNavDataInternal)
