import { cache } from 'react'

import { getGlobals } from '@/lib/utils/getGlobals'
import type { AppSetting, Menu } from '@payload-types'
import type { TNavData, TProcessedNavData } from '@/lib/types/navigation'
import { processNavData } from '@/lib/utils/navigation/processNavData'

export const getNavData = cache(async (): Promise<TProcessedNavData> => {
	const appSettings = (await getGlobals('app-settings', { depth: 4 })) as AppSetting
	const ensureMenu = (menu: Menu | number | null | undefined): Menu | undefined => {
		return menu && typeof menu === 'object' ? (menu as Menu) : undefined
	}

	const ensureMenuArray = (menus: (Menu | number)[] | null | undefined): Menu[] => {
		if (!Array.isArray(menus)) return []
		return menus.map((menu) => ensureMenu(menu)).filter((menu): menu is Menu => Boolean(menu))
	}

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
})
