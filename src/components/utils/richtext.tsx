import {
	DefaultNodeTypes,
	SerializedLinkNode,
	type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
	type JSXConvertersFunction,
	LinkJSXConverter,
	RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
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

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
	...defaultConverters,
	...LinkJSXConverter({ internalDocToHref }),
})

type Props = {
	data: DefaultTypedEditorState
} & React.HTMLAttributes<HTMLDivElement>

export const RichText = (props: Props) => {
	const { className, ...rest } = props
	return <ConvertRichText converters={jsxConverters} className={className} {...rest} />
}
