import { CollectionConfig } from 'payload'
import { QuoteBlock } from '@/payload/blocks/quote-block'

export const Newsletter: CollectionConfig = {
	slug: 'newsletter',
	admin: {
		useAsTitle: 'title',
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
							],
						},

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
				{
					name: 'preview',
					label: 'Preview',
					fields: [
						{
							type: 'ui',
							name: 'my custom component',
							admin: {
								components: {
									Field: './components/newsletter-preview',
								},
							},
						},
					],
				},
			],
		},
	],
}
