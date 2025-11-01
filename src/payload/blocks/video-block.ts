import { Block } from 'payload'

export const VideoBlock: Block = {
	slug: 'video',
	imageURL: '/images/icons/icon-quote.svg', // optional
	imageAltText: 'Video Block Icon',
	interfaceName: 'VideoBlock', // optional
	fields: [
		// required
		{
			name: 'videoUrl',
			type: 'text',
			required: true,
			localized: true,
		},
	],
}
