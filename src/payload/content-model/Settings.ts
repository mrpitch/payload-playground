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
			type: 'tabs',
			tabs: [
				{
					name: 'settings',
					label: 'Settings',
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
					],
				},
				{
					name: 'mainNav',
					label: 'Main Navigation',
					fields: [],
				},
				{
					name: 'footerNav',
					label: 'Footer Navigation',
					fields: [],
				},
				{
					name: 'profielNav',
					label: 'Profile Navigation',
					fields: [],
				},
				{
					name: 'appNav',
					label: 'App Navigation',
					fields: [],
				},
				{
					name: 'docsNav',
					label: 'Docs Navigation',
					fields: [],
				},
			],
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
