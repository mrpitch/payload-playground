import React from 'react'
import { Heading, Img, Section, Text, Link, Column, Row } from '@react-email/components'

import type { EmailGalleryBlock } from '@payload-types'
import { cn } from '@/lib/utils/cn'

type GridType = '4grid' | '3grid-horizontal' | '3grid-vertical'

interface ILayoutConfig {
	container: (items: React.ReactElement[]) => React.ReactElement
}

const layoutConfigs: Record<GridType, ILayoutConfig> = {
	'4grid': {
		container: (items) => <Section className="mt-[16px]">{items}</Section>,
	},
	'3grid-horizontal': {
		container: (items) => <Section className="mt-[16px]">{items}</Section>,
	},
	'3grid-vertical': {
		container: (items) => <Section className="mt-[16px]">{items}</Section>,
	},
}

interface IGalleryItemProps {
	imageUrl: string
	alt?: string
	isEven?: boolean
}

const GalleryItem = ({ imageUrl, alt, isEven }: IGalleryItemProps) => {
	return (
		<Column className={cn(isEven ? 'w-[50%] pr-[8px]' : 'w-[50%] pl-[8px]')}>
			<Link href="#">
				<Img
					alt={alt || 'Gallery image'}
					className="w-full rounded-[12px] object-cover"
					height={288}
					src={imageUrl}
				/>
			</Link>
		</Column>
	)
}

export function EmailGallery({ block }: { block: EmailGalleryBlock }) {
	const { headline, type = '4grid', gallery, tagline, copy } = block

	const layout = layoutConfigs[type as GridType] || layoutConfigs['4grid']

	const items = gallery?.map((item, i) => {
		const isEven = i % 2 === 0
		return (
			<React.Fragment key={i}>
				{isEven && (
					<Row className="mt-[16px]">
						<GalleryItem imageUrl={item.image?.url || ''} alt={item.title} isEven={isEven} />
						{gallery[i + 1] && (
							<GalleryItem
								imageUrl={gallery[i + 1].image?.url || ''}
								alt={gallery[i + 1].title}
								isEven={false}
							/>
						)}
					</Row>
				)}
			</React.Fragment>
		)
	})

	return (
		<Section className="mx-auto w-10/12">
			{tagline ? (
				<Text className="text-foreground-dark text-center text-sm leading-[20px]">{tagline}</Text>
			) : null}
			{headline ? (
				<Heading
					as="h2"
					className="text-foreground-dark mb-6 text-center text-[24px] leading-[32px] font-semibold"
				>
					{headline}
				</Heading>
			) : null}
			{copy ? (
				<Text className="text-foreground-dark text-center text-sm leading-[20px]">{copy}</Text>
			) : null}
			{layout.container(items || [])}
		</Section>
	)
}

export default EmailGallery
