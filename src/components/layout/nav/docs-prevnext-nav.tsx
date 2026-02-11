import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Icon } from '@/components/ui/custom/icons'

import type { FlatDoc } from '@/lib/utils/navigation'

export async function DocsPrevNextNav({
	previous,
	next,
}: {
	previous: FlatDoc | null
	next: FlatDoc | null
}) {
	return (
		<div className="mt-12 grid grid-cols-1 gap-4 border-t border-border pt-8 md:grid-cols-2">
			{/* Previous Link */}
			<div className="flex">
				{previous ? (
					<Link href={previous.href} className="w-full">
						<Card className="group h-full cursor-pointer border-border/50 transition-all duration-200 hover:border-border hover:bg-card/80">
							<CardContent className="p-6">
								<div className="flex items-center gap-3">
									<Icon
										iconName="arrowLeft"
										className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-all group-hover:-translate-x-1 group-hover:text-foreground"
									/>
									<div className="flex flex-col gap-1">
										<span className="text-xs tracking-wide text-muted-foreground uppercase">
											Previous
										</span>
										<span className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
											{previous.label}
										</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</Link>
				) : (
					<div className="w-full" />
				)}
			</div>

			{/* Next Link */}
			<div className="flex">
				{next ? (
					<Link href={next.href} className="w-full">
						<Card className="group h-full cursor-pointer border-border/50 transition-all duration-200 hover:border-border hover:bg-card/80">
							<CardContent className="p-6">
								<div className="flex items-center justify-end gap-3">
									<div className="flex flex-col gap-1 text-right">
										<span className="text-xs tracking-wide text-muted-foreground uppercase">
											Next
										</span>
										<span className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
											{next.label}
										</span>
									</div>
									<Icon
										iconName="arrowRight"
										className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-foreground"
									/>
								</div>
							</CardContent>
						</Card>
					</Link>
				) : (
					<div className="w-full" />
				)}
			</div>
		</div>
	)
}
