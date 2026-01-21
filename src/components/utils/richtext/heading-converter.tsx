import { SerializedHeadingNode } from '@payloadcms/richtext-lexical'
import { JSXConverters } from '@payloadcms/richtext-lexical/react'

import { Typography } from '@/components/ui/custom/typography'
import { generateSlug } from '@/lib/utils/generateSlug'

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
