import path from 'path'
import { en } from 'payload/i18n/en'
import {
  AlignFeature,
  BlockQuoteFeature,
  BlocksFeature,
  BoldFeature,
  CheckListFeature,
  HeadingFeature,
  IndentFeature,
  InlineCodeFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  RelationshipFeature,
  UnorderedListFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
//import { slateEditor } from '@payloadcms/richtext-slate'
import { postgresAdapter } from '@payloadcms/db-postgres'
//import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload/config'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import Pages from './src/app/(payload)/collections/Pages'
import Users from '@/app/(payload)/collections/Users'
import Media from '@/app/(payload)/collections/Media'
import Categories from '@/app/(payload)/collections/Categories'
import Newsletter from '@/app/(payload)/collections/Newsletter'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  //editor: slateEditor({}),
  editor: lexicalEditor(),
  collections: [Categories, Pages, Users, Media, Newsletter],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URI || '',
    },
  }),
  // db: mongooseAdapter({
  //   url: process.env.MONGODB_URI || '',
  // }),

  /**
   * Payload can now accept specific translations from 'payload/i18n/en'
   * This is completely optional and will default to English if not provided
   */
  i18n: {
    supportedLanguages: { en },
  },

  // admin: {
  //   autoLogin: {
  //     email: 'dev@payloadcms.com',
  //     password: 'test',
  //     prefillOnly: true,
  //   },
  // },
  // async onInit(payload) {
  //   const existingUsers = await payload.find({
  //     collection: 'users',
  //     limit: 1,
  //   })

  //   if (existingUsers.docs.length === 0) {
  //     await payload.create({
  //       collection: 'users',
  //       data: {
  //         email: 'dev@payloadcms.com',
  //         password: 'test',
  //       },
  //     })
  //   }
  // },
  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.

  // This is temporary - we may make an adapter pattern
  // for this before reaching 3.0 stable
  sharp,
})
