import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'

import { Button, buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Typography, typographyVariants } from '@/components/ui/typography'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'

const slug = 'home'

export default async function Home() {
	return (
		<Container as="main" className="w-full">
			<section className="grid items-center gap-6 pb-8 pt-6 md:py-10">
				<div className="flex max-w-[980px] flex-col items-start gap-2">
					<Typography as="h2" size="4xl">
						Beautifully designed components <br className="hidden sm:inline" />
						built with Radix UI and Tailwind CSS.
					</Typography>
					<Typography size="lg" className="max-w-[700px] text-primary">
						Accessible and customizable components that you can copy and paste
						into your apps. Free. Open Source. And Next.js 13 Ready.
					</Typography>
					<Typography size="xs" className="text-primary">
						this is really very small copy
					</Typography>
				</div>
				<div className="flex gap-4">
					<Link href="/getting-started" className={buttonVariants()}>
						Getting Started
					</Link>
					<Link href="#" className={buttonVariants({ variant: 'outline' })}>
						Outline Button
					</Link>
					<Link href="#" className={buttonVariants({ variant: 'ghost' })}>
						Ghost Button
					</Link>
				</div>
				<div className="mt-6">
					<Accordion type="single" collapsible className="w-full">
						<AccordionItem value="item-1">
							<AccordionTrigger className={typographyVariants({ as: 'h3' })}>
								Is it accessible?
							</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2">
							<AccordionTrigger>Is it styled?</AccordionTrigger>
							<AccordionContent>
								Yes. It comes with default styles that matches the other
								components&apos; aesthetic.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3">
							<AccordionTrigger>Is it animated?</AccordionTrigger>
							<AccordionContent>
								Yes. It&apos;s animated by default, but you can disable it if
								you prefer.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</section>
		</Container>
	)
}
