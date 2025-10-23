import type { Menu, Page, Doc } from '@payload-types'
import type {
	TNavData,
	TProcessedNavData,
	NavItem,
	MainNavEntry,
	MainNavGroup,
	DashboardNavGroup,
	DocsNavMenu,
	DocsNavGroup,
	NavFolder,
} from '@/lib/types/navigation'
import type { IconType } from '@/components/ui/custom/icons'

type MenuItemBlock = NonNullable<Menu['menuItems']>[number]
type RawMenuItem = NonNullable<MenuItemBlock>['menuItems']
type MenuItem = RawMenuItem
type MenuGroupItem = Extract<MenuItem, { groupItems?: unknown; type?: string | null }>
type GroupItemBlock = NonNullable<MenuGroupItem['groupItems']>[number]
type GroupItem = NonNullable<GroupItemBlock>['groupItem']
type GroupItemWithFolder = Extract<GroupItem, { folderItems?: unknown }>
type FolderItemBlock = NonNullable<GroupItemWithFolder['folderItems']>[number]
type FolderItem = NonNullable<FolderItemBlock>['folderItem']

type LinkItem = {
	type?: string | null
	icon?: IconType | null
	label?: string | null
	groupItems?: (GroupItemBlock | null)[] | null
	page?: {
		relationTo: 'pages'
		value: number | Page
	} | null
	doc?: {
		relationTo: 'docs'
		value: number | Doc
	} | null
	url?: string | null
}

const HOME_SLUG = 'home'

const isMenuGroupItem = (item: MenuItem | undefined): item is MenuGroupItem => {
	return Boolean(item && item.type === 'group')
}

const resolvePageHref = (page: Page | null | undefined): string | null => {
	if (!page) return null
	const { slug } = page
	if (!slug) return null
	return slug === HOME_SLUG ? '/' : `/${slug}`
}

const resolveDocHref = (doc: Doc | null | undefined): string | null => {
	if (!doc) return null
	const { slug } = doc
	if (!slug) return null
	return `/docs/${slug}`
}

const getRelationshipValue = <T extends Page | Doc>(
	rel: { value: number | T } | null | undefined,
): T | null => {
	if (!rel) return null
	const { value } = rel
	return typeof value === 'number' ? null : (value as T)
}

const createNavItemFromLinkItem = (item: LinkItem | undefined): NavItem | null => {
	if (!item) return null

	let label = item.label ?? undefined
	let href: string | null = null
	let icon = item.icon as IconType | null | undefined

	if (item.type === 'page') {
		const page = getRelationshipValue<Page>(item.page)
		href = resolvePageHref(page)
		if (!label && page) {
			label = page.title
		}
	} else if (item.type === 'doc') {
		const doc = getRelationshipValue<Doc>(item.doc)
		href = resolveDocHref(doc)
		if (!label && doc) {
			label = doc.title
		}
		if (!icon && doc?.icon) {
			icon = doc.icon as IconType
		}
	} else if (item.type === 'url') {
		href = item.url ?? null
	} else {
		return null
	}

	if (!href || !label) return null

	return {
		type: 'item',
		label,
		href,
		icon: icon ?? undefined,
	}
}

const createNavItemFromMenuItem = (item: MenuItem | undefined): NavItem | null => {
	if (!item || isMenuGroupItem(item)) return null
	return createNavItemFromLinkItem(item)
}

const createNavItemFromGroupItem = (item: GroupItem | undefined): NavItem | null => {
	return createNavItemFromLinkItem(item)
}

const createNavItemFromFolderItem = (item: FolderItem | undefined): NavItem | null => {
	return createNavItemFromLinkItem(item)
}

const createNavFolderFromGroupItem = (item: GroupItem | undefined): NavFolder | null => {
	if (!item) return null
	const label = item.label
	if (!label) return null
	const icon = (item.icon as IconType | null | undefined) ?? undefined
	const folderItems: NavItem[] = []

	for (const folderItemBlock of item.folderItems ?? []) {
		const folderItem = folderItemBlock?.folderItem
		const navItem = createNavItemFromFolderItem(folderItem)
		if (navItem) folderItems.push(navItem)
	}

	if (!folderItems.length) return null

	return {
		type: 'folder',
		label,
		icon,
		items: folderItems,
	}
}

