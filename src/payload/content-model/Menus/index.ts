import type { CollectionConfig } from 'payload'

import { createMenuItem } from './fields/menu-items'

export const MenuTypes = [
	{ label: 'Main', value: 'mainMenu' },
	{ label: 'Footer', value: 'footerMenu' },
	{ label: 'Profile', value: 'profileMenu' },
	{ label: 'Dashboard', value: 'dashboardMenu' },
	{ label: 'Docs', value: 'docsMenu' },
]

export const Menus: CollectionConfig = {
	slug: 'menus',
	admin: {
		group: 'Content',
		useAsTitle: 'name',
		defaultColumns: ['name', 'publishedAt', 'status'],
	},
	versions: {
		drafts: {
			autosave: {
				interval: 1000, // We set this interval for optimal live preview
			},
			schedulePublish: true,
		},
		maxPerDoc: 3,
	},
	fields: [
		{
			name: 'menuType',
			type: 'select',
			label: 'Menu Type',
			required: true,
			options: MenuTypes,
			admin: {
				components: {
					Field: {
						path: 'src/payload/content-model/Menus/fields/menu-type-select.tsx',
						exportName: 'MenuTypeSelectField',
					},
				},
			},
		},
		{
			name: 'name',
			type: 'text',
			localized: true,
		},
		{
			name: 'shortDescription',
			type: 'text',
			label: 'Short Description',
			admin: {
				condition: (data) => data?.menuType === 'docsMenu',
			},
		},
		{
			name: 'menuItems',
			type: 'array',
			label: 'Menu Items',
			admin: {
				initCollapsed: true,
				components: {
					RowLabel: {
						path: 'src/payload/content-model/Menus/fields/menu-labels.ts',
						exportName: 'MenuItemLabel',
					},
				},
			},
			fields: [createMenuItem()],
			dbName: 'menu_items',
		},

		{
			name: 'publishedAt',
			type: 'date',
			admin: {
				date: {
					pickerAppearance: 'dayAndTime',
				},
				position: 'sidebar',
			},
			hooks: {
				beforeChange: [
					({ siblingData, value }) => {
						if (siblingData._status === 'published' && !value) {
							return new Date()
						}
						return value
					},
				],
			},
		},
	],
}
