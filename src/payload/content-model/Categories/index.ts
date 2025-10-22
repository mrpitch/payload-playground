import type { CollectionConfig } from 'payload'
import { admin, adminAndEditor } from '@/payload/access'
import {
	revalidateCache,
	revalidateCacheAfterDelete,
} from '@/payload/content-model/shared/hooks/revalidate-cache'

export const Categories: CollectionConfig = {
	slug: 'categories',
	admin: {
		group: 'Content',
		useAsTitle: 'title',
		defaultColumns: ['title', 'slug', 'publishedAt', 'status'],
	},
	access: {
		create: admin,
		read: adminAndEditor,
		update: admin,
		delete: admin,
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
			name: 'title',
			type: 'text',
			localized: true,
		},
		{
			name: 'slug',
			type: 'text',
			localized: true,
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
	hooks: {
		afterChange: [revalidateCache],
		afterDelete: [revalidateCacheAfterDelete],
	},
}