const createMainNavGroup = (item: MenuItem | undefined): MainNavGroup | null => {
	if (!item) return null
	const label = item.label
	if (!label) return null
	return {
		type: 'group',
		label,
		icon: (item.icon as IconType | null | undefined) ?? undefined,
	}
}

const processMainNav = (menu?: Menu): MainNavEntry[] => {
	if (!menu?.menuItems) return []

	return menu.menuItems.reduce<MainNavEntry[]>((acc, block) => {
		const menuItem = block?.menuItems
		if (!menuItem) return acc

		if (menuItem.type === 'page') {
			const navItem = createNavItemFromMenuItem(menuItem)
			if (navItem) acc.push(navItem)
		} else if (menuItem.type === 'group') {
			const group = createMainNavGroup(menuItem)
			if (group) acc.push(group)
		}

		return acc
	}, [])
}

const processDashboardNav = (menu?: Menu): DashboardNavGroup[] => {
	if (!menu?.menuItems) return []
	const groups: DashboardNavGroup[] = []
	let currentGroup: DashboardNavGroup | null = null

	const startGroup = (label?: string | null) => {
		const group: DashboardNavGroup = {
			label: label ?? '',
			items: [],
		}
		groups.push(group)
		currentGroup = group
		return group
	}

	for (const block of menu.menuItems) {
		const menuItem = block?.menuItems
		if (!menuItem) continue

		if (isMenuGroupItem(menuItem)) {
			const group = startGroup(menuItem.label ?? '')
			for (const groupItemBlock of menuItem.groupItems ?? []) {
				const groupItem = groupItemBlock?.groupItem
				if (!groupItem) continue

				if (groupItem.type === 'folder') {
					for (const folderItemBlock of groupItem.folderItems ?? []) {
						const folderItem = folderItemBlock?.folderItem
						const navItem = createNavItemFromFolderItem(folderItem)
						if (navItem) {
							group.items.push(navItem)
						}
					}
					continue
				}

				const navItem = createNavItemFromGroupItem(groupItem)
				if (navItem) {
					group.items.push(navItem)
				}
			}

			currentGroup = null
			continue
		}

		const navItem = createNavItemFromMenuItem(menuItem)
		if (!navItem) continue

		if (!currentGroup || currentGroup.label) {
			currentGroup = startGroup('')
		}
		currentGroup.items.push(navItem)
	}

	return groups.filter((group) => group.items.length)
}

const processFooterNav = (menu?: Menu): NavItem[] => {
	if (!menu?.menuItems) return []
	return menu.menuItems
		.map((block) => createNavItemFromMenuItem(block?.menuItems))
		.filter((item): item is NavItem => Boolean(item))
}

const processDocsNav = (menus?: Menu[]): DocsNavMenu[] => {
	if (!menus?.length) return []

	return menus.reduce<DocsNavMenu[]>((acc, menu) => {
		const navGroups: DocsNavGroup[] = []
		let currentGroup: DocsNavGroup | null = null

		const startDocsGroup = (label?: string | null) => {
			const group: DocsNavGroup = { label: label ?? '', items: [] }
			navGroups.push(group)
			currentGroup = group
			return group
		}

		for (const block of menu.menuItems ?? []) {
			const menuItem = block?.menuItems
			if (!menuItem) continue

		if (isMenuGroupItem(menuItem)) {
			const group = startDocsGroup(menuItem.label ?? '')
			for (const groupItemBlock of menuItem.groupItems ?? []) {
				const groupItem = groupItemBlock?.groupItem
				if (!groupItem) continue

				if (groupItem.type === 'folder') {
					const folder = createNavFolderFromGroupItem(groupItem)
					if (folder) {
						group.items.push(folder)
					}
					continue
				}

				const navItem = createNavItemFromGroupItem(groupItem)
				if (navItem) {
						group.items.push(navItem)
					}
				}

				currentGroup = null
				continue
			}

			const navItem = createNavItemFromMenuItem(menuItem)
			if (!navItem) continue

			if (!currentGroup || currentGroup.label) {
				currentGroup = startDocsGroup('')
			}

			currentGroup.items.push(navItem)
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

const processMainNavForThreeDots = (entries: MainNavEntry[]): NavItem[] => {
	return entries.reduce<NavItem[]>((acc, entry) => {
		if (entry.type === 'item') {
			acc.push(entry)
		}
		return acc
	}, [])
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
