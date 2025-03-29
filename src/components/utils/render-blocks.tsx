import React, { Fragment } from 'react'

import type { Page, Post } from '@payload-types'

import QuoteBlock from '@/components/layout/quote-block'
import CopyBlock from '@/components/layout/copy-block'
import Stage from '@/components/layout/stage'

interface IRenderBlocksProps {
	blocks: Page['layout'] | Post['layout']
}

const blockComponents = {
	stage: Stage,
	quote: QuoteBlock,
	copy: CopyBlock,
}

export const RenderBlocks: React.FC<IRenderBlocksProps> = ({ blocks }) => {
	const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

	if (!hasBlocks) return null

	return (
		<Fragment>
			{blocks.map((block, index) => {
				const { blockType } = block

				if (blockType && blockType in blockComponents) {
					const Block = blockComponents[blockType]

					if (Block) {
						return (
							<div key={index}>
								{/* @ts-expect-error there may be some mismatch between the expected types here */}
								<Block {...block} />
							</div>
						)
					}
				}
				return null
			})}
		</Fragment>
	)
}
