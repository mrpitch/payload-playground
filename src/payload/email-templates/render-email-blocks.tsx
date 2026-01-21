import React, { Fragment } from 'react'
import type {
	EmailImageTextBlock as TEmailImageTextBlock,
	EmailGalleryBlock as TEmailGalleryBlock,
} from '@payload-types'
import EmailImageText from '@/payload/email-templates/email-image-text'
import EmailGallery from '@/payload/email-templates/email-gallery'

interface IRenderBlocksProps {
	blocks: (TEmailImageTextBlock | TEmailGalleryBlock)[]
}

// Generic render function
const renderBlock = (block: TEmailImageTextBlock | TEmailGalleryBlock, index: number) => {
	const { blockType } = block

	switch (blockType) {
		case 'email-image-text':
			return (
				<Fragment key={index}>
					<EmailImageText block={block as TEmailImageTextBlock} />
				</Fragment>
			)
		case 'email-gallery':
			return (
				<Fragment key={index}>
					<EmailGallery block={block as TEmailGalleryBlock} />
				</Fragment>
			)
		default:
			console.log('No component found for block:', { blockType })
			return null
	}
}

export const RenderEmailBlocks: React.FC<IRenderBlocksProps> = ({ blocks }) => {
	const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

	if (!hasBlocks) {
		console.log('No blocks to render:', { blocks, hasBlocks })
		return null
	}

	return <Fragment>{blocks.map((block, index) => renderBlock(block, index))}</Fragment>
}
