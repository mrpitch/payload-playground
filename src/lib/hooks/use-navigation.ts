/**
 * useNavigation Hook - High-Performance Navigation Data Access
 *
 * This hook provides instant access to pre-processed navigation data through
 * context-level caching. All expensive processing operations are done in NavigationProvider.
 *
 * ## Usage:
 * ```typescript
 * const { mainNav, settings } = useNavigation(NavigationType.MainNav)
 * const { dashboardNav } = useNavigation(NavigationType.DashboardNav)
 * const { docsNav } = useNavigation(NavigationType.DocsNav)
 * ```
 */

import { useContext } from 'react'
import { NavigationContext } from '@/components/utils/nav-provider'
import type {
	TMainNavContext,
	TDashboardNavContext,
	TDocsNavContext,
	TFooterNavContext,
	TThreedotsNavContext,
	TProfileNavContext,
} from '@/lib/types/navigation'

/**
 * Navigation type enum
 *
 * Defines the different types of navigation available in the application.
 * Each type corresponds to a specific use case and returns appropriately
 * filtered and processed data.
 */
export enum NavigationType {
	/** Main header navigation (all items grouped) */
	MainNav = 'mainNav',
	/** Dashboard sidebar navigation (all items grouped) */
	DashboardNav = 'dashboardNav',
	/** Documentation navigation (multiple menus with groups) */
	DocsNav = 'docsNav',
	/** Footer navigation (flat links) */
	FooterNav = 'footerNav',
	/** Three dots/hamburger menu navigation (pages only) */
	ThreedotsNav = 'threedotsNav',
	/** Profile/user menu navigation (URLs only) */
	ProfileNav = 'profileNav',
}

/**
 * Overloaded function signatures for type safety
 *
 * These overloads provide compile-time type checking and IntelliSense support.
 * TypeScript will automatically infer the correct return type based on the
 * NavigationType parameter passed to the function.
 */
export function useNavigation(type: NavigationType.MainNav): TMainNavContext
export function useNavigation(type: NavigationType.DashboardNav): TDashboardNavContext
export function useNavigation(type: NavigationType.DocsNav): TDocsNavContext
export function useNavigation(type: NavigationType.FooterNav): TFooterNavContext
export function useNavigation(type: NavigationType.ThreedotsNav): TThreedotsNavContext
export function useNavigation(type: NavigationType.ProfileNav): TProfileNavContext
export function useNavigation(
	type: NavigationType,
):
	| TMainNavContext
	| TDashboardNavContext
	| TDocsNavContext
	| TThreedotsNavContext
	| TProfileNavContext
	| TFooterNavContext {
	/**
	 * Get navigation context from React Context
	 *
	 * This context contains all pre-processed navigation data that was
	 * computed once in the NavigationProvider using useMemo.
	 */
	const ctx = useContext(NavigationContext)
	if (!ctx) throw new Error('useNavigation must be used within NavigationProvider')

	/**
	 * Return pre-processed data based on navigation type
	 *
	 * This is the core of the performance optimization. Instead of processing
	 * raw data on every render, we simply return the pre-processed data from
	 * context. All expensive operations have already been completed.
	 *
	 * ## Data Flow:
	 * 1. NavigationProvider processes all data once using useMemo
	 * 2. Processed data is stored in NavigationContext
	 * 3. This hook simply returns the appropriate data based on type
	 * 4. Components receive instant, processed navigation data
	 */
	switch (type) {
		case NavigationType.MainNav:
			return {
				mainNav: ctx.mainNav,
				settings: ctx.settings,
			}

		case NavigationType.DashboardNav:
			return {
				dashboardNav: ctx.dashboardNav,
				settings: ctx.settings,
			}

		case NavigationType.DocsNav:
			return {
				docsNav: ctx.docsNav,
				settings: ctx.settings,
			}

		case NavigationType.FooterNav:
			return {
				footerNav: ctx.footerNav,
			}

		case NavigationType.ThreedotsNav:
			/**
			 * Note: ThreedotsNav returns ctx.threedotsNav but maps to mainNav
			 * in the return type. This is because threedots navigation is
			 * filtered from main navigation (pages only) but uses the same
			 * structure as main navigation.
			 */
			return {
				mainNav: ctx.threedotsNav,
			}

		case NavigationType.ProfileNav:
			return {
				profileNav: ctx.profileNav,
			}

		default:
			throw new Error(`Unknown navigation type: ${type}`)
	}
}

/**
 * Utility function to check if a navigation item is currently active
 *
 * This is a pure function that compares a pathname with a navigation item's href
 * to determine if the item should be highlighted as active.
 *
 * @param href - The href of the navigation item to check
 * @param pathname - The current pathname (obtained from usePathname() in component)
 * @returns true if the pathname matches the href, false otherwise
 *
 * ## Usage:
 * ```typescript
 * const pathname = usePathname()
 * const isCurrentPage = isActive('/dashboard', pathname)
 * // Use this to conditionally apply active styles
 * ```
 */
export function isActive(href: string, pathname: string) {
	return href === pathname
}
