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
			relationTo: 'media',
		},
	],
}
