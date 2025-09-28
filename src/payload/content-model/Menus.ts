import { CollectionConfig } from 'payload'
import { adminAndEditor } from '@/payload/access'
import { revalidateCache, revalidateCacheAfterDelete } from '@/payload/hooks/revalidate-cache'

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
