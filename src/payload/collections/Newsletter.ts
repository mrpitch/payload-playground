import { CollectionConfig } from 'payload'
import { QuoteBlock } from '@/payload/blocks/quote-block'
import { CopyBlock } from '../blocks/copy-block'
import { BlogTeaserBlock } from '../blocks/blog-teaser-block'
import { ImageTextBlock } from '../blocks/image-text-block'

export const Newsletter: CollectionConfig = {
	slug: 'newsletter',
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'slug', 'publishedAt', 'status'],
	},
	versions: {
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
											blocks: [CopyBlock, ImageTextBlock, QuoteBlock, BlogTeaserBlock],
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
