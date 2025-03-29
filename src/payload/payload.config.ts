// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor, InlineToolbarFeature } from '@payloadcms/richtext-lexical'
import { resendAdapter } from '@payloadcms/email-resend'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { plugins } from '@/payload/plugins'
import { seed } from './utils/seed'

import { AppShell } from '@/payload/globals/AppShell'
import { EmailTemplates } from '@/payload/globals/EmailTemplates'
import { Users } from '@/payload/collections/Users'
import { Media } from '@/payload/collections/Media'
import { Pages } from '@/payload/collections/Pages'
import { Posts } from '@/payload/collections/Posts'
import { Categories } from '@/payload/collections/Categories'
import { Newsletter } from '@/payload/collections/Newsletter'

import { i18n, localization } from '@/payload/i18n/localization'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
	admin: {
		components: {
			afterNavLinks: ['./components/nav-links#LinkToCustomView'],
			graphics: {
				Icon: './components/Icon.tsx',
				Logo: './components/logo.tsx',
			},
			views: {
				customView: {
					path: '/my-custom-view',
					Component: './components/views/my-custom-view.tsx',
					meta: {
						title: 'My Custom View',
						description: 'The best Custom View in the world',
					},
				},
			},
		},
		avatar: {
			Component: './components/avatar.tsx',
		},
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	globals: [AppShell, EmailTemplates],
	collections: [Pages, Posts, Categories, Newsletter, Users, Media],
	editor: lexicalEditor({
		features({ rootFeatures }) {
			return [...rootFeatures, InlineToolbarFeature()]
		},
	}),
	secret: process.env.PAYLOAD_SECRET || '',
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts'),
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || '',
			ssl:
				process.env.NODE_ENV === 'production'
					? {
							rejectUnauthorized: false,
						}
					: false,
			max: 20, // Maximum number of connections in the pool
			idleTimeoutMillis: 30000, // How long a connection can be idle before being closed
			connectionTimeoutMillis: 2000, // How long to wait for a connection
		},
	}),
	email: resendAdapter({
		defaultFromAddress: process.env.RESEND_FROM_EMAIL || '',
		defaultFromName: process.env.RESEND_FROM_NAME || '',
		apiKey: process.env.RESEND_API_KEY || '',
	}),
	i18n,
	localization,
	sharp,
	plugins: [...plugins],
	onInit: async (payload) => {
		if (process.env.PAYLOAD_SEED === 'true') {
			await seed(payload)
		}
	},
})
