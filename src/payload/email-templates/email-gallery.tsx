import React from 'react'
import { Heading, Img, Section, Text, Link, Column, Row } from '@react-email/components'

import type { EmailGalleryBlock, Media } from '@payload-types'
import { cn } from '@/lib/utils/cn'

type GridType = '4grid' | '3grid-horizontal' | '3grid-vertical'

const layoutConfigs: Record<GridType, ILayoutConfig> = {
	'4grid': { container: (items) => <Section className="mt-[16px]">{items}</Section> },
	'3grid-horizontal': { container: (items) => <Section className="mt-[16px]">{items}</Section> },
	'3grid-vertical': { container: (items) => <Section className="mt-[16px]">{items}</Section> },
}

interface ILayoutConfig {
	container: (items: React.ReactElement[]) => React.ReactElement
}

interface IGalleryItemProps {
	imageUrl: string
	alt?: string
	isEven?: boolean
}

const GalleryItem = ({ imageUrl, alt, isEven }: IGalleryItemProps) => (
	<Column className={cn(isEven ? 'w-[50%] pr-[8px]' : 'w-[50%] pl-[8px]')}>
		{imageUrl && (
			<Link href="#">
				<Img
					alt={alt || 'Gallery image'}
					className="w-full rounded-[12px] object-cover"
					height={288}
					src={imageUrl}
				/>
			</Link>
		)}
	</Column>
)

// Helper to extract image data from Media object or fallback
const getImageData = (image: number | null | Media | undefined) => {
	const media = image && typeof image === 'object' && 'url' in image ? image : null
	return {
		url: media?.url || '',
		alt: media?.alt || 'Gallery image',
	}
}

export function EmailGallery({ block }: { block: EmailGalleryBlock }) {
	const { headline, type = '4grid', gallery, tagline, copy } = block
	const layout = layoutConfigs[type as GridType] || layoutConfigs['4grid']

	const items =
		gallery
			?.map((item, i) => {
				const isEven = i % 2 === 0
				if (!isEven) return null

				const currentImage = getImageData(item.image)
				const nextImage = gallery?.[i + 1] ? getImageData(gallery[i + 1].image) : null

				return (
					<Row key={i} className="mt-[16px]">
						<GalleryItem imageUrl={currentImage.url} alt={currentImage.alt} isEven={true} />
						{nextImage && (
							<GalleryItem imageUrl={nextImage.url} alt={nextImage.alt} isEven={false} />
						)}
					</Row>
				)
			})
			.filter((item): item is React.ReactElement => item !== null) || []

	return (
		<Section className="mx-auto w-10/12">
			{tagline && (
				<Text className="text-foreground-dark text-center text-sm leading-[20px]">{tagline}</Text>
			)}
			{headline && (
				<Heading
					as="h2"
					className="text-foreground-dark mb-6 text-center text-[24px] leading-[32px] font-semibold"
				>
					{headline}
				</Heading>
			)}
			{copy && (
				<Text className="text-foreground-dark text-center text-sm leading-[20px]">{copy}</Text>
			)}
			{layout.container(items)}
		</Section>
	)
}

export default EmailGallery
