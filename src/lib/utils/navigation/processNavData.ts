import type { Menu } from '@payload-types'
import type { TNavData, TProcessedNavData, NavLink, MainNavEntry, MainNavGroup } from '@/lib/types/navigation'
import type { IconType } from '@/components/ui/custom/icons'
import type { MenuItem } from '@/lib/utils/navigation/payloadMenuTypes'
import { createNavLink } from '@/lib/utils/navigation/resolveNavLink'
import { processDashboardNav, processDocsNav } from '@/lib/utils/navigation/navGrouping'

const createMainNavGroup = (item: MenuItem | undefined): MainNavGroup | null => {
	if (!item) return null
	const label = item.label
	if (!label) return null
	return {
		type: 'group',
		label,
		icon: toIcon(item.icon),
	}
}

const processMainNav = (menu?: Menu): MainNavEntry[] => {
	if (!menu?.menuItems) return []

	return menu.menuItems.reduce<MainNavEntry[]>((acc, block) => {
		const menuItem = block?.menuItems
		if (!menuItem) return acc

		if (menuItem.type === 'page') {
			const navItem = createNavLink(menuItem)
			if (navItem) acc.push(navItem)
		} else if (menuItem.type === 'group') {
			const group = createMainNavGroup(menuItem)
			if (group) acc.push(group)
		}

		return acc
	}, [])
}

const processFooterNav = (menu?: Menu): NavLink[] => {
	if (!menu?.menuItems) return []
	return menu.menuItems
		.map((block) => createNavLink(block?.menuItems))
		.filter((item): item is NavLink => Boolean(item))
}

const processMainNavForThreeDots = (entries: MainNavEntry[]): NavLink[] => {
	return entries.reduce<NavLink[]>((acc, entry) => {
		if (entry.type === 'link') acc.push(entry)
		return acc
	}, [])
}

const toIcon = (icon: unknown): IconType | undefined => {
	return typeof icon === 'string' ? (icon as IconType) : undefined
}

export const processNavData = (navData: TNavData): TProcessedNavData => {
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
}
