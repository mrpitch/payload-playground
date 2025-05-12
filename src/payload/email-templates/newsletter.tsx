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

import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { baseUrl } from '@/payload/utils/constants'

import { theme } from '@/lib/styles/v3/theme'
import { typeNextRegular, typeNextLight, typeNextSemiBold, typeNextBold } from '@/lib/styles/fonts'

import { RichText } from '@/components/utils/richtext'

import { emailButtonVariants } from '@/lib/styles/v3/emailStyles'

export type TEmailPasswordResetProps = {
	footer: DefaultTypedEditorState
}

export function EmailNewsletter(props: TEmailPasswordResetProps) {
	const { footer } = props
	return (
		<Html>
			<Tailwind config={theme}>
				<Head />
				<Body
					className={cn(
						'bg-background mx-auto my-auto px-2 font-sans',
						typeNextRegular.variable,
						typeNextLight.variable,
						typeNextSemiBold.variable,
						typeNextBold.variable,
					)}
				>
					<Preview>Preview Text</Preview>

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

						<Section className="my-[16px]">
							<Img
								alt="Herman Miller Chair"
								className="w-full rounded-[12px] object-cover"
								height="320"
								src="https://react.email/static/herman-miller-chair.jpg"
							/>
							<Section className="mt-[32px] text-center">
								<Text className="my-[16px] text-[18px] leading-[28px] font-semibold text-indigo-600">
									Our new article
								</Text>
								<Heading
									as="h1"
									className="m-0 mt-[8px] text-[36px] leading-[36px] font-semibold text-gray-900"
								>
									Designing with Furniture
								</Heading>
								<Text className="text-[16px] leading-[24px] text-gray-500">
									Unleash your inner designer as we explore how furniture plays a vital role in
									creating stunning interiors, offering insights into choosing the right pieces,
									arranging them harmoniously, and infusing your space with personality.
								</Text>
								<Button
									className="mt-[16px] rounded-[8px] bg-indigo-600 px-[40px] py-[12px] font-semibold text-white"
									href="https://react.email"
								>
									Read more
								</Button>
							</Section>
						</Section>

						<Section className="my-[16px] text-center">
							<Section className="inline-block w-full max-w-[250px] text-left align-top">
								<Text className="m-0 text-[16px] leading-[24px] font-semibold text-indigo-600">
									What's new
								</Text>
								<Text className="m-0 mt-[8px] text-[20px] leading-[28px] font-semibold text-gray-900">
									Versatile Comfort
								</Text>
								<Text className="mt-[8px] text-[16px] leading-[24px] text-gray-500">
									Experience ultimate comfort and versatility with our furniture collection,
									designed to adapt to your ever-changing needs.
								</Text>
								<Link className="text-indigo-600 underline" href="https://react.email">
									Read more
								</Link>
							</Section>
							<Section className="my-[8px] inline-block w-full max-w-[220px] align-top">
								<Img
									alt="An aesthetic picture taken of an Iphone, flowers, glasses and a card that reads 'Gucci, bloom' coming out of a leathered bag with a ziper"
									className="rounded-[8px] object-cover"
									height={220}
									src="https://react.email/static/versatile-comfort.jpg"
									width={220}
								/>
							</Section>
						</Section>

						<Section className="my-[16px]">
							<Section className="mt-[42px]">
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
							<Section className="mt-[16px]">
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
