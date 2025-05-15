import {
	Body,
	Button,
	Column,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Row,
	Section,
	Tailwind,
	Text,
} from '@react-email/components'

import type { EmailImageTextBlock, Media } from '@payload-types'

export default function EmailImageText({ block }: { block: EmailImageTextBlock }) {
	// Destructure the values from the block
	const {
		tagline = '',
		headline = '',
		copy = '',
		image,
		ctaText = '',
		ctaLink = '',
		type = 'image-top', // Add type with default value
	} = block

	console.log('EmailImageText block:', {
		tagline,
		headline,
		copy,
		image,
		ctaText,
		ctaLink,
		type,
	})

	const imageUrl =
		typeof image === 'object' && image !== null && image.url
			? image.url
			: 'https://react.email/static/herman-miller-chair.jpg'

	return (
		<Section className="my-[16px] w-10/12">
			<Img
				alt={headline}
				className="w-full rounded-[12px] object-cover"
				height="320"
				src={imageUrl}
			/>
			<Section className="mt-[32px] text-center">
				{tagline && (
					<Text className="my-[16px] text-[18px] leading-[28px] font-semibold text-indigo-600">
						{tagline}
					</Text>
				)}
				<Heading
					as="h1"
					className="m-0 mt-[8px] text-[36px] leading-[36px] font-semibold text-gray-900"
				>
					{headline}
				</Heading>
				{copy && <Text className="text-[16px] leading-[24px] text-gray-500">{copy}</Text>}
				{ctaText && ctaLink && (
					<Button
						className="mt-[16px] rounded-[8px] bg-indigo-600 px-[40px] py-[12px] font-semibold text-white"
						href={ctaLink}
					>
						{ctaText}
					</Button>
				)}
			</Section>
		</Section>
	)
}
