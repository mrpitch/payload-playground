import { Block } from 'payload'

export const VideoBlock: Block = {
	slug: 'video',
	imageURL: '/images/icons/icon-video.svg', // optional
	imageAltText: 'Video Block Icon',
	interfaceName: 'VideoBlock', // optional
	fields: [
		{
			name: 'type',
			type: 'select',
			options: ['youtube', 'self-hosted'],
			defaultValue: 'youtube',
		},
		{
			name: 'title',
			type: 'text',
			required: true,
			localized: true,
		},
		{
			type: 'row',
			fields: [
				{
					name: 'videoId',
					type: 'text',
					required: true,
					admin: {
						width: '50%',
					},
				},
				{
					name: 'startAt',
					type: 'number',
					label: 'Start At',
					defaultValue: 0,
					admin: {
						width: '50%',
					},
				},
			],
		},
	],
}
