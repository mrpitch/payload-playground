import { unstable_cache } from 'next/cache'

import type { AppShell } from '@payload-types'

import { getGlobals } from '@/lib/utils/getGlobals'

export interface TNavData {
	mainNav?: AppShell['mainNavigation']
	appNav?: AppShell['sideBarNavigation']
	userNav?: AppShell['profileNavigation']
	footerNav?: AppShell['legalNavigation']
	settings?: AppShell['settings']
}

export const getNavData = async (): Promise<TNavData> => {
	const appShell = (await getGlobals('app-shell')) as AppShell
	return {
		mainNav: appShell?.mainNavigation,
		appNav: appShell?.sideBarNavigation,
		userNav: appShell?.profileNavigation,
		footerNav: appShell?.legalNavigation,
		settings: appShell?.settings,
	}
}
