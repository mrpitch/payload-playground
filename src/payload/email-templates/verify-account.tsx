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
import { cn } from '@/lib/utils/cn'

import { theme } from '@/lib/styles/email/theme'
import { emailButtonVariants } from '@/lib/styles/email/emailStyles'
import { sans, serif, mono } from '@/lib/styles/fonts'

import { RichText } from '@/components/utils/richtext'
import { TVerifyEmailProps } from '@/payload/types/email-templates'

export type TEmailVerifyAccountProps = TVerifyEmailProps

export function EmailVerifyAccount(props: TEmailVerifyAccountProps) {
	const { email, username, url, previewText, heading, salutation, copy, buttonLabel, footer } =
		props

	return (
		<Html>
			<Tailwind config={theme}>
				<Head />
				<Body
					className={cn(
						'bg-background mx-auto my-auto font-sans',
						sans.variable,
						serif.variable,
						mono.variable,
					)}
				>
					<Preview>
						{previewText} {email || ''}
					</Preview>

					<Container className="border-secondary-light mx-auto my-[40px] max-w-[640px] rounded border border-solid">
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
							{heading} {email}
						</Heading>
						<Section className="mx-auto mb-8 w-10/12">
							<Text className="text-normal text-foreground leading-1.5">
								{salutation} {username},
							</Text>
							<Text className="text-normal text-foreground leading-1.5">{copy}</Text>
						</Section>
						<Section className="mx-auto mb-6 w-10/12 text-center">
							<Button href={url} className={emailButtonVariants({ variant: 'secondary' })}>
								{buttonLabel}
							</Button>
						</Section>
						<Section className="mx-auto w-10/12">
							<Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />

							<RichText data={footer} className="text-foreground text-xs" />
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}
