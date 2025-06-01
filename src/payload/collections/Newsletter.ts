import { CollectionConfig } from 'payload'
import { EmailImageTextBlock } from '@/payload/blocks/email-image-text-block'
import { EmailGalleryBlock } from '@/payload/blocks/email-gallery'

export const Newsletter: CollectionConfig = {
	slug: 'newsletter',
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'slug', 'publishedAt', 'status'],
	},
	versions: {
		drafts: {
			autosave: {
				interval: 1000, // We set this interval for optimal live preview
				showSaveDraftButton: true,
			},
		},
		maxPerDoc: 10,
	},
	fields: [
		{
			name: 'title',
			label: 'Title',
			type: 'text',
			required: true,
		},
		{
			type: 'tabs',
			tabs: [
				{
					name: 'content',
					label: 'Content',
					fields: [
						{
							type: 'row',
							fields: [
								{
									name: 'Template',
									type: 'group',
									fields: [
										{
											name: 'slug',
											label: 'Slug',
											type: 'text',
											required: true,
										},
										{
											name: 'subject',
											label: 'Subject',
											type: 'text',
											required: true,
										},
										{
											name: 'layout', // required
											type: 'blocks', // required
											minRows: 1,
											maxRows: 20,
											blocks: [EmailImageTextBlock, EmailGalleryBlock],
										},
									],
									admin: {
										width: '50%',
									},
								},
								{
									name: 'Preview',
									type: 'ui',
									admin: {
										components: {
											Field: './components/email-preview#newsletter',
										},
										width: '50%',
									},
								},
							],
						},
					],
				},
			],
		},
	],
}
