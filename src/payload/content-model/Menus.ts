import { CollectionConfig } from 'payload'
import { adminAndEditor } from '@/payload/access'
import { revalidateCache, revalidateCacheAfterDelete } from '@/payload/hooks/revalidate-cache'
import { createParentMenuLink } from '@/payload/fields/menu-items'
import { MenuTypeSelectField } from '@/payload/fields/menu-type-select'

export const MenuTypes = [
	{ label: 'Main', value: 'mainMenu' },
	{ label: 'Footer', value: 'footerMenu' },
	{ label: 'Profile', value: 'profileMenu' },
	{ label: 'Dashboard', value: 'dashboardMenu' },
	{ label: 'Docs', value: 'docsMenu' },
]

export const Menus: CollectionConfig = {
	slug: 'menus',
	labels: {
		singular: 'Menu',
		plural: 'Menus',
	},
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
		maxPerDoc: 10,
	},
	access: {
		create: adminAndEditor,
		read: adminAndEditor,
		update: adminAndEditor,
		delete: adminAndEditor,
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
						path: 'src/payload/fields/menu-type-select.tsx',
						exportName: 'MenuTypeSelectField',
					},
				},
			},
		},
		{
			name: 'name',
			type: 'text',
			required: true,
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
						path: 'src/payload/components/menu-labels.ts',
						exportName: 'MenuLinkLabel',
					},
				},
			},
			fields: [createParentMenuLink()],
			minRows: 1,
			maxRows: 15,
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
						if (siblingData?._status === 'published' && !value) {
							return new Date()
						}
						return value
					},
				],
			},
		},
	],
	hooks: {
		afterChange: [revalidateCache],
		afterDelete: [revalidateCacheAfterDelete],
	},
}
