import { Block } from 'payload'

export const ImageTextBlock: Block = {
	slug: 'image-text',
	imageURL: '/images/icons/icon-image-text.svg', // optional
	imageAltText: 'Image Text Block Icon',
	interfaceName: 'ImageTextBlock', // optional
	fields: [
		{
			name: 'imageLeftOnOdd',
			label: 'Start Image Left',
			type: 'checkbox',
			defaultValue: true,
		},
		{
			name: 'items',
			type: 'array',
			fields: [
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
					name: 'Image',
					type: 'upload',
					relationTo: 'media',
				},
			],
		},
	],
}
