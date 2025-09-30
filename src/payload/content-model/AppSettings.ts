import type { GlobalConfig } from 'payload'
import { admin } from '@/payload/access/admin'
import { adminAndEditor } from '@/payload/access/admin-and-editor'

export const AppSettings: GlobalConfig = {
	slug: 'app-settings',
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
					name: 'menus',
					label: 'Menus',
					fields: [
						{
							name: 'mainMenu',
							label: 'Main Menu',
							type: 'relationship',
							relationTo: 'menus',
							filterOptions: {
								menuType: { equals: 'main' },
							},
						},
						{
							name: 'footerMenu',
							label: 'Footer Menu',
							type: 'relationship',
							relationTo: 'menus',
							filterOptions: {
								menuType: { equals: 'footer' },
							},
						},
						{
							name: 'profileMenu',
							label: 'User Profile Menu',
							type: 'relationship',
							relationTo: 'menus',
							filterOptions: {
								menuType: { equals: 'profile' },
							},
						},
						{
							name: 'dashboardMenu',
							label: 'Dashboard Sidebar Menu',
							type: 'relationship',
							relationTo: 'menus',
							filterOptions: {
								menuType: { equals: 'dashboard' },
							},
						},
						{
							name: 'docsMenu',
							label: 'Docs Sidebar Menu',
							type: 'relationship',
							hasMany: true,
							relationTo: 'menus',
							filterOptions: {
								menuType: { equals: 'docs' },
							},
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
