import { Block } from 'payload'

export const DocsTeaserBlock: Block = {
	slug: 'docs-teaser',
	imageURL: '/images/icons/icon-docs-teaser.svg', // optional
	imageAltText: 'Docs Teaser Block Icon',
	interfaceName: 'DocsTeaserBlock', // optional
	fields: [
		{
			name: 'headline',
			type: 'text',
			required: true,
			localized: true,
		},
		{
			name: 'subline',
			type: 'text',
			localized: true,
		},
		{
			name: 'docs',
			type: 'relationship',
			relationTo: 'docs',
			hasMany: true,
			minRows: 1,
			maxRows: 9,
		},
	],
}
