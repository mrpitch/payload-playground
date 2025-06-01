import React, { Fragment } from 'react'
import type {
	EmailImageTextBlock as TEmailImageTextBlock,
	EmailGalleryBlock as TEmailGalleryBlock,
} from '@payload-types'
import EmailImageText from '@/payload/email-templates/email-image-text'
import EmailGallery from '@/payload/email-templates/email-gallery'

interface IRenderBlocksProps {
	blocks: TEmailImageTextBlock[]
}

const EmailBlockComponents = {
	'email-image-text': EmailImageText,
	'email-gallery': EmailGallery,
}

export const RenderEmailBlocks: React.FC<IRenderBlocksProps> = ({ blocks }) => {
	console.log('RenderEmailBlocks received blocks:', {
		blocks,
		isArray: Array.isArray(blocks),
		length: blocks?.length,
		blockTypes: blocks?.map((b) => b.blockType),
		firstBlock: blocks?.[0],
		firstBlockKeys: blocks?.[0] ? Object.keys(blocks[0]) : [],
	})

	const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

	if (!hasBlocks) {
		console.log('No blocks to render:', { blocks, hasBlocks })
		return null
	}

	return (
		<Fragment>
			{blocks.map((block, index) => {
				const { blockType } = block
				console.log('Processing block:', {
					index,
					blockType,
					block,
					blockKeys: Object.keys(block),
					blockValues: Object.values(block),
				})

				if (blockType && blockType in EmailBlockComponents) {
					const Block = EmailBlockComponents[blockType]
					console.log('Found component for block:', { blockType, Block })

					if (Block) {
						return (
							<Fragment key={index}>
								<Block block={block} />
							</Fragment>
						)
					}
				}
				console.log('No component found for block:', { blockType })
				return null
			})}
		</Fragment>
	)
}
