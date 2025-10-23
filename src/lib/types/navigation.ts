import type { AppSetting, Menu } from '@payload-types'
import type { IconType } from '@/components/ui/custom/icons'

export type NavigationIcon = IconType | null | undefined

export interface NavItem {
	type: 'item'
	label: string
	href: string
	icon?: NavigationIcon
}

export interface MainNavGroup {
	type: 'group'
	label: string
	icon?: NavigationIcon
}

export type MainNavEntry = NavItem | MainNavGroup

export interface DashboardNavGroup {
	label: string
	items: NavItem[]
}

export interface DocsNavGroup {
	label: string
	items: NavItem[]
}

export interface DocsNavMenu {
	name: string
	shortDescription?: string | null
	navGroups: DocsNavGroup[]
}

export interface TNavData {
	mainNav?: Menu
	footerNav?: Menu
	profileNav?: Menu
	dashboardNav?: Menu
	docsNav?: Menu[]
	settings?: AppSetting['settings']
}

export interface TProcessedNavData {
	mainNav: MainNavEntry[]
	dashboardNav: DashboardNavGroup[]
	footerNav: NavItem[]
	docsNav: DocsNavMenu[]
	profileNav: NavItem[]
	threedotsNav: NavItem[]
	settings: {
		siteName?: string
		siteDescription?: string
	}
}

/**
 * Context-specific return types
 *
 * These interfaces define the exact structure returned by each navigation type.
 * TypeScript uses these for compile-time type checking and IntelliSense support.
 */

/** Main navigation context - header navigation with site settings */
export interface TMainNavContext {
	mainNav: MainNavEntry[]
	settings: {
		siteName?: string
		siteDescription?: string
	}
}

/** Dashboard navigation context - sidebar navigation with site settings */
export interface TDashboardNavContext {
	dashboardNav: DashboardNavGroup[]
	settings: {
		siteName?: string
		siteDescription?: string
	}
}

/** Documentation navigation context - multiple docs menus with groups */
export interface TDocsNavContext {
	docsNav: DocsNavMenu[]
	settings: {
		siteName?: string
		siteDescription?: string
	}
}

/** Three dots navigation context - mobile/hamburger menu (pages only) */
export interface TThreedotsNavContext {
	mainNav: NavItem[]
}

/** Profile navigation context - user menu items (URLs only) */
export interface TProfileNavContext {
	profileNav: NavItem[]
}

/** Footer navigation context - footer links (flat list) */
export interface TFooterNavContext {
	footerNav: NavItem[]
}
