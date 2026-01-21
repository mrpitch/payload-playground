import {
	Body,
	Container,
	Head,
	Hr,
	Html,
	Img,
	Preview,
	Section,
	Tailwind,
	pixelBasedPreset,
} from '@react-email/components'

import { cn } from '@/lib/utils/cn'

import { baseUrl } from '@/payload/utils/constants'

import { theme } from '@/lib/styles/email/theme'
import { sans, serif, mono } from '@/lib/styles/fonts'

import { RichText } from '@/components/utils/richtext'

import { RenderEmailBlocks } from '@/payload/email-templates/render-email-blocks'
import { TNewsletterProps } from '@/payload/types/email-templates'

export type TEmailNewsletterProps = TNewsletterProps

export function EmailNewsletter(props: TEmailNewsletterProps) {
	const { previewText, footer, layout } = props

	return (
		<Html>
			<Tailwind
				config={{
					presets: [pixelBasedPreset],
					theme,
				}}
			>
				<Head />
				<Body
					className={cn('mx-auto my-auto font-sans', sans.variable, serif.variable, mono.variable)}
				>
					<Preview>{previewText}</Preview>

					<Container className="bg-background mx-auto my-[40px] max-w-[640px] rounded border border-solid">
						<Section className="mx-auto mt-8 mb-8 w-10/12">
							<Img
								src={`${baseUrl}/images/logo-secondary-light.png`}
								width="80"
								height="96"
								alt="Payload Playground"
								className="mx-auto my-0"
							/>
						</Section>
						<RenderEmailBlocks blocks={layout || []} />

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
