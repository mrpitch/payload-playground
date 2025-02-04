import type { GlobalConfig } from 'payload'
import { admin } from '@/payload/access/admin'
import { adminAndEditor } from '@/payload/access/adminAndEditor'

export const AppShell: GlobalConfig = {
	slug: 'app-shell',
	admin: {},
	access: {
		read: adminAndEditor,
		update: admin,
	},
	versions: {
		drafts: {
			autosave: {
				interval: 100, // We set this interval for optimal live preview
			},
			schedulePublish: true,
		},
	},
	fields: [
		{
			type: 'tabs',
			tabs: [
				{
					name: 'settings',
					label: 'Settings',
					fields: [],
				},
				{
					name: 'mainNavigation',
					label: 'Main Navigation',
					fields: [
						{
							name: 'navItems',
							type: 'array',
							fields: [
								{
									name: 'label',
									type: 'text',
									required: true,
								},
								{
									name: 'href',
									type: 'text',
									required: true,
								},
							],
							minRows: 1,
							maxRows: 4,
						},
					],
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
