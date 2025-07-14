import { CollectionConfig } from 'payload'
import type { FieldHookArgs } from 'payload'

import { adminAndEditor } from '@/payload/access'
import { revalidateCache, revalidateCacheAfterDelete } from '@/payload/hooks/revalidate-cache'

import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { QuoteBlock } from '@/payload/blocks/quote-block'
import { CopyBlock } from '@/payload/blocks/copy-block'

import { breakpoints } from '@/payload/utils/breakpoints'
import { generatePreviewPath } from '@/payload/utils/generate-preview-path'

export const Docs: CollectionConfig = {
	slug: 'docs',
	folders: true,
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'folder', 'slug', 'publishedAt', 'status'],
		livePreview: {
			url: ({ data }) => {
				return generatePreviewPath(`docs`, data.slug)
			},
			breakpoints: breakpoints,
		},
		preview: (data) => generatePreviewPath(`docs`, data.slug as string),
	},
	versions: {
		drafts: {
			autosave: {
				interval: 1000, // We set this interval for optimal live preview
			},
			schedulePublish: true,
		},
		maxPerDoc: 10,
	},
	access: {
		create: adminAndEditor,
		read: adminAndEditor,
		update: adminAndEditor,
		delete: adminAndEditor,
	},
	fields: [
		{
			name: 'title',
			label: 'Title',
			type: 'text',
			required: true,
			localized: true,
		},
		{
			name: 'slug',
			type: 'text',
			label: 'Slug',
			required: true,
			localized: true,
		},
		{
			name: 'excerpt',
			type: 'textarea',
			label: 'Excerpt',
			localized: true,
		},
		{
			name: 'thumbnail',
			type: 'upload',
			label: 'Thumbnail',
			relationTo: 'media',
		},
		{
			type: 'tabs',
			tabs: [
				{
					name: 'meta',
					label: 'SEO',
					fields: [
						OverviewField({
							titlePath: 'meta.title',
							descriptionPath: 'meta.description',
							imagePath: 'meta.image',
						}),
						MetaTitleField({
							hasGenerateFn: true,
						}),
						MetaImageField({
							relationTo: 'media',
						}),

						MetaDescriptionField({}),
						PreviewField({
							// if the `generateUrl` function is configured
							hasGenerateFn: true,

							// field paths to match the target field for data
							titlePath: 'meta.title',
							descriptionPath: 'meta.description',
						}),
					],
				},
				{
					label: 'Content',
					description: 'Page Content',
					fields: [
						{
							name: 'layout', // required
							type: 'blocks', // required
							minRows: 1,
							maxRows: 20,
							blocks: [
								// required
								QuoteBlock,
								CopyBlock,
							],
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
					(args: FieldHookArgs<any, any, any>) => {
						if (args.siblingData?._status === 'published' && !args.value) {
							return new Date()
						}
						return args.value
					},
				],
			},
		},
		{
			name: 'author',
			type: 'relationship',
			relationTo: 'users',
			required: true,
			admin: {
				position: 'sidebar',
			},
			hooks: {
				beforeChange: [
					(args: FieldHookArgs<any, any, any>) => {
						// If there's no author set and we have a user
						if (!args.value && args.req.user) {
							console.log('value', args.value)
							console.log('req', args.req.user)
							return args.req.user.id
						}
						return args.value
					},
				],
			},
		},
		{
			name: 'categories',
			type: 'relationship',
			admin: {
				position: 'sidebar',
			},
			hasMany: true,
			relationTo: 'categories',
		},
	],
	hooks: {
		afterChange: [revalidateCache],
		afterDelete: [revalidateCacheAfterDelete],
	},
}
