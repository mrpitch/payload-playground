/**
 * Navigation Provider - Context-Level Caching Implementation
 *
 * This provider implements a high-performance navigation system using context-level caching.
 * All navigation data processing happens once per request and is cached for the entire
 * component tree, eliminating redundant processing on every render.
 *
 * ## Why This Approach?
 *
 * **Problem**: The original useNavigation hook processed raw navigation data on every render,
 * causing expensive operations like createNavigationGroups() and processMenuItem() to run
 * multiple times for the same data across different components.
 *
 * **Solution**: Move all processing logic to the NavigationProvider and use useMemo to cache
 * the processed results. Components now receive pre-processed data instantly.
 *
 * ## Performance Benefits:
 * - ✅ Zero client-side processing - data arrives ready to use
 * - ✅ No re-renders from processing logic
 * - ✅ Better caching - processed data cached at request level
 * - ✅ Eliminated redundant processing - same data processed once
 * - ✅ Smaller bundle - processing logic runs server-side
 *
 * ## Architecture:
 * 1. Raw navigation data fetched server-side (cached with React's cache())
 * 2. NavigationProvider processes all data once using useMemo
 * 3. useNavigation hook simply returns pre-processed data
 * 4. Components receive instant, processed navigation data
 */

'use client'
import { createContext, useContext, use, useMemo } from 'react'
import type { Usable } from 'react'
import type { TNavData } from '@/lib/utils/getNavData'
import type { TNavGroup } from '@/lib/hooks/use-navigation'

/**
 * Processed navigation data interface
 *
 * This interface defines the structure of navigation data after processing.
 * All navigation items are grouped based on 'nolink' type items, creating
 * logical sections in the navigation.
 */
export interface TProcessedNavData {
	/** Main navigation groups (header navigation) */
	mainNav: TNavGroup[]
	/** Dashboard navigation groups (sidebar navigation) */
	dashboardNav: TNavGroup[]
	/** Documentation navigation with multiple menus and their groups */
	docsNav: Array<{
		name: string
		shortDescription?: string | null
		navGroups: TNavGroup[]
	}>
	/** Profile navigation groups (user menu items) */
	profileNav: TNavGroup[]
	/** Three dots navigation groups (mobile/hamburger menu) */
	threedotsNav: TNavGroup[]
	/** Site settings */
	settings: {
		siteName?: string
		siteDescription?: string
	}
}

export const NavigationContext = createContext<TProcessedNavData | null>(null)

/**
 * Processes individual menu items based on their link type
 *
 * This function handles the conversion of raw Payload CMS menu items into
 * standardized navigation items with proper hrefs, icons, and types.
 *
 * @param item - Raw menu item from Payload CMS
 * @returns Processed navigation item or null if invalid
 *
 * ## Supported Link Types:
 * - **pages**: Links to internal pages (generates /{slug} href)
 * - **docs**: Links to documentation pages (generates /docs/{slug} href)
 * - **url**: External links (uses provided URL)
 * - **nolink**: Group headers/labels (empty href, type: 'label')
 * - **folder**: Collapsible groups (empty href, type: 'folder')
 */
function processMenuItem(item: any): any | null {
	// Handle items that are just labels (group headers) without links
	if (!item?.link && item?.label) {
		return {
			label: item.label,
			href: '', // Empty href indicates this is a group label
			icon: item.icon,
		}
	}

	// If no link object, return null
	if (!item?.link) return null

	const { type, pages, docs, url, label, icon, menuChildLinks } = item.link

	// Process child links if they exist
	const childItems: any[] = []
	if (menuChildLinks && Array.isArray(menuChildLinks)) {
		menuChildLinks.forEach((childItem: any) => {
			const processedChild = processMenuItem(childItem)
			if (processedChild) {
				childItems.push(processedChild)
			}
		})
	}

	switch (type) {
		case 'pages':
			if (pages && typeof pages === 'object' && 'value' in pages) {
				const page = pages.value
				if (typeof page === 'object' && page?.slug) {
					return {
						label: label || 'Link',
						href: `/${page.slug}`,
						icon: icon,
						type: 'link',
						children: childItems.length > 0 ? childItems : undefined,
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
						icon: doc.icon,
						type: 'link',
						children: childItems.length > 0 ? childItems : undefined,
					}
				}
			}
			break
		case 'url':
			return {
				label: label || 'Link',
				href: url || '#',
				icon: icon,
				type: 'link',
				children: childItems.length > 0 ? childItems : undefined,
			}
		case 'nolink':
			// Handle label-only items (group headers)
			return {
				label: label || 'Section',
				href: '', // Empty href indicates this is a group label
				icon: icon,
				type: 'label',
				children: childItems.length > 0 ? childItems : undefined,
			}
		case 'folder':
			// Handle folder items (collapsible groups)
			return {
				label: label || 'Folder',
				href: '', // Empty href indicates this is a folder
				icon: icon,
				type: 'folder',
				children: childItems.length > 0 ? childItems : undefined,
			}
	}

	return null
}

