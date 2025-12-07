import { CollectionConfig } from 'payload'

import { adminAndEditor } from '@/payload/access'
import {
	revalidateCache,
	revalidateCacheAfterDelete,
} from '@/payload/content-model/shared/hooks/revalidate-cache'

import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { ContentItemsIconOptions } from '@/payload/content-model/shared/fields/content-items-icons'

import { breakpoints } from '@/payload/utils/breakpoints'
import { generatePreviewPath } from '@/payload/utils/generate-preview-path'
import {
	BoldFeature,
	UnorderedListFeature,
	OrderedListFeature,
	UnderlineFeature,
	HeadingFeature,
	lexicalEditor,
	ParagraphFeature,
	LinkFeature,
	ItalicFeature,
	BlockquoteFeature,
	BlocksFeature,
	FixedToolbarFeature,
	InlineToolbarFeature,
	ChecklistFeature,
	UploadFeature,
} from '@payloadcms/richtext-lexical'
import { VideoBlock } from '@/payload/blocks/video-block'
import { CodeBlock } from '@/payload/blocks/code-block'

export const Docs: CollectionConfig = {
	slug: 'docs',
	folders: true,
	admin: {
		group: 'Content',
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
			name: 'icon',
			type: 'select',
			required: true,
			options: ContentItemsIconOptions,
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
							name: 'copy',
							type: 'richText',
							localized: true,
							editor: lexicalEditor({
								features({ rootFeatures }) {
									return [
										...rootFeatures,
										InlineToolbarFeature(),
										FixedToolbarFeature(),
										HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6'] }),
										ParagraphFeature(),
										BoldFeature(),
										ChecklistFeature(),
										UnderlineFeature(),
										OrderedListFeature(),
										UnorderedListFeature(),
										LinkFeature(),
										ItalicFeature(),
										BlockquoteFeature(),
										UploadFeature({
											collections: {
												media: {
													fields: [
														{
															name: 'caption',
															type: 'text',
															label: 'Caption',
														},
														{
															name: 'alt',
															type: 'text',
															label: 'Alt Text',
														},
													],
												},
											},
											maxDepth: 3,
										}),
										BlocksFeature({
											blocks: [VideoBlock, CodeBlock],
										}),
									]
								},
							}),
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
					({ siblingData, value }) => {
						if (siblingData?._status === 'published' && !value) {
							return new Date()
						}
						return value
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
					({ req, value }) => {
						// If there's no author set and we have a user
						if (!value && req.user) {
							console.log('value', value)
							console.log('req', req.user)
							return req.user.id
						}
						return value
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
