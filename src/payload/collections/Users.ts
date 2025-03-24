import type { CollectionConfig } from 'payload'
import type { User } from '@payload-types'

import { admin } from '@/payload/access/admin'
import { adminAndEditor } from '@/payload/access/adminAndEditor'
import { anyone } from '@/payload/access/anyone'
import { checkRole } from '@/payload/hooks/checkRole'
import { protectRoles } from '@/payload/hooks/protectRoles'
import { tokenExpiration } from '@/lib/utils/constants'

import { render } from '@react-email/render'

import { EmailPasswordReset } from '@/payload/emails/password-reset'
import { EmailVerifyAccount } from '@/payload/emails/verify-account'
import { getEmailSubject, getEmailContents } from '@/payload/utils/renderEmail'

export const Users: CollectionConfig = {
	slug: 'users',
	auth: {
		tokenExpiration: tokenExpiration.jwt,
		cookies: {
			sameSite: 'None',
			secure: true,
			domain: process.env.COOKIE_DOMAIN,
		},
		verify: {
			generateEmailHTML: async (args?: { token?: string; user?: User }) => {
				if (!args?.token || !args?.user) return ''
				const { token, user } = args
				const url = `${process.env.NEXT_PUBLIC_URL}/change-password?token=${token}`
				const {
					verifyAccount: {
						Template: { previewText, heading, salutation, copy, buttonLabel },
					},
					footer: { content: footer },
				} = await getEmailContents()

				return await render(
					await EmailVerifyAccount({
						url: url,
						email: user.email,
						username: user.firstName,
						previewText,
						heading,
						salutation,
						copy,
						buttonLabel,
						footer,
					}),
				)
			},
		},
		forgotPassword: {
			expiration: tokenExpiration.reset,
			generateEmailSubject: async (args?: { token?: string; user?: User }) => {
				if (!args?.token || !args?.user) return ''
				const { user } = args
				const {
					passwordReset: {
						Template: { subject },
					},
				} = await getEmailContents()
				return getEmailSubject({ subject, username: user.firstName })
			},
			generateEmailHTML: async (args?: { token?: string; user?: User }) => {
				if (!args?.token || !args?.user) return ''
				const { token, user } = args
				const url = `${process.env.NEXT_PUBLIC_URL}/change-password?token=${token}`
				const {
					passwordReset: {
						Template: { previewText, heading, salutation, copy, buttonLabel },
					},
					footer: { content: footer },
				} = await getEmailContents()

				return await render(
					await EmailPasswordReset({
						url: url,
						email: user.email,
						username: user.firstName,
						previewText,
						heading,
						salutation,
						copy,
						buttonLabel,
						footer,
					}),
				)
			},
		},
	},
	admin: {
		useAsTitle: 'email',
	},
	access: {
		read: adminAndEditor,
		create: anyone,
		update: adminAndEditor,
		delete: admin,
		admin: ({ req: { user } }) => checkRole(['admin', 'editor'], user as User),
	},
	fields: [
		{
			name: 'firstName',
			type: 'text',
			required: true,
		},
		{
			name: 'lastName',
			type: 'text',
			required: true,
		},
		{
			name: 'avatar',
			type: 'upload',
			relationTo: 'media',
			filterOptions: {
				mimeType: { contains: 'image' },
			},
			displayPreview: true,
		},
		{
			name: 'roles',
			type: 'select',
			hasMany: true,
			saveToJWT: true,
			hooks: {
				beforeChange: [protectRoles],
			},
			options: [
				{
					label: 'Admin',
					value: 'admin',
				},
				{
					label: 'Editor',
					value: 'editor',
				},
				{
					label: 'User',
					value: 'user',
				},
			],
		},
	],
}
