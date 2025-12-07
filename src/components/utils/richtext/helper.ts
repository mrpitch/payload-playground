import { SerializedLinkNode } from '@payloadcms/richtext-lexical'

export const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
	const { relationTo, value } = linkNode.fields.doc!
	if (typeof value !== 'object') {
		throw new Error('Expected value to be an object')
	}
	const slug = value.slug

	switch (relationTo) {
		case 'posts':
			return `/posts/${slug}`
		case 'categories':
			return `/category/${slug}`
		case 'pages':
			return `/${slug}`
		default:
			return `/${relationTo}/${slug}`
	}
}
