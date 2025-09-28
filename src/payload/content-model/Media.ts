import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
	slug: 'media',
	folders: true,
	admin: {
		group: 'Content',
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'alt',
			type: 'text',
			required: true,
		},
	],
	upload: {
		adminThumbnail: 'thumbnail',
		imageSizes: [
			{
				name: 'thumbnail',
				width: 640,
				height: 360,
				fit: 'cover',
				position: 'center',
				formatOptions: {
					format: 'webp',
					options: { quality: 80 },
				},
				generateImageName: ({
					originalName,
					sizeName,
					extension,
				}: {
					originalName: string
					sizeName: string
					extension: string
				}) => `${originalName}-${sizeName}.${extension}`,
				admin: {
					disableListColumn: false,
					disableListFilter: false,
				},
			},
			{
				name: 'small',
				width: 1080,
				height: 608,
				fit: 'cover',
				position: 'center',
				withoutEnlargement: false,
				formatOptions: {
					format: 'webp',
					options: { quality: 90 },
				},
			},
			{
				name: 'medium',
				width: 1600,
				height: 900,
				fit: 'cover',
				position: 'center',
				withoutEnlargement: true,
				formatOptions: {
					format: 'webp',
					options: { quality: 90 },
				},
			},
			{
				name: 'hero',
				width: 1920,
				height: 1080,
				fit: 'cover',
				position: 'center',
				withoutEnlargement: true,
				formatOptions: {
					format: 'webp',
					options: { quality: 90 },
				},
			},
		],
	},
}
