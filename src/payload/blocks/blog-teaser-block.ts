import { Block } from 'payload'

export const BlogTeaserBlock: Block = {
	slug: 'blog-teaser',
	imageURL: '/images/icons/icon-blog-teaser.svg', // optional
	imageAltText: 'Blog Teaser Block Icon',
	interfaceName: 'BlogTeaserBlock', // optional
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
			name: 'posts',
			type: 'relationship',
			relationTo: 'posts',
			hasMany: true,
			minRows: 1,
			maxRows: 9,
		},
		{
			name: 'readMoreText',
			type: 'text',
			localized: true,
		},
	],
}
