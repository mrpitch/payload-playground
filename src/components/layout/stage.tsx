import Image from 'next/image'
import Link from 'next/link'

import { StageBlock as TStage } from '@payload-types'

import { imageUrl } from '@/lib/utils/constants'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/custom/typography'
import { Container } from '@/components/ui/custom/container'

interface StageProps extends TStage {
	overlayOpacity?: number
}

export default function Stage({
	tagline,
	headline,
	subline,
	copy,
	ctaText,
	ctaLink,
	backgroundImage,
	overlayOpacity = 0.2,
}: StageProps) {
	return (
		<section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
			{/* Background image */}
			<div className="absolute inset-0 h-full w-full">
				<Image
					src={
						`${imageUrl}/${backgroundImage && typeof backgroundImage === 'object' ? backgroundImage?.sizes?.hero?.filename : ''}` ||
						'/placeholder_16-9_1x.png'
					}
					alt={
						backgroundImage && typeof backgroundImage === 'object' ? backgroundImage.alt || '' : ''
					}
					fill
					priority
					className="object-cover"
				/>
				<div className="bg-secondary absolute inset-0" style={{ opacity: overlayOpacity }} />
			</div>
			{/* Content */}
			<Container className="relative flex h-full w-full items-center">
				<div className="px-4 py-12 md:px-6">
					{tagline ? (
						<p className="text-primary-foreground/80 mb-3 text-sm font-medium md:text-base">
							{tagline}
						</p>
					) : null}
					<Typography
						as="h1"
						className="text-primary-foreground mb-4 text-3xl tracking-tighter md:text-4xl lg:text-5xl"
					>
						{headline}
					</Typography>
					{subline ? (
						<Typography
							as="h2"
							className="text-primary-foreground/90 mb-4 text-xl font-medium md:text-2xl"
						>
							{subline}
						</Typography>
					) : null}
					{copy ? (
						<Typography
							as="p"
							className="text-primary-foreground/80 mb-6 max-w-xl text-base md:text-lg"
						>
							{copy}
						</Typography>
					) : null}
					{ctaText && ctaLink ? (
						<Button asChild size="lg" className="mt-2">
							<Link href={ctaLink}>{ctaText}</Link>
						</Button>
					) : null}
				</div>
			</Container>
		</section>
	)
}
