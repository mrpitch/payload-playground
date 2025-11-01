import Image from 'next/image'
import { VideoPlayer } from './video-player'

import {
	DefaultNodeTypes,
	SerializedHeadingNode,
	SerializedLinkNode,
	SerializedUploadNode,
	SerializedBlockNode,
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
import { VideoBlock } from '@/payload/blocks/video-block'

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

// Custom upload converter component that uses next/image
const CustomUploadComponent: React.FC<{
	node: SerializedUploadNode
}> = ({ node }) => {
	if (node.relationTo === 'media') {
		const uploadDoc = node.value
		if (typeof uploadDoc !== 'object') {
			return null
		}
		const { alt, height, url, width } = uploadDoc
		return (
			<div className="relative h-full w-full">
				<Image alt={alt || ''} height={height || 0} src={url || ''} width={width || 0} />
				<div className="absolute right-0 bottom-0 left-0 bg-black/50 p-2 text-white">
					<p className="text-sm">{alt || ''}</p>
				</div>
			</div>
		)
	}

	return null
}

const VideoBlockComponent: React.FC<{
	node: SerializedBlockNode
}> = ({ node }) => {
	console.log('node', node)
	const videoUrl = node.fields.videoUrl
	if (!videoUrl) {
		return null
	}
	return (
		<div className="relative aspect-video h-full w-full">
			<VideoPlayer videoUrl={videoUrl} width="100%" height="100%" />
		</div>
	)
}

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
	...defaultConverters,
	...LinkJSXConverter({ internalDocToHref }),
	...HeadingJSXConverter,
	// Override the default upload converter
	upload: ({ node }) => {
		return <CustomUploadComponent node={node} />
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
