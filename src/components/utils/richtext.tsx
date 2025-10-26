import {
	DefaultNodeTypes,
	SerializedHeadingNode,
	SerializedLinkNode,
	type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
	type JSXConvertersFunction,
	LinkJSXConverter,
	RichText as ConvertRichText,
	JSXConverters,
} from '@payloadcms/richtext-lexical/react'

import { generateSlug } from '@/lib/utils/generateSlug'
import { Typography } from '@/components/ui/custom/typography'

export const HeadingJSXConverter: JSXConverters<SerializedHeadingNode> = {
	heading: ({ node, nodesToJSX }) => {
		const children = nodesToJSX({
			nodes: node.children,
		})

		return (
			<Typography
				as={node.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'}
				size="2xl"
				id={generateSlug(children.toString())}
			>
				{children}
			</Typography>
		)
	},
}

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
	...HeadingJSXConverter,
})

type Props = {
	data: DefaultTypedEditorState
} & React.HTMLAttributes<HTMLDivElement>

export const RichText = (props: Props) => {
	const { className, ...rest } = props
	return <ConvertRichText converters={jsxConverters} className={className} {...rest} />
}
