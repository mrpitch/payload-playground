import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/custom/container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@/components/ui/custom/icons'
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
			<Typography as="h4" className="mb-8 text-center text-muted-foreground">
				{subline}
			</Typography>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
				{docs?.map((doc: Doc) => (
					<Link
						key={doc.id}
						href={`/docs/${doc.slug}`}
						className="block transition-transform hover:scale-[1.02]"
					>
						<Card className="group cursor-pointer border-border/50 transition-all duration-200 hover:border-border hover:bg-card/80">
							<CardHeader className="pb-3">
								<div className="mb-3 flex items-start justify-between">
									{doc.icon ? (
										<div className="rounded-lg bg-secondary p-2 transition-colors group-hover:bg-accent">
											<Icon iconName={doc.icon} className="h-5 w-5 text-foreground" />
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
								<CardTitle className="text-lg text-foreground transition-colors group-hover:text-primary">
									{doc.title}
								</CardTitle>
							</CardHeader>
							<CardContent className="pt-0">
								<CardDescription className="mb-4 text-sm leading-relaxed text-muted-foreground">
									{doc.excerpt}
								</CardDescription>
								<div className="flex items-center justify-between">
									<span className="text-xs text-muted-foreground">
										Updated{' '}
										{new Date(doc?.publishedAt || '').toLocaleDateString('de-DE', {
											month: 'short',
											day: 'numeric',
											year: 'numeric',
										})}
									</span>
									<Icon
										iconName="arrowRight"
										className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-foreground"
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
