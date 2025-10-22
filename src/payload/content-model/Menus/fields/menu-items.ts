import type { Field, GroupField, ArrayField } from 'payload'

import { ContentItemsIconOptions } from '@/payload/content-model/shared/fields/content-items-icons'

// Types
export type TMenuItemType = 'group' | 'page' | 'doc' | 'url'

export type TMenuItemBase = {
	type: TMenuItemType
	label?: string
}

export type TMenuItemLinkWithIcon = TMenuItemBase & {
	icon?: string
}

export type TMenuItemLink = TMenuItemBase &
	TMenuItemLinkWithIcon & {
		pages?: string
		docs?: string
		url?: string
	}

export type TGroupItemType = 'page' | 'doc' | 'url' | 'folder'

export type TGroupItemBase = {
	type: TGroupItemType
	label?: string
}

export type TGroupItemWithIcon = TGroupItemBase & {
	icon?: string
}

export type TGroupItem = TGroupItemWithIcon & {
	page?: string
	doc?: string
	url?: string
	folder?: string
}

export type TFolderItemType = 'page' | 'doc' | 'url'

export type TFolderItemBase = {
	type: TFolderItemType
	label?: string
}

export type TFolderItemWithIcon = TFolderItemBase & {
	icon?: string
}

export type TFolderItem = TFolderItemWithIcon & {
	page?: string
	doc?: string
	url?: string
}

// Options
export const menuItemTypeOptions: { label: string; value: TMenuItemType }[] = [
	{
		label: 'Group',
		value: 'group',
	},
	{
		label: 'Page',
		value: 'page',
	},
	{
		label: 'Doc',
		value: 'doc',
	},
	{
		label: 'URL',
		value: 'url',
	},
]

export const groupItemTypeOptions: { label: string; value: TGroupItemType }[] = [
	{
		label: 'Page',
		value: 'page',
	},
	{
		label: 'Doc',
		value: 'doc',
	},
	{
		label: 'Folder',
		value: 'folder',
	},
	{
		label: 'URL',
		value: 'url',
	},
]

// Field Creators

// shared fields

/**
 * Creates the icon selector field
 */
export const createIconField = (): Field => ({
	name: 'icon',
	type: 'select',
	admin: {
		width: '20%',
		condition: (_, siblingData) =>
			siblingData?.type === 'page' || siblingData?.type === 'folder' || siblingData?.type === 'url',
	},
	options: ContentItemsIconOptions,
	dbName: 'item_icon',
})

/**
 *
 * Creates label field
 */
export const createLabelField = (): Field => ({
	name: 'label',
	type: 'text',
	label: 'Label',
	admin: {
		width: '40%',
	},
})

/**
 * Creates the type selector field
 */
export const createItemTypeField = (): Field => ({
	name: 'type',
	type: 'text',
	admin: {
		components: {
			Field: {
				path: 'src/payload/content-model/Menus/fields/menu-items-type-radio.tsx',
				exportName: 'CustomRadioFieldClient',
			},
		},
	},
})

//menu item fields

export const createMenuItem = (): GroupField => {
	return {
		name: 'menuItems',
		type: 'group',
		label: 'Menu Items',
		admin: {
			hideGutter: true,
		},
		fields: createBaseMenuItemFields(),
	}
}

/**
 *
 * @returns Base menu item fields
 */
const createBaseMenuItemFields = (): Field[] => {
	const fields: Field[] = []

	fields.push(createItemTypeField())
	fields.push({
		type: 'row',
		fields: [createIconField(), createLabelField(), ...createMenuItemLinkTypeFields()],
	})
	fields.push(createGroupItems())
	return fields
}

/**
 * Creates the base link type fields (pages, docs, external URL)
 */
