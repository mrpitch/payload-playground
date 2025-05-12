import {
	lexicalEditor,
	HeadingFeature,
	ItalicFeature,
	BoldFeature,
	LinkFeature,
	UnorderedListFeature,
	OrderedListFeature,
	UnderlineFeature,
	BlockquoteFeature,
	ParagraphFeature,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const CopyBlock: Block = {
	slug: 'copy',
	imageURL: '/images/icons/icon-copy.svg', // optional
	imageAltText: 'Copy Block Icon',
	interfaceName: 'CopyBlock', // optional
	fields: [
		// required
		{
			type: 'row',
			fields: [
				{
					name: 'headline',
					label: 'Headline',
					type: 'text',
					required: true,
					localized: true,
					admin: {
						width: '80%',
					},
				},
				{
					name: 'showHeadline',
					label: 'Show Headline',
					type: 'checkbox',
					required: true,
					defaultValue: false,
					admin: {
						width: '20%',
					},
				},
			],
		},
		{
			name: 'copy',
			type: 'richText',
			localized: true,
			editor: lexicalEditor({
				features({ rootFeatures }) {
					return [
						...rootFeatures,
						HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6'] }),
						ParagraphFeature(),
						BoldFeature(),
						UnderlineFeature(),
						OrderedListFeature(),
						UnorderedListFeature(),
						LinkFeature(),
						ItalicFeature(),
						BlockquoteFeature(),
					]
				},
			}),
		},
	],
}
