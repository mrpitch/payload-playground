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
		<div className="border-border mt-12 grid grid-cols-1 gap-4 border-t pt-8 md:grid-cols-2">
			{/* Previous Link */}
			<div className="flex">
				{previous ? (
					<Link href={previous.href} className="w-full">
						<Card className="group hover:bg-card/80 border-border/50 hover:border-border h-full cursor-pointer transition-all duration-200">
							<CardContent className="p-6">
								<div className="flex items-center gap-3">
									<Icon
										iconName="arrowLeft"
										className="text-muted-foreground group-hover:text-foreground h-5 w-5 flex-shrink-0 transition-all group-hover:-translate-x-1"
									/>
									<div className="flex flex-col gap-1">
										<span className="text-muted-foreground text-xs tracking-wide uppercase">
											Previous
										</span>
										<span className="text-foreground group-hover:text-primary text-sm font-medium transition-colors">
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
						<Card className="group hover:bg-card/80 border-border/50 hover:border-border h-full cursor-pointer transition-all duration-200">
							<CardContent className="p-6">
								<div className="flex items-center justify-end gap-3">
									<div className="flex flex-col gap-1 text-right">
										<span className="text-muted-foreground text-xs tracking-wide uppercase">
											Next
										</span>
										<span className="text-foreground group-hover:text-primary text-sm font-medium transition-colors">
											{next.label}
										</span>
									</div>
									<Icon
										iconName="arrowRight"
										className="text-muted-foreground group-hover:text-foreground h-5 w-5 flex-shrink-0 transition-all group-hover:translate-x-1"
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
