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

import { cn } from '@/lib/utils/cn'

import { baseUrl } from '@/payload/utils/constants'

import { theme } from '@/lib/styles/email/theme'
import { sans, serif, mono } from '@/lib/styles/fonts'
//import { typeNextRegular, typeNextLight, typeNextSemiBold, typeNextBold } from '@/lib/styles/fonts'

import { RichText } from '@/components/utils/richtext'
import { TPasswordResetProps } from '@/payload/types/email-templates'

import { emailButtonVariants } from '@/lib/styles/email/emailStyles'
export type TEmailPasswordResetProps = TPasswordResetProps

export function EmailPasswordReset(props: TEmailPasswordResetProps) {
	const { email, username, url, previewText, heading, salutation, copy, buttonLabel, footer } =
		props

	return (
		<Html>
			<Tailwind config={theme}>
				<Head />
				<Body
					className={cn(
						'mx-auto my-auto bg-background font-sans',
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

						<Heading className="mt-8 text-center text-lg leading-2 font-bold text-secondary">
							{heading} {email}
						</Heading>
						<Section className="mx-auto mb-8 w-10/12">
							<Text className="text-normal leading-1.5 text-foreground">
								{salutation} {username},
							</Text>
							<Text className="text-normal leading-1.5 text-foreground">{copy}</Text>
						</Section>
						<Section className="mx-auto mb-6 w-10/12 text-center">
							<Button href={url} className={emailButtonVariants({ variant: 'secondary' })}>
								{buttonLabel}
							</Button>
						</Section>
						<Section className="mx-auto w-10/12">
							<Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />

							<RichText data={footer} className="text-xs text-foreground" />
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}
