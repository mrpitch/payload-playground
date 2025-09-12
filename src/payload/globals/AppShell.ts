import type { GlobalConfig } from 'payload'
import { admin } from '@/payload/access/admin'
import { adminAndEditor } from '@/payload/access/admin-and-editor'

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
				{
					name: 'legalNavigation',
					label: 'Legal Navigation',
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
							maxRows: 5,
						},
					],
				},
				{
					name: 'profileNavigation',
					label: 'Profile Navigation',
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
								{
									name: 'icon',
									type: 'select',
									required: true,
									options: ['layoutDashboard', 'settings', 'folderKanban'],
								},
							],
							minRows: 1,
							maxRows: 5,
						},
					],
				},
				{
					name: 'sideBarNavigation',
					label: 'Sidebar Navigation',
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
								{
									name: 'icon',
									type: 'select',
									required: true,
									options: [
										'layoutDashboard',
										'rocket',
										'dumbbell',
										'tag',
										'image',
										'user',
										'settings',
										'logout',
									],
								},
							],
							minRows: 1,
							maxRows: 5,
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
