import type { CollectionConfig } from 'payload'
import type { User } from '@payload-types'

import { admin } from '@/payload/access/admin'
import { adminAndEditor } from '@/payload/access/adminAndEditor'
import { anyone } from '@/payload/access/anyone'
import { checkRole } from '@/payload/hooks/checkRole'
import { protectRoles } from '@/payload/hooks/protectRoles'

export const Users: CollectionConfig = {
	slug: 'users',
	auth: {
		tokenExpiration: 28800, // 8 hours
		cookies: {
			sameSite: 'None',
			secure: true,
			domain: process.env.COOKIE_DOMAIN,
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
