import { CollectionConfig } from 'payload'

import { admin, adminAndEditor } from '@/payload/access'
import { revalidateCache, revalidateCacheAfterDelete } from '@/payload/hooks/revalidateCache'

import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { QuoteBlock } from '@/payload/blocks/quote-block'

export const Pages: CollectionConfig = {
	slug: 'pages',
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'slug', 'publishedAt', 'status'],
	},
	versions: {
		drafts: {
			autosave: {
				interval: 100, // We set this interval for optimal live preview
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
							name: 'layout', // required
							type: 'blocks', // required
							minRows: 1,
							maxRows: 20,
							blocks: [
								// required
								QuoteBlock,
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
