import { Block } from 'payload'

export const EmailImageTextBlock: Block = {
	slug: 'email-image-text',
	imageURL: '/images/icons/icon-image-text.svg', // optional
	imageAltText: 'Image Text Block Icon',
	interfaceName: 'EmailImageTextBlock', // optional
	fields: [
		{
			name: 'type',
			label: 'Type',
			type: 'select',
			options: ['image-top', 'image-left', 'image-right'],
			defaultValue: 'image-top',
		},
		{
			name: 'tagline',
			type: 'text',
			localized: true,
		},
		{
			name: 'headline',
			type: 'text',
			required: true,
			localized: true,
		},
		{
			name: 'copy',
			type: 'text',
			localized: true,
		},
		{
			name: 'ctaText',
			type: 'text',
			localized: true,
		},
		{
			name: 'ctaLink',
			type: 'text',
			localized: true,
		},
		{
			name: 'image',
			type: 'upload',
			relationTo: 'media',
		},
	],
}
