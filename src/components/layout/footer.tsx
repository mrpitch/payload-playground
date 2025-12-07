'use client'

import Link from 'next/link'

import { Container } from '@/components/ui/custom/container'
import { Typography, typographyVariants } from '@/components/ui/custom/typography'
import { Icon } from '@/components/ui/custom/icons'
import { cn } from '@/lib/utils/cn'
import { useNavigation, NavigationType } from '@/lib/hooks/use-navigation'

type FooterProps = {
	siteName?: string
}

export function Footer({ siteName }: FooterProps) {
	const { footerNav } = useNavigation(NavigationType.FooterNav)

	return (
		<Container as="footer">
			<div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
				<Typography as="p" size="xs" className="w-auto">
					&copy; {new Date().getFullYear()} {siteName}
				</Typography>
				<nav className="flex flex-wrap items-center gap-x-4 gap-y-2">
					{footerNav.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								typographyVariants({ size: 'xs' }),
								'text-muted-foreground hover:text-foreground flex items-center gap-1 underline decoration-dotted underline-offset-4 transition hover:no-underline',
							)}
						>
							{item.icon ? (
								<Icon iconName={item.icon} className="h-4 w-4" aria-hidden="true" />
							) : null}
							<span>{item.label}</span>
						</Link>
					))}
				</nav>
			</div>
		</Container>
	)
}
