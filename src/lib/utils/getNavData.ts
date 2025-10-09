import { cache } from 'react'

import type { AppSetting, Menu } from '@payload-types'

import { getGlobals } from '@/lib/utils/getGlobals'

export interface TNavData {
	mainNav?: Menu
	footerNav?: Menu
	profileNav?: Menu
	dashboardNav?: Menu
	docsNav?: Menu[]
	settings?: AppSetting['settings']
}

export const getNavData = cache(async (): Promise<TNavData> => {
	const appSettings = (await getGlobals('app-settings')) as AppSetting
	return {
		mainNav: appSettings?.menus?.mainMenu as Menu,
		footerNav: appSettings?.menus?.footerMenu as Menu,
		profileNav: appSettings?.menus?.profileMenu as Menu,
		dashboardNav: appSettings?.menus?.dashboardMenu as Menu,
		docsNav: appSettings?.menus?.docsMenu as Menu[],
		settings: appSettings?.settings,
	}
})
