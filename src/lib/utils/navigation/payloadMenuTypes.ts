import type { Menu } from '@payload-types'

export type MenuItemBlock = NonNullable<Menu['menuItems']>[number]
export type MenuItem = NonNullable<MenuItemBlock>['menuItems']
export type MenuGroupItem = Extract<MenuItem, { type?: string | null; groupItems?: unknown }>
export type GroupItemBlock = NonNullable<MenuGroupItem['groupItems']>[number]
export type GroupItem = NonNullable<GroupItemBlock>['groupItem']

export const isMenuGroupItem = (
	item: MenuItem | undefined,
): item is MenuGroupItem & { type: 'group' } => {
	return Boolean(item && item.type === 'group')
}
