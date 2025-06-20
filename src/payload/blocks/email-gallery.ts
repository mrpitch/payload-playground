import { Block } from 'payload'

export const EmailGalleryBlock: Block = {
	slug: 'email-gallery',
	imageURL: '/images/icons/icon-gallery.svg', // optional
	imageAltText: 'Gallery Block Icon',
	interfaceName: 'EmailGalleryBlock', // optional
	fields: [
		{
			name: 'type',
			label: 'Type',
			type: 'select',
			options: ['4grid', '3grid-horizontal', '3grid-vertical'],
			defaultValue: '4grid',
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
			name: 'gallery',
			type: 'array',
			fields: [
				{
					name: 'image',
					type: 'upload',
					relationTo: 'media',
				},
			],
		},
	],
}
