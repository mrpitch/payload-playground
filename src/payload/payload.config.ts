import { buildConfig } from 'payload'
import type { Payload } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import {
	FeatureProviderServer,
	lexicalEditor,
	InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'
import { resendAdapter } from '@payloadcms/email-resend'
import path from 'path'

import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { plugins } from '@/payload/plugins'

import { AppSettings } from '@/payload/content-model/AppSettings'
import { EmailTemplates } from '@/payload/content-model/EmailTemplates'
import { Categories } from '@/payload/content-model/Categories'
import { Docs } from '@/payload/content-model/Docs'
import { Users } from '@/payload/content-model/Users'
import { Media } from '@/payload/content-model/Media'
import { Menus } from '@/payload/content-model/Menus'
import { Pages } from '@/payload/content-model/Pages'
import { Posts } from '@/payload/content-model/Posts'
import { Newsletter } from '@/payload/content-model/Newsletter'

import { i18n, localization } from '@/payload/i18n/localization'
import type { CollectionConfig } from 'payload'

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
					Component: './views/my-custom-view.tsx',
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
	globals: [EmailTemplates, AppSettings],
	collections: [Categories, Docs, Pages, Posts, Newsletter, Users, Media, Menus],
	folders: {
		debug: true, // optional
		collectionOverrides: [
			async ({ collection }: { collection: CollectionConfig }) => {
				const folderCollection: CollectionConfig = {
					...collection,
					admin: {
						group: 'Content',
						...collection.admin,
						defaultColumns: ['name', 'order', 'createdAt', 'updatedAt'],
					},
					defaultSort: 'order',
					orderable: true,
					fields: [
						...(collection.fields || []),
						{
							name: 'order',
							type: 'number',
							label: 'Order',
							defaultValue: 0,
							required: false,
						},
					],
				}

				return folderCollection
			},
		], // optional
		fieldName: 'folder', // optional
		slug: 'payload-folders', // optional
	},
	editor: lexicalEditor({
		features({
			rootFeatures,
		}: {
			defaultFeatures: FeatureProviderServer[]
			rootFeatures: FeatureProviderServer[]
		}) {
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
			ssl: false,
			// ssl:
			// 	process.env.NODE_ENV === 'production'
			// 		? {
			// 				rejectUnauthorized: false,
			// 			}
			// 		: false,
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
	onInit: async (payload: Payload) => {
		if (process.env.PAYLOAD_SEED === 'true') {
			//await seed(payload)
		}
	},
})
