import {
	HeadingFeature,
	ItalicFeature,
	BoldFeature,
	LinkFeature,
	UnorderedListFeature,
	OrderedListFeature,
	UnderlineFeature,
	BlockquoteFeature,
} from '@payloadcms/richtext-lexical'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const CopyBlock: Block = {
	slug: 'copy',
	imageURL: '/images/icons/icon-copy.svg', // optional
	imageAltText: 'Copy Block Icon',
	interfaceName: 'CopyBlock', // optional
	fields: [
		// required
		{
			name: 'headline',
			type: 'text',
			required: true,
			localized: true,
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
