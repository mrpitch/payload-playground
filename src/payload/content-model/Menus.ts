import { CollectionConfig } from 'payload'
import { adminAndEditor } from '@/payload/access'
import { revalidateCache, revalidateCacheAfterDelete } from '@/payload/hooks/revalidate-cache'
import { createParentMenuLink } from '@/payload/fields/menu-items'

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
	access: {
		create: adminAndEditor,
		read: adminAndEditor,
		update: adminAndEditor,
		delete: adminAndEditor,
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			required: true,
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
