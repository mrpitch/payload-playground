import type { AppSetting, Menu } from '@payload-types'
import type { IconType } from '@/components/ui/custom/icons'

export type MenuItemBlock = NonNullable<Menu['menuItems']>[number]
export type RawMenuItem = NonNullable<MenuItemBlock>['menuItems']
export type MenuItem = RawMenuItem
export type MenuGroupItem = Extract<MenuItem, { type?: string | null; groupItems?: unknown }>
export type GroupItemBlock = NonNullable<MenuGroupItem['groupItems']>[number]
export type GroupItem = NonNullable<GroupItemBlock>['groupItem']
export type GroupItemWithFolder = Extract<GroupItem, { folderItems?: unknown }>
export type FolderItemBlock = NonNullable<GroupItemWithFolder['folderItems']>[number]
export type FolderItem = NonNullable<FolderItemBlock>['folderItem']

export type NavigationIcon = IconType

// Discriminated unions for navigation structures
export interface NavLink {
	type: 'link'
	label: string
	href: string
	icon?: NavigationIcon
}

export interface MainNavGroup {
	type: 'group'
	label: string
	icon?: NavigationIcon
	items: Array<NavLink | NavFolder>
}

export type MainNavEntry = NavLink | MainNavGroup

export interface DashboardNavGroup {
	label: string
	items: NavLink[]
}

export interface NavFolder {
	type: 'folder'
	label: string
	icon?: NavigationIcon
	items: NavLink[]
}

export type DocsNavEntry = NavLink | NavFolder

export interface DocsNavGroup {
	label: string
	items: DocsNavEntry[]
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
	footerNav: NavLink[]
	docsNav: DocsNavMenu[]
	profileNav: NavLink[]
	threedotsNav: NavLink[]
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
	mainNav: NavLink[]
}

/** Profile navigation context - user menu items (URLs only) */
export interface TProfileNavContext {
	profileNav: NavLink[]
}

/** Footer navigation context - footer links (flat list) */
export interface TFooterNavContext {
	footerNav: NavLink[]
}
