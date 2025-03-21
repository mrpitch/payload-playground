import * as React from 'react'

import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Preview,
	Section,
	Tailwind,
	Text,
} from '@react-email/components'

import { baseUrl } from '@/payload/utils/constants'

interface EmailPasswordResetProps {
	username: string
	url: string
	email: string
}

const content = {
	previewText: 'Reset password for email',
	heading: 'Reset your password',
	salutation: 'Welcome to Payload Playground',
	copy: 'You can reset your password by clicking the button below:',
	buttonLabel: 'Reset password',
	disclaimer:
		'Lore Ipsum Disclaimer consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}

export function EmailPasswordResetContent(props: EmailPasswordResetProps) {
	const { url, username } = props

	return (
		<Container className="border-secondary-light mx-auto my-[40px] max-w-[465px] rounded border border-solid">
			<Section className="mx-auto mt-8 mb-8 w-10/12">
				<Img
					src={`${baseUrl}/images/logo-secondary-light.png`}
					width="80"
					height="96"
					alt="Payload Playground"
					className="mx-auto my-0"
				/>
			</Section>

			<Heading className="text-secondary mt-8 text-center text-lg leading-2 font-bold">
				{content.heading}
			</Heading>
			<Section className="mx-auto mb-8 w-10/12">
				<Text className="text-normal text-foreground leading-1.5">Hello {username},</Text>
				<Text className="text-normal text-foreground leading-1.5">{content.copy}</Text>
			</Section>
			<Section className="mx-auto mb-6 w-10/12 text-center">
				<Button href={url}>{content.buttonLabel}</Button>
			</Section>
			<Section className="mx-auto w-10/12">
				<Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
				<Text className="text-[12px] leading-[24px] text-[#666666]">{content.disclaimer}</Text>
			</Section>
		</Container>
	)
}

export function EmailPasswordResetPreview(props: EmailPasswordResetProps) {
	const { email } = props
	const previewText = `${content.previewText} ${email}`
	return (
		<>
			<Tailwind>
				<div className="bg-background mx-auto my-auto px-2 font-sans">
					<Text>Preview Text: {previewText}</Text>
					<EmailPasswordResetContent {...props} />
				</div>
			</Tailwind>
		</>
	)
}

export function EmailPasswordReset(props: EmailPasswordResetProps) {
	const { email } = props
	const previewText = `Reset password for email ${email}`
	return (
		<Html>
			<Tailwind>
				<Head />
				<Body className="bg-background mx-auto my-auto px-2 font-sans">
					<Preview>{previewText}</Preview>
					<EmailPasswordResetContent {...props} />
				</Body>
			</Tailwind>
		</Html>
	)
}
