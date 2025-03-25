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
		},
	],
}
