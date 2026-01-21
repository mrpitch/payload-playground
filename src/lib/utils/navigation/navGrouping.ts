import type { Menu } from '@payload-types'
import type {
	NavLink,
	NavFolder,
	DashboardNavGroup,
	DocsNavGroup,
	DocsNavMenu,
} from '@/lib/types/navigation'
import { createNavLink, warnEmptyGroup } from '@/lib/utils/navigation/resolveNavLink'
import type { GroupItem, MenuGroupItem } from '@/lib/utils/navigation/payloadMenuTypes'
import { isMenuGroupItem } from '@/lib/utils/navigation/payloadMenuTypes'
import { toIcon } from './sharedUtils'

/**
 * Creates a navigation folder from a group item
 * @param item - Group item to convert to folder
 * @returns NavFolder object or null if invalid or empty
 * @example
 * createNavFolder({ label: 'Guides', folderItems: [...] })
 * // => { type: 'folder', label: 'Guides', items: [...], icon: undefined }
 */
const createNavFolder = (item: GroupItem | undefined): NavFolder | null => {
	if (!item) return null

	const label = item.label
	if (!label) return null

	const folderItems: NavLink[] = []
	for (const folderItemBlock of item.folderItems ?? []) {
		const folderItem = folderItemBlock?.folderItem
		const navLink = createNavLink(folderItem)
		if (navLink) folderItems.push(navLink)
	}

	if (!folderItems.length) {
		warnEmptyGroup('folder', label)
		return null
	}

	return {
		type: 'folder',
		label,
		icon: toIcon(item.icon),
		items: folderItems,
	}
}

/**
 * Processes a menu into dashboard navigation groups
 * Groups menu items by their type and structure
 * @param menu - Menu to process
 * @returns Array of dashboard navigation groups
 * @example
 * processDashboardNav(menu) // => [{ label: 'Overview', items: [...] }]
 */
export const processDashboardNav = (menu?: Menu): DashboardNavGroup[] => {
	if (!menu?.menuItems) return []

	try {
		const groups: DashboardNavGroup[] = []
		let currentGroup: DashboardNavGroup | null = null

		const ensureUnnamedGroup = (): DashboardNavGroup => {
			if (currentGroup && currentGroup.label === '') return currentGroup
			const group: DashboardNavGroup = { label: '', items: [] }
			groups.push(group)
			currentGroup = group
			return group
		}

		for (const block of menu.menuItems) {
			const menuItem = block?.menuItems
			if (!menuItem) continue

			if (isMenuGroupItem(menuItem)) {
				const groupItems = collectGroupLinks(menuItem)
				if (groupItems.length) {
					groups.push({
						label: menuItem.label ?? '',
						items: groupItems,
					})
				} else {
					warnEmptyGroup('dashboard group', menuItem.label ?? '', menu?.name ?? undefined)
				}
				currentGroup = null
				continue
			}

			const navLink = createNavLink(menuItem)
			if (!navLink) continue

			const group = ensureUnnamedGroup()
			group.items.push(navLink)
		}

		return groups.filter((group) => group.items.length)
	} catch (error) {
		console.error('[Navigation] Error processing dashboard nav:', error)
		return []
	}
}

/**
 * Processes an array of menus into docs navigation structure
 * Supports folders and nested groups for documentation navigation
 * @param menus - Array of menus to process
 * @returns Array of documentation navigation menus
 * @example
 * processDocsNav([menu1, menu2]) // => [{ name: 'Guide', navGroups: [...] }]
 */
export const processDocsNav = (menus?: Menu[]): DocsNavMenu[] => {
	if (!Array.isArray(menus) || menus.length === 0) return []

	try {
		return menus.reduce<DocsNavMenu[]>((acc, menu) => {
			const navGroups: DocsNavGroup[] = []
			let currentGroup: DocsNavGroup | null = null

			const ensureUnnamedDocsGroup = (): DocsNavGroup => {
				if (currentGroup && currentGroup.label === '') return currentGroup
				const group: DocsNavGroup = { label: '', items: [] }
				navGroups.push(group)
				currentGroup = group
				return group
			}

			for (const block of menu.menuItems ?? []) {
				const menuItem = block?.menuItems
				if (!menuItem) continue

				if (isMenuGroupItem(menuItem)) {
					const groupItems = collectGroupEntriesWithFolders(menuItem)
					if (groupItems.length) {
						navGroups.push({
							label: menuItem.label ?? '',
							items: groupItems,
						})
					} else {
						warnEmptyGroup('docs group', menuItem.label ?? '', menu.name ?? undefined)
					}
					currentGroup = null
					continue
				}

				const navLink = createNavLink(menuItem)
				if (!navLink) continue

				const group = ensureUnnamedDocsGroup()
				group.items.push(navLink)
			}

			const populatedGroups = navGroups.filter((group) => group.items.length)
			if (!populatedGroups.length) return acc

			acc.push({
				name: menu.name ?? '',
				shortDescription: menu.shortDescription,
				navGroups: populatedGroups,
			})

			return acc
		}, [])
	} catch (error) {
		console.error('[Navigation] Error processing docs nav:', error)
		return []
	}
}

/**
 * Collects all navigation links from a group item, flattening folders
 * Used for dashboard navigation where folders are not displayed
 * @param groupItem - Menu group item to collect links from
 * @returns Array of flattened navigation links
 * @example
 * collectGroupLinks(groupItem) // => [{ type: 'link', label: 'Item1', ... }]
 */
export const collectGroupLinks = (groupItem: MenuGroupItem): NavLink[] => {
	const items: NavLink[] = []

	try {
		for (const entry of groupItem.groupItems ?? []) {
			const child = entry?.groupItem
			if (!child) continue

			if (child.type === 'folder') {
				// Flatten folder items
				for (const folderEntry of child.folderItems ?? []) {
					const navLink = createNavLink(folderEntry?.folderItem)
					if (navLink) items.push(navLink)
				}
			} else {
				const navLink = createNavLink(child)
				if (navLink) items.push(navLink)
			}
		}
	} catch (error) {
		console.error('[Navigation] Error collecting group links:', error)
	}

	return items
}

/**
 * Collects navigation entries from a group item, preserving folder structure
 * Used for docs navigation where folders are displayed as collapsible sections
 * @param groupItem - Menu group item to collect entries from
 * @returns Array of navigation links and folders
 * @example
 * collectGroupEntriesWithFolders(groupItem)
 * // => [{ type: 'folder', label: 'Guides', items: [...] }, { type: 'link', ... }]
 */
export const collectGroupEntriesWithFolders = (
	groupItem: MenuGroupItem,
): (NavFolder | NavLink)[] => {
	const items: (NavFolder | NavLink)[] = []

	try {
		for (const entry of groupItem.groupItems ?? []) {
			const child = entry?.groupItem
			if (!child) continue

			if (child.type === 'folder') {
				const folder = createNavFolder(child)
				if (folder) items.push(folder)
			} else {
				const navLink = createNavLink(child)
				if (navLink) items.push(navLink)
			}
		}
	} catch (error) {
		console.error('[Navigation] Error collecting group entries:', error)
	}

	return items
}
