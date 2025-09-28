import type { GlobalConfig } from 'payload'
import { admin } from '@/payload/access/admin'
import { adminAndEditor } from '@/payload/access/admin-and-editor'

export const Settings: GlobalConfig = {
	slug: 'settings',
	admin: {
		group: 'Admin',
	},
	access: {
		read: adminAndEditor,
		update: admin,
	},
	versions: {
		drafts: {
			autosave: {
				interval: 1000, // We set this interval for optimal live preview
			},
			schedulePublish: true,
		},
		max: 10,
	},
	fields: [
		{
			name: 'siteName',
			type: 'text',
			required: true,
		},
		{
			name: 'siteDescription',
			type: 'text',
			required: true,
		},
		{
			name: 'mainMenu',
			label: 'Main Menu',
			type: 'relationship',
			relationTo: 'menus',
		},
		{
			name: 'footerMenu',
			label: 'Footer Menu',
			type: 'relationship',
			relationTo: 'menus',
		},
		{
			name: 'profileMenu',
			label: 'Profile Menu',
			type: 'relationship',
			relationTo: 'menus',
		},
		{
			name: 'docsMenu',
			label: 'Docs Menu',
			type: 'relationship',
			relationTo: 'menus',
		},
		{
			name: 'appMenu',
			label: 'App Menu',
			type: 'relationship',
			relationTo: 'menus',
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
