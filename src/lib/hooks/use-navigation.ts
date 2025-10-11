import { useContext } from 'react'
import { NavigationContext } from '@/components/utils/nav-provider'
import type { IconType } from '@/components/ui/custom/icons'

// Base types for processed navigation items
export interface TProcessedNavItem {
	label: string
	href: string
	icon?: IconType
}

export interface TProcessedNavGroup {
	name: string
	shortDescription?: string | null
	menuItems: TProcessedNavItem[]
}

// Navigation type enum
export enum NavigationType {
	MainNav = 'mainNav',
	DashboardNav = 'dashboardNav',
	DocsNav = 'docsNav',
	ThreedotsNav = 'threedotsNav',
	ProfileNav = 'profileNav',
}

// Context-specific return types
export interface TMainNavContext {
	mainNav: TProcessedNavItem[]
	settings: {
		siteName?: string
		siteDescription?: string
	}
}

export interface TDashboardNavContext {
	dashboardNav: TProcessedNavItem[]
	settings: {
		siteName?: string
		siteDescription?: string
	}
}

export interface TDocsNavContext {
	docsNav: TProcessedNavGroup[]
	settings: {
		siteName?: string
		siteDescription?: string
	}
}

export interface TThreedotsNavContext {
	mainNav: TProcessedNavItem[]
}

export interface TProfileNavContext {
	profileNav: TProcessedNavItem[]
}

// Utility function to process menu items based on link type
function processMenuItem(item: any): TProcessedNavItem | null {
	if (!item?.link) return null

	const { type, pages, docs, url, label, icon } = item.link

	switch (type) {
		case 'pages':
			if (pages && typeof pages === 'object' && 'value' in pages) {
				const page = pages.value
				if (typeof page === 'object' && page?.slug) {
					return {
						label: label || 'Link',
						href: `/${page.slug}`,
						icon: icon as IconType,
					}
				}
			}
			break
		case 'docs':
			if (docs && typeof docs === 'object' && 'value' in docs) {
				const doc = docs.value
				if (typeof doc === 'object' && doc?.slug) {
					return {
						label: label || 'Link',
						href: `/docs/${doc.slug}`,
						// For docs, the icon comes from the referenced document, not the menu item
						icon: doc.icon as IconType,
					}
				}
			}
			break
		case 'url':
			return {
				label: label || 'Link',
				href: url || '#',
				icon: icon as IconType,
			}
	}

	return null
}

// Overloaded function signatures for type safety
export function useNavigation(type: NavigationType.MainNav): TMainNavContext
export function useNavigation(type: NavigationType.DashboardNav): TDashboardNavContext
export function useNavigation(type: NavigationType.DocsNav): TDocsNavContext
export function useNavigation(type: NavigationType.ThreedotsNav): TThreedotsNavContext
export function useNavigation(type: NavigationType.ProfileNav): TProfileNavContext
export function useNavigation(
	type: NavigationType,
):
	| TMainNavContext
	| TDashboardNavContext
	| TDocsNavContext
	| TThreedotsNavContext
	| TProfileNavContext {
	const ctx = useContext(NavigationContext)
	if (!ctx) throw new Error('useNavigation must be used within NavigationProvider')

	switch (type) {
		case NavigationType.MainNav: {
			const { mainNav, settings } = ctx
			const processedMainNav =
				mainNav?.menuItems
					?.map(processMenuItem)
					.filter((item): item is TProcessedNavItem => item !== null) || []

			return {
				mainNav: processedMainNav,
				settings: {
					siteName: settings?.siteName,
					siteDescription: settings?.siteDescription,
				},
			}
		}

		case NavigationType.DashboardNav: {
			const { dashboardNav, settings } = ctx
			const processedDashboardNav =
				dashboardNav?.menuItems
					?.map(processMenuItem)
					.filter((item): item is TProcessedNavItem => item !== null) || []

			return {
				dashboardNav: processedDashboardNav,
				settings: {
					siteName: settings?.siteName,
					siteDescription: settings?.siteDescription,
				},
			}
		}

		case NavigationType.DocsNav: {
			const { docsNav, settings } = ctx
			const processedDocsNav =
				docsNav?.map((menu) => ({
					name: menu.name,
					shortDescription: menu.shortDescription,
					menuItems:
						menu.menuItems
							?.map(processMenuItem)
							.filter((item): item is TProcessedNavItem => item !== null) || [],
				})) || []

			return {
				docsNav: processedDocsNav,
				settings: {
					siteName: settings?.siteName,
					siteDescription: settings?.siteDescription,
				},
			}
		}

		case NavigationType.ThreedotsNav: {
			const { mainNav } = ctx
			// Only process pages for threedots nav
			const processedMainNav =
				mainNav?.menuItems
					?.filter((item) => item.link?.type === 'pages')
					.map(processMenuItem)
					.filter((item): item is TProcessedNavItem => item !== null) || []

			return {
				mainNav: processedMainNav,
			}
		}

		case NavigationType.ProfileNav: {
			const { profileNav } = ctx
			// Only process URL items for profile nav
			const processedProfileNav =
				profileNav?.menuItems
					?.filter((item) => item.link?.type === 'url')
					.map(processMenuItem)
					.filter((item): item is TProcessedNavItem => item !== null) || []

			return {
				profileNav: processedProfileNav,
			}
		}

		default:
			throw new Error(`Unknown navigation type: ${type}`)
	}
}
