import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/custom/container'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Icon, IconType } from '@/components/ui/custom/icons'
import { Typography } from '@/components/ui/custom/typography'

import type { Doc } from '@payload-types'

export async function DocsTeaser({
	headline,
	subline,
	docs,
}: {
	headline: string
	subline: string
	docs: Doc[]
}) {
	return (
		<Container className="mt-12">
			<Typography as="h2" className="mb-8 text-center">
				{headline}
			</Typography>
			<Typography as="h4" className="text-muted-foreground mb-8 text-center">
				{subline}
			</Typography>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
				{docs?.map((doc: Doc) => (
					<Link
						key={doc.id}
						href={`/docs/${doc.slug}`}
						className="block transition-transform hover:scale-[1.02]"
					>
						<Card className="group hover:bg-card/80 border-border/50 hover:border-border cursor-pointer transition-all duration-200">
							<CardHeader className="pb-3">
								<div className="mb-3 flex items-start justify-between">
									{doc.icon ? (
										<div className="bg-secondary group-hover:bg-accent rounded-lg p-2 transition-colors">
											<Icon iconName={doc.icon} className="text-foreground h-5 w-5" />
										</div>
									) : null}
									{doc.categories && doc?.categories?.length > 0 ? (
										<div className="mb-2">
											{doc.categories?.map(
												(category) =>
													typeof category !== 'number' && (
														<Badge key={category.id} variant="secondary" className="mr-2">
															{category.title}
														</Badge>
													),
											)}
										</div>
									) : null}
								</div>
								<CardTitle className="text-foreground group-hover:text-primary text-lg transition-colors">
									{doc.title}
								</CardTitle>
							</CardHeader>
							<CardContent className="pt-0">
								<CardDescription className="text-muted-foreground mb-4 text-sm leading-relaxed">
									{doc.excerpt}
								</CardDescription>
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground text-xs">
										Updated{' '}
										{new Date(doc?.publishedAt || '').toLocaleDateString('de-DE', {
											month: 'short',
											day: 'numeric',
											year: 'numeric',
										})}
									</span>
									<Icon
										iconName="arrowRight"
										className="text-muted-foreground group-hover:text-foreground h-4 w-4 transition-all group-hover:translate-x-1"
									/>
								</div>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</Container>
	)
}

export default DocsTeaser
