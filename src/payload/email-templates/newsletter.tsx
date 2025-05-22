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

import { cn } from '@/lib/utils/cn'

import { baseUrl } from '@/payload/utils/constants'

import { theme } from '@/lib/styles/v3/theme'
import { typeNextRegular, typeNextLight, typeNextSemiBold, typeNextBold } from '@/lib/styles/fonts'

import { RichText } from '@/components/utils/richtext'

import { RenderEmailBlocks } from '@/payload/email-templates/render-email-blocks'
import { NewsletterFields } from '@/payload/types/email-templates'

export type TNewsletterProps = NewsletterFields

export function EmailNewsletter(props: TNewsletterProps) {
	const { previewText, salutation, footer, blocks } = props

	// console.log('EmailNewsletter props:', {
	// 	blocks,
	// 	blocksType: typeof blocks,
	// 	isArray: Array.isArray(blocks),
	// 	blocksKeys: blocks ? Object.keys(blocks) : [],
	// 	blocksContent: blocks?.map((block, index) => ({
	// 		index,
	// 		blockType: block.blockType,
	// 		blockKeys: Object.keys(block),
	// 		blockValues: Object.values(block),
	// 		fullBlock: block,
	// 	})),
	// })

	return (
		<Html>
			<Tailwind config={theme}>
				<Head />
				<Body
					className={cn(
						'bg-background mx-auto my-auto font-sans',
						typeNextRegular.variable,
						typeNextLight.variable,
						typeNextSemiBold.variable,
						typeNextBold.variable,
					)}
				>
					<Preview>{previewText}</Preview>

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
						<RenderEmailBlocks blocks={blocks} />

						<Section className="my-[16px]">
							<Section className="mt-[42px] w-10/12">
								<Row>
									<Text className="m-0 text-[16px] leading-[24px] font-semibold text-indigo-600">
										Our products
									</Text>
									<Text className="m-0 mt-[8px] text-[24px] leading-[32px] font-semibold text-gray-900">
										Elegant Style
									</Text>
									<Text className="mt-[8px] text-[16px] leading-[24px] text-gray-500">
										We spent two years in development to bring you the next generation of our
										award-winning home brew grinder. From the finest pour-overs to the coarsest cold
										brews, your coffee will never be the same again.
									</Text>
								</Row>
							</Section>
							<Section className="mt-[16px] w-10/12">
								<Row className="mt-[16px]">
									<Column className="w-[50%] pr-[8px]">
										<Link href="#">
											<Img
												alt="Stagg Electric Kettle"
												className="w-full rounded-[12px] object-cover"
												height={288}
												src="https://react.email/static/stagg-eletric-kettle.jpg"
											/>
										</Link>
									</Column>
									<Column className="w-[50%] pl-[8px]">
										<Link href="#">
											<Img
												alt="Ode Grinder"
												className="w-full rounded-[12px] object-cover"
												height={288}
												src="https://react.email/static/ode-grinder.jpg"
											/>
										</Link>
									</Column>
								</Row>
								<Row className="mt-[16px]">
									<Column className="w-[50%] pr-[8px]">
										<Link href="#">
											<Img
												alt="Atmos Vacuum Canister"
												className="w-full rounded-[12px] object-cover"
												height={288}
												src="https://react.email/static/atmos-vacuum-canister.jpg"
											/>
										</Link>
									</Column>
									<Column className="w-[50%] pl-[8px]">
										<Link href="#">
											<Img
												alt="Clyde Electric Kettle"
												className="w-full rounded-[12px] object-cover"
												height={288}
												src="https://react.email/static/clyde-electric-kettle.jpg"
											/>
										</Link>
									</Column>
								</Row>
							</Section>
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
