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

import { buttonVariants } from '@/components/ui/button'

export type TEmailVerifyAccountProps = {
	username: string
	url: string
	email: string
	previewText: string
	heading: string
	salutation: string
	copy: string
	buttonLabel: string
	footer: string
}

export async function EmailVerifyAccount(props: TEmailVerifyAccountProps) {
	const { email, username, url, previewText, heading, salutation, copy, buttonLabel, footer } =
		props

	console.log('props', props)
	return (
		<Html>
			<Tailwind>
				<Head />
				<Body className="bg-background mx-auto my-auto px-2 font-sans">
					<Preview>
						{previewText} {email}
					</Preview>

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
							{heading} {email}
						</Heading>
						<Section className="mx-auto mb-8 w-10/12">
							<Text className="text-normal text-foreground leading-1.5">
								{salutation} {username},
							</Text>
							<Text className="text-normal text-foreground leading-1.5">{copy}</Text>
						</Section>
						<Section className="mx-auto mb-6 w-10/12 text-center">
							<Button href={url} className={buttonVariants({ variant: 'outline' })}>
								{buttonLabel}
							</Button>
						</Section>
						<Section className="mx-auto w-10/12">
							<Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
							<Text className="text-[12px] leading-[24px] text-[#666666]">{footer}</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}
