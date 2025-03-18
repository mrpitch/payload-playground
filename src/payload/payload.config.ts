// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { resendAdapter } from '@payloadcms/email-resend'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { plugins } from '@/payload/plugins'
import { seed } from './seed'

import { AppShell } from '@/payload/globals/AppShell'
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
			graphics: {
				Icon: './components/Icon.tsx',
				Logo: './components/logo.tsx',
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
	globals: [AppShell],
	collections: [Pages, Posts, Categories, Newsletter, Users, Media],
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET || '',
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts'),
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || '',
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