export const createMenuItemLinkTypeFields = (): Field[] => [
	{
		name: 'page',
		type: 'relationship',
		admin: {
			condition: (_, siblingData) => siblingData?.type === 'page',
		},
		label: 'Page to link to',
		relationTo: ['pages'],
		required: true,
	},
	{
		name: 'doc',
		type: 'relationship',
		label: 'Docs to link to',
		admin: {
			condition: (_, siblingData) => siblingData?.type === 'doc',
		},
		relationTo: ['docs'],
		required: true,
	},
	{
		name: 'url',
		type: 'text',
		label: 'URL to link to',
		admin: {
			condition: (_, siblingData) => siblingData?.type === 'url',
		},
		required: true,
	},
]

// group item fields

/**
 * Create Group Item Field
 */
export const createGroupItems = (): ArrayField => {
	return {
		name: 'groupItems',
		type: 'array',
		label: 'Group Items',
		admin: {
			initCollapsed: false,
			condition: (_, siblingData) => siblingData?.type === 'group', // Add this condition
			components: {
				RowLabel: {
					path: 'src/payload/content-model/Menus/fields/menu-labels.ts',
					exportName: 'GroupItemLabel',
				},
			},
		},
		fields: [createGroupItem()],
		dbName: 'menu_group_items',
	}
}

export const createGroupItem = (): GroupField => {
	return {
		name: 'groupItem',
		type: 'group',
		label: 'Group Item',
		admin: {
			hideGutter: true,
		},
		fields: createBaseGroupItemFields(),
	}
}

const createBaseGroupItemFields = (): Field[] => {
	const fields: Field[] = []
	fields.push(createItemTypeField())
	fields.push({
		type: 'row',
		fields: [createIconField(), createLabelField(), ...createGroupItemLinkTypeFields()],
	})
	fields.push(createFolderItems())
	return fields
}

/**
 * Create group item link type fields
 */

export const createGroupItemLinkTypeFields = (): Field[] => [
	{
		name: 'page',
		type: 'relationship',
		admin: {
			condition: (_, siblingData) => siblingData?.type === 'page',
		},
		label: 'Page to link to',
		relationTo: ['pages'],
		required: true,
	},
	{
		name: 'doc',
		type: 'relationship',
		label: 'Docs to link to',
		admin: {
			condition: (_, siblingData) => siblingData?.type === 'doc',
		},
		relationTo: ['docs'],
		required: true,
	},
	{
		name: 'url',
		type: 'text',
		label: 'URL to link to',
		admin: {
			condition: (_, siblingData) => siblingData?.type === 'url',
		},
		required: true,
	},
]

//folder item fields

export const createFolderItems = (): ArrayField => {
	return {
		name: 'folderItems',
		type: 'array',
		label: 'Folder Items',
		admin: {
			initCollapsed: false,
			condition: (_, siblingData) => siblingData?.type === 'folder',
			components: {
				RowLabel: {
					path: 'src/payload/content-model/Menus/fields/menu-labels.ts',
					exportName: 'FolderItemLabel',
				},
			},
		},
		fields: [createFolderItem()],
		dbName: 'menu_folder_items',
	}
}
/**
 * Create Folder Item Field
 */
export const createFolderItem = (): GroupField => {
	return {
		name: 'folderItem',
		type: 'group',
		label: 'Folder Item',
		admin: {
			hideGutter: true,
		},
		fields: createBaseFolderItemFields(),
	}
}

const createBaseFolderItemFields = (): Field[] => {
	const fields: Field[] = []
	fields.push(createItemTypeField())
	fields.push({
		type: 'row',
		fields: [createIconField(), createLabelField(), ...createFolderItemLinkTypeFields()],
	})
	return fields
}

/**
 * Create Folder Item Link Type Fields
 */
export const createFolderItemLinkTypeFields = (): Field[] => [
	{
		name: 'page',
		type: 'relationship',
		admin: {
			condition: (_, siblingData) => siblingData?.type === 'page',
		},
		label: 'Page to link to',
		relationTo: ['pages'],
		required: true,
	},
	{
		name: 'doc',
		type: 'relationship',
		label: 'Doc to link to',
		admin: {
			condition: (_, siblingData) => siblingData?.type === 'doc',
		},
		relationTo: ['docs'],
		required: true,
	},
]
