import { Block } from 'payload'

export const StageBlock: Block = {
	slug: 'stage',
	imageURL: '/images/icons/icon-stage.svg', // optional
	imageAltText: 'Stage Block Icon',
	interfaceName: 'StageBlock', // optional
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
			name: 'subline',
			type: 'text',
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
			name: 'backgroundImage',
			type: 'upload',
			// admin: {
			// 	description: 'Image must be at least 1920x1080',
			// },
			// validate: (value: any) => {
			// 	if (value.width / value.height !== 16 / 9) {
			// 		return 'Image must be 16:9'
			// 	}
			// 	return true
			// },
			// filterOptions: {
			// 	width: { greater_than_equal: 1920 },
			// 	height: { greater_than_equal: 1080 },
			// 	mimeType: { contains: 'image' },
			// },
			relationTo: 'media',
		},
	],
}
