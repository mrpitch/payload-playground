import type { CollectionConfig } from 'payload'
import type { User } from '@payload-types'
import type { PayloadRequest } from 'payload'
import type { ReactElement } from 'react'
import type { TEmailVerifyAccountProps } from '@/payload/email-templates/verify-account'
import type { TEmailPasswordResetProps } from '@/payload/email-templates/password-reset'

import { admin } from '@/payload/access/admin'
import { adminAndEditor } from '@/payload/access/admin-and-editor'
import { anyone } from '@/payload/access/anyone'
import { checkRole } from '@/payload/hooks/check-role'
import { protectRoles } from '@/payload/hooks/protect-roles'
import { tokenExpiration } from '@/lib/utils/constants'

import { EmailPasswordReset } from '@/payload/email-templates/password-reset'
import { EmailVerifyAccount } from '@/payload/email-templates/verify-account'
import { getEmailSubject, renderEMail } from '@/payload/utils/render-email'

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
			generateEmailHTML: async (args?: { req?: PayloadRequest; token?: string; user?: User }) => {
				if (!args?.token || !args?.user || !args?.req) return ''
				return renderEMail({
					...args,
					EmailTemplate: EmailVerifyAccount as (
						props: Partial<TEmailVerifyAccountProps>,
					) => ReactElement,
					user: args.user,
					type: 'verifyEmail',
				})
			},
		},
		forgotPassword: {
			expiration: tokenExpiration.reset,
			generateEmailSubject: async (args?: {
				token?: string
				user?: User
				req?: PayloadRequest
			}) => {
				if (!args?.token || !args?.user || !args?.req) return ''
				return getEmailSubject(args)
			},
			generateEmailHTML: async (args?: { req?: PayloadRequest; token?: string; user?: User }) => {
				if (!args?.token || !args?.user || !args?.req) return ''
				return renderEMail({
					...args,
					EmailTemplate: EmailPasswordReset as (
						props: Partial<TEmailPasswordResetProps>,
					) => ReactElement,
					user: args.user,
					type: 'passwordReset',
				})
			},
		},
	},
	admin: {
		group: 'Admin',
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
