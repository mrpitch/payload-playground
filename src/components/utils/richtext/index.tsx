import {
	DefaultNodeTypes,
	SerializedBlockNode,
	type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
	type JSXConvertersFunction,
	LinkJSXConverter,
	RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { HeadingJSXConverter } from './heading-converter'
import { VideoBlockComponent } from './video-converter'
import { ImageBlockComponent } from './image-converter'
import { internalDocToHref } from './helper'

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
	...defaultConverters,
	...LinkJSXConverter({ internalDocToHref }),
	...HeadingJSXConverter,
	// Override the default upload converter
	upload: ({ node }) => {
		return <ImageBlockComponent node={node} />
	},
	blocks: {
		video: ({ node }: { node: SerializedBlockNode }) => <VideoBlockComponent node={node} />,
	},
})

type Props = {
	data: DefaultTypedEditorState
} & React.HTMLAttributes<HTMLDivElement>

export const RichText = (props: Props) => {
	const { className, ...rest } = props
	return <ConvertRichText converters={jsxConverters} className={className} {...rest} />
}