/**
 * Creates navigation groups based on 'nolink' items
 *
 * This function implements the core grouping logic that organizes navigation items
 * into logical sections based on the presence of 'nolink' type items.
 *
 * ## Grouping Rules:
 * 1. **No nolink items**: Creates a single group called "Navigation" with all items
 * 2. **Has nolink items**: Creates separate groups for each nolink item
 *    - Each nolink item becomes a group header
 *    - Items following a nolink belong to that group
 *    - Groups close when another nolink is encountered or at the end
 * 3. **Array doesn't start with nolink**: Creates initial "Navigation" group
 *    - Items before the first nolink go into a default "Navigation" group
 *    - Then switches to nolink-named groups
 *
 * @param menuItems - Array of raw menu items to process
 * @returns Array of navigation groups with processed items
 *
 * ## Example:
 * ```typescript
 * // Input: [item1, nolink("Section A"), item2, item3, nolink("Section B"), item4]
 * // Output: [
 * //   { name: "Navigation", items: [item1] },
 * //   { name: "Section A", items: [item2, item3] },
 * //   { name: "Section B", items: [item4] }
 * // ]
 * ```
 */
function createNavigationGroups(menuItems: any[]): TNavGroup[] {
	const groups: TNavGroup[] = []
	let currentGroup: TNavGroup | null = null
	let hasNolinkItems = false

	// Check if there are any nolink items
	const nolinkItems = menuItems.filter((item) => item.link?.type === 'nolink')
	hasNolinkItems = nolinkItems.length > 0

	// If no nolink items, create a single group with all items
	if (!hasNolinkItems) {
		const processedItems = menuItems
			.map(processMenuItem)
			.filter((item): item is any => item !== null)

		groups.push({
			name: 'Navigation',
			items: processedItems,
		})
		return groups
	}

	// Process items and group them
	for (let i = 0; i < menuItems.length; i++) {
		const item = menuItems[i]
		const isNolink = item.link?.type === 'nolink'

		if (isNolink) {
			// If we have a current group, close it
			if (currentGroup) {
				groups.push(currentGroup)
			}

			// Start a new group
			currentGroup = {
				name: item.link?.label || 'Navigation',
				items: [],
			}
		} else {
			// If we don't have a current group (array doesn't start with nolink), create one
			if (!currentGroup) {
				currentGroup = {
					name: 'Navigation',
					items: [],
				}
			}

			// Add the item to the current group
			const processedItem = processMenuItem(item)
			if (processedItem) {
				currentGroup.items.push(processedItem)
			}
		}
	}

	// Close the last group if it exists
	if (currentGroup) {
		groups.push(currentGroup)
	}

	return groups
}

/**
 * NavigationProviderClient - The main provider component
 *
 * This component is the heart of the context-level caching system. It:
 * 1. Receives raw navigation data from the server
 * 2. Processes all navigation data once using useMemo
 * 3. Provides processed data to all child components via context
 *
 * ## Performance Optimization:
 * - Uses `useMemo` to cache processed data
 * - Only re-processes when raw data changes
 * - Eliminates redundant processing across components
 * - Provides instant access to processed navigation data
 *
 * @param value - Raw navigation data from server (wrapped in React's Usable)
 * @param children - Child components that will consume navigation data
 */
export function NavigationProviderClient({
	value,
	children,
}: {
	value: Usable<TNavData>
	children: React.ReactNode
}) {
	const rawData = use(value)

	/**
	 * Pre-process all navigation data once using useMemo
	 *
	 * This is the core performance optimization. All expensive operations
	 * (createNavigationGroups, processMenuItem) happen here once per request,
	 * and the results are cached for the entire component tree.
	 *
	 * ## Processing Pipeline:
	 * 1. **Main Navigation**: Process main menu items into groups
	 * 2. **Dashboard Navigation**: Process dashboard menu items into groups
	 * 3. **Docs Navigation**: Process each docs menu and its items into groups
	 * 4. **Profile Navigation**: Filter for URL items only, then group
	 * 5. **Threedots Navigation**: Filter for pages items only, then group
	 * 6. **Settings**: Extract site settings
	 *
	 * ## Special Filtering:
	 * - **ProfileNav**: Only includes items with `link.type === 'url'`
	 * - **ThreedotsNav**: Only includes items with `link.type === 'pages'`
	 *
	 * This ensures each navigation type gets the appropriate items for its use case.
	 */
	const processedData = useMemo(() => {
		// 1. Process main navigation - all items grouped by nolink headers
		const mainNav = createNavigationGroups(rawData.mainNav?.menuItems || [])

		// 2. Process dashboard navigation - all items grouped by nolink headers
		const dashboardNav = createNavigationGroups(rawData.dashboardNav?.menuItems || [])

		// 3. Process docs navigation - each menu gets its own groups
		const docsNav =
			rawData.docsNav?.map((menu) => ({
				name: menu.name,
				shortDescription: menu.shortDescription,
				navGroups: createNavigationGroups(menu.menuItems || []),
			})) || []

		// 4. Process profile navigation - filter for URL items only (external links)
		const profileNavFiltered =
			rawData.profileNav?.menuItems?.filter((item) => item.link?.type === 'url') || []
		const profileNav = createNavigationGroups(profileNavFiltered)

		// 5. Process threedots navigation - filter for pages items only (internal pages)
		const threedotsNavFiltered =
			rawData.mainNav?.menuItems?.filter((item) => item.link?.type === 'pages') || []
		const threedotsNav = createNavigationGroups(threedotsNavFiltered)

		// 6. Extract site settings
		return {
			mainNav,
			dashboardNav,
			docsNav,
			profileNav,
			threedotsNav,
			settings: {
				siteName: rawData.settings?.siteName,
				siteDescription: rawData.settings?.siteDescription,
			},
		}
	}, [rawData]) // Only re-process when raw data changes

	/**
	 * Provide processed navigation data to all child components
	 *
	 * The processed data is now cached and will be instantly available
	 * to all components that use the useNavigation hook.
	 */
	return <NavigationContext.Provider value={processedData}>{children}</NavigationContext.Provider>
}
