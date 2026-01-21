import Image from 'next/image'
import { SerializedUploadNode } from '@payloadcms/richtext-lexical'

export const ImageBlockComponent: React.FC<{
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
