import type { Menu } from '@payload-types'
import type { NavLink, NavFolder, DashboardNavGroup, DocsNavGroup, DocsNavMenu } from '@/lib/types/navigation'
import type { IconType } from '@/components/ui/custom/icons'
import { createNavLink, warnEmptyGroup } from '@/lib/utils/navigation/resolveNavLink'
import type { GroupItem, MenuGroupItem } from '@/lib/utils/navigation/payloadMenuTypes'
import { isMenuGroupItem } from '@/lib/utils/navigation/payloadMenuTypes'
const toIcon = (icon: unknown): IconType | undefined => {
	return typeof icon === 'string' ? (icon as IconType) : undefined
}

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

export const processDashboardNav = (menu?: Menu): DashboardNavGroup[] => {
	if (!menu?.menuItems) return []

	const groups: DashboardNavGroup[] = []
	let currentGroup: DashboardNavGroup | null = null

	const ensureUnnamedGroup = () => {
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
}

export const processDocsNav = (menus?: Menu[]): DocsNavMenu[] => {
	if (!menus?.length) return []

	return menus.reduce<DocsNavMenu[]>((acc, menu) => {
		const navGroups: DocsNavGroup[] = []
		let currentGroup: DocsNavGroup | null = null

		const ensureUnnamedDocsGroup = () => {
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
}

export const collectGroupLinks = (groupItem: MenuGroupItem): NavLink[] => {
	const items: NavLink[] = []
	for (const entry of groupItem.groupItems ?? []) {
		const child = entry?.groupItem
		if (!child) continue

		if (child.type === 'folder') {
			for (const folderEntry of child.folderItems ?? []) {
				const navLink = createNavLink(folderEntry?.folderItem)
				if (navLink) items.push(navLink)
			}
		} else {
			const navLink = createNavLink(child)
			if (navLink) items.push(navLink)
		}
	}
	return items
}

export const collectGroupEntriesWithFolders = (groupItem: MenuGroupItem): (NavFolder | NavLink)[] => {
	const items: (NavFolder | NavLink)[] = []
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
	return items
}
