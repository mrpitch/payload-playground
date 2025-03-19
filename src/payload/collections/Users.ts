import type { CollectionConfig } from 'payload'
import type { User } from '@payload-types'

import { admin } from '@/payload/access/admin'
import { adminAndEditor } from '@/payload/access/adminAndEditor'
import { anyone } from '@/payload/access/anyone'
import { checkRole } from '@/payload/hooks/checkRole'
import { protectRoles } from '@/payload/hooks/protectRoles'
import { tokenExpiration } from '@/lib/utils/constants'
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
			generateEmailHTML: ({ token, user }: { token?: string; user?: User }) => {
				// Use the token provided to allow your user to verify their account
				const url = `http://localhost:3000/verify-email?token=${token}`

				return `Hey ${user?.email}, verify your email by clicking here: ${url}`
			},
		},
		forgotPassword: {
			expiration: tokenExpiration.reset,
			generateEmailHTML: (args?: { token?: string; user?: User }) => {
				if (!args?.token || !args?.user) return ''
				const { token, user } = args
				const url = `http://localhost:3000/change-password?email=${user.email}&token=${token}`

				return `Hey ${user.email}, reset your password by clicking here: ${url}`
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
