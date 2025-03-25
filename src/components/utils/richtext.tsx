import {
	DefaultNodeTypes,
	SerializedLinkNode,
	type DefaultTypedEditorState,
	SerializedTextNode,
	SerializedHeadingNode,
	SerializedParagraphNode,
	SerializedListNode,
	SerializedListItemNode,
} from '@payloadcms/richtext-lexical'
import {
	type JSXConvertersFunction,
	LinkJSXConverter,
	RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { Typography, typographyVariants } from '@/components/ui/custom/typography'

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

const heading = ({ node }: { node: SerializedHeadingNode }) => {
	const { children, tag } = node
	const as =
		tag === 'h1'
			? 'h1'
			: tag === 'h2'
				? 'h2'
				: tag === 'h3'
					? 'h3'
					: tag === 'h4'
						? 'h4'
						: tag === 'h5'
							? 'h5'
							: tag === 'h6'
								? 'h6'
								: 'p'
	const className = typographyVariants({ as })
	return (
		<Typography as={as} className={className}>
			{(children?.[0] as SerializedTextNode)?.text}
		</Typography>
	)
}

const paragraph = ({ node }: { node: SerializedParagraphNode }) => {
	const { children } = node
	const className = typographyVariants({ as: 'p' })
	return (
		<Typography as="p" className={className}>
			{(children?.[0] as SerializedTextNode)?.text}
		</Typography>
	)
}
const list = ({ node }: { node: SerializedListNode }) => {
	const { children, tag } = node
	if (tag === 'ul') {
		return (
			<ul className="ml-4 list-disc pl-4">
				{children?.map((child, index) => (
					<li key={index}>
						{((child as SerializedListItemNode).children?.[0] as SerializedTextNode)?.text}
					</li>
				))}
			</ul>
		)
	}
	if (tag === 'ol') {
		return (
			<ol className="ml-4 list-decimal pl-4">
				{children?.map((child, index) => (
					<li key={index}>
						{((child as SerializedListItemNode).children?.[0] as SerializedTextNode)?.text}
					</li>
				))}
			</ol>
		)
	}
}

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
	...defaultConverters,
	...LinkJSXConverter({ internalDocToHref }),
	heading,
	paragraph,
	list,
	link: ({ node }) => {
		const { children } = node
		return (
			<a href={internalDocToHref({ linkNode: node })}>
				{(children?.[0] as SerializedTextNode)?.text}
			</a>
		)
	},
})

type Props = {
	data: DefaultTypedEditorState
} & React.HTMLAttributes<HTMLDivElement>

export const RichText = (props: Props) => {
	const { className, ...rest } = props
	return <ConvertRichText converters={jsxConverters} className={className} {...rest} />
}
