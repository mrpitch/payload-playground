import type { GlobalConfig } from 'payload'
import { admin } from '@/payload/access/admin'
import { adminAndEditor } from '@/payload/access/admin-and-editor'

export const EmailTemplates: GlobalConfig = {
	slug: 'e-mail-templates',
	admin: {},
	access: {
		read: adminAndEditor,
		update: admin,
	},
	versions: {
		max: 10,
	},
	fields: [
		{
			type: 'tabs',
			tabs: [
				{
					name: 'verifyEmail',
					label: 'Verify Email',
					fields: [
						{
							type: 'row',
							fields: [
								{
									name: 'Template',
									type: 'group',
									fields: [
										{
											name: 'previewText',
											type: 'text',
											required: true,
											defaultValue: 'preview text',
										},
										{
											name: 'subject',
											type: 'text',
											required: true,
											defaultValue: 'subject',
										},
										{
											name: 'heading',
											type: 'text',
											required: true,
											defaultValue: 'heading',
										},
										{
											name: 'salutation',
											type: 'text',
											required: true,
											defaultValue: 'salutation',
										},
										{
											name: 'copy',
											type: 'text',
											required: true,
											defaultValue: 'copy',
										},
										{
											name: 'buttonLabel',
											type: 'text',
											required: true,
											defaultValue: 'button label',
										},
									],
									admin: {
										width: '50%',
									},
								},
								{
									name: 'Preview',
									type: 'ui',
									admin: {
										components: {
											Field: './components/email-preview#verifyEmail',
										},
										width: '50%',
									},
								},
							],
						},
					],
				},
				{
					name: 'passwordReset',
					label: 'Password Reset',
					fields: [
						{
							type: 'row',
							fields: [
								{
									name: 'Template',
									type: 'group',
									fields: [
										{
											name: 'previewText',
											type: 'text',
											required: true,
											defaultValue: 'preview text',
										},
										{
											name: 'subject',
											type: 'text',
											required: true,
											defaultValue: 'subject',
										},
										{
											name: 'heading',
											type: 'text',
											required: true,
											defaultValue: 'heading',
										},
										{
											name: 'salutation',
											type: 'text',
											required: true,
											defaultValue: 'salutation',
										},
										{
											name: 'copy',
											type: 'text',
											required: true,
											defaultValue: 'copy',
										},
										{
											name: 'buttonLabel',
											type: 'text',
											required: true,
											defaultValue: 'button label',
										},
									],
									admin: {
										width: '50%',
									},
								},
								{
									name: 'Preview',
									type: 'ui',
									admin: {
										components: {
											Field: './components/email-preview#passwordReset',
										},
										width: '50%',
									},
								},
							],
						},
					],
				},
				{
					name: 'footer',
					label: 'Footer',
					fields: [
						{
							name: 'content',
							type: 'text',
							required: true,
							defaultValue: 'footer',
						},
					],
				},
			],
		},
	],
}
