import { CollectionConfig } from 'payload'

import { admin, adminAndEditor } from '@/payload/access'
import { revalidateCache, revalidateCacheAfterDelete } from '@/payload/hooks/revalidate-cache'
import { generatePreviewPath } from '@/payload/utils/generate-preview-path'

import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { CopyBlock } from '@/payload/blocks/copy-block'
import { ImageTextBlock } from '@/payload/blocks/image-text-block'
import { QuoteBlock } from '@/payload/blocks/quote-block'
import { StageBlock } from '@/payload/blocks/stage-block'
import { BlogTeaserBlock } from '@/payload/blocks/blog-teaser-block'

import { breakpoints } from '@/payload/utils/breakpoints'

export const Pages: CollectionConfig = {
	slug: 'pages',
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'slug', 'publishedAt', 'status'],
		livePreview: {
			url: ({ data }) => {
				return generatePreviewPath(``, data.slug)
			},
			breakpoints: breakpoints,
		},
		preview: (data) => generatePreviewPath(``, data.slug as string),
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
		create: admin,
		read: adminAndEditor,
		update: adminAndEditor,
		delete: admin,
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
			type: 'tabs',
			tabs: [
				{
					name: 'meta',
					label: 'Meta',
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
							hasGenerateFn: true,
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
							name: 'showPageTitle',
							type: 'checkbox',
							label: 'Show Page Title',
							defaultValue: false,
						},
						{
							name: 'layout', // required
							type: 'blocks', // required
							minRows: 1,
							maxRows: 20,
							blocks: [CopyBlock, ImageTextBlock, QuoteBlock, StageBlock, BlogTeaserBlock],
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
						if (siblingData._status === 'published' && !value) {
							return new Date()
						}
						return value
					},
				],
			},
		},
	],
	hooks: {
		afterChange: [revalidateCache],
		afterDelete: [revalidateCacheAfterDelete],
	},
}
