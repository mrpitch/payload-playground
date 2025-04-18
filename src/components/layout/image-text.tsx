import Image from 'next/image'
import Link from 'next/link'

import { ImageTextBlock as TImageText } from '@payload-types'
import { imageUrl } from '@/lib/utils/constants'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/custom/typography'
import { Container } from '@/components/ui/custom/container'

interface ImageTextProps extends TImageText {
	overlayOpacity?: number
}

export default function ImageText({
	items,
	imageLeftOnOdd = true,
	overlayOpacity = 0.1,
}: ImageTextProps) {
	return (
		<Container as="div" className="px-4 py-12 md:px-6">
			{items?.map((item, index: number) => {
				// Determine if image should be on the left
				const isOdd = index % 2 === 0
				const imageOnLeft = imageLeftOnOdd ? isOdd : !isOdd

				return (
					<div
						key={item.id}
						className="border-muted flex flex-col items-center gap-8 border-b py-12 last:border-0 md:flex-row"
					>
						{/* Image Section */}
						<div className={`w-full md:w-1/2 ${imageOnLeft ? 'md:order-1' : 'md:order-2'}`}>
							<div className="relative isolate aspect-video overflow-hidden rounded-lg">
								<div
									className="bg-secondary absolute inset-0 z-10"
									style={{ opacity: overlayOpacity }}
								/>
								<Image
									src={
										item.image && typeof item.image === 'object'
											? `${imageUrl}/${item.image.filename}`
											: '/placeholder.png'
									}
									alt={item.image && typeof item.image === 'object' ? item.image.alt : ''}
									fill
									className="object-cover"
								/>
							</div>
						</div>

						{/* Text Section */}
						<div className={`w-full md:w-1/2 ${imageOnLeft ? 'md:order-2' : 'md:order-1'}`}>
							<div className="space-y-4">
								<div className="mb-2">
									<span className="text-primary text-sm font-medium tracking-wider uppercase">
										{item.tagline}
									</span>
								</div>
								<Typography as="h3" className="tracking-tight">
									{item.headline}
								</Typography>
								<div className="prose prose-gray dark:prose-invert">
									<Typography as="p">{item.copy}</Typography>
								</div>
								{item.ctaText && item.ctaLink && (
									<div className="pt-4">
										<Button asChild>
											<Link href={item.ctaLink}>{item.ctaText}</Link>
										</Button>
									</div>
								)}
							</div>
						</div>
					</div>
				)
			})}
		</Container>
	)
}
