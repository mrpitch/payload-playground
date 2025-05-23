import React from 'react'
import { Button, Column, Heading, Img, Link, Row, Section, Text } from '@react-email/components'

import type { EmailImageTextBlock } from '@payload-types'

type LayoutType = 'image-top' | 'image-left' | 'image-right'

interface IImageContentProps {
	imageUrl: string
	headline: string
}

interface IContentProps {
	tagline?: string
	headline: string
	copy?: string
	ctaText?: string
	ctaLink?: string
}

// Image components for different layouts
const TopImage = ({ imageUrl, headline }: IImageContentProps) => (
	<Img alt={headline} className="w-full rounded-[12px] object-cover" height="320" src={imageUrl} />
)

// Content components for different layouts
const TopContent = ({ tagline, headline, copy, ctaText, ctaLink }: IContentProps) => (
	<Section className="text-center">
		{tagline && (
			<Text className="text-secondary my-[16px] text-[18px] leading-[28px] font-semibold">
				{tagline}
			</Text>
		)}
		<Heading
			as="h1"
			className="text-foreground-dark m-0 mt-[8px] text-[36px] leading-[36px] font-semibold"
		>
			{headline}
		</Heading>
		{copy && <Text className="text-foreground text-[16px] leading-[24px]">{copy}</Text>}
		{ctaText && ctaLink && (
			<Button
				className="bg-primary mt-[16px] rounded-[8px] px-[40px] py-[12px] font-semibold text-white"
				href={ctaLink}
			>
				{ctaText}
			</Button>
		)}
	</Section>
)

const SideImage = ({ imageUrl, headline }: IImageContentProps) => (
	<>
		<Img
			alt={headline}
			className="rounded-[8px] object-cover"
			height={220}
			src={imageUrl}
			width={220}
		/>
	</>
)

const SideContent = ({ tagline, headline, copy, ctaText, ctaLink }: IContentProps) => (
	<>
		{tagline && (
			<Text className="text-secondary m-0 mt-0 text-[16px] leading-[24px] font-semibold">
				{tagline}
			</Text>
		)}
		<Text className="text-foreground-dark m-0 mt-[8px] text-[20px] leading-[28px] font-semibold">
			{headline}
		</Text>
		{copy && <Text className="text-foreground mt-[8px] text-[16px] leading-[24px]">{copy}</Text>}
		{ctaText && ctaLink && (
			<Link className="text-primary underline" href={ctaLink}>
				{ctaText}
			</Link>
		)}
	</>
)

type LayoutContainer = (
	image: React.ReactElement,
	content: React.ReactElement,
) => React.ReactElement

interface ILayoutConfig {
	container: LayoutContainer
	imageComponent: (props: IImageContentProps) => React.ReactElement
	contentComponent: (props: IContentProps) => React.ReactElement
}

const layoutConfigs: Record<LayoutType, ILayoutConfig> = {
	'image-top': {
		container: (image, content) => (
			<Section className="my-16 w-10/12">
				{image}
				<Section className="mt-[32px]">{content}</Section>
			</Section>
		),
		imageComponent: TopImage,
		contentComponent: TopContent,
	},
	'image-left': {
		container: (image, content) => (
			<Section className="my-16 w-10/12 text-center">
				<Section className="my-[8px] mr-2 inline-block w-full max-w-[250px] align-top">
					{image}
				</Section>
				<Section className="inline-block w-full max-w-[250px] text-left align-top">
					{content}
				</Section>
			</Section>
		),
		imageComponent: SideImage,
		contentComponent: SideContent,
	},
	'image-right': {
		container: (image, content) => (
			<Section className="my-16 w-10/12 text-center">
				<Section className="inline-block w-full max-w-[250px] text-left align-top">
					{content}
				</Section>
				<Section className="my-[8px] inline-block w-full max-w-[250px] align-top">{image}</Section>
			</Section>
		),
		imageComponent: SideImage,
		contentComponent: SideContent,
	},
}

export default function EmailImageText({ block }: { block: EmailImageTextBlock }) {
	const {
		tagline = '',
		headline = '',
		copy = '',
		image,
		ctaText = '',
		ctaLink = '',
		type = 'image-top',
	} = block

	// console.log('EmailImageText block:', {
	// 	tagline,
	// 	headline,
	// 	copy,
	// 	image,
	// 	ctaText,
	// 	ctaLink,
	// 	type,
	// })

	const imageUrl =
		typeof image === 'object' && image !== null && image.url
			? image.url
			: 'https://react.email/static/herman-miller-chair.jpg'

	const layout = layoutConfigs[type as LayoutType] || layoutConfigs['image-top']

	const ImageComponent = layout.imageComponent
	const ContentComponent = layout.contentComponent

	return layout.container(
		<ImageComponent imageUrl={imageUrl} headline={headline} />,
		<ContentComponent
			tagline={tagline || undefined}
			headline={headline}
			copy={copy || undefined}
			ctaText={ctaText || undefined}
			ctaLink={ctaLink || undefined}
		/>,
	)
}
