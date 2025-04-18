import Link from 'next/link'

import { Container } from '@/components/ui/custom/container'
import { Typography, typographyVariants } from '@/components/ui/custom/typography'

interface INavItem {
	label: string
	href: string
}

interface FooterProps {
	siteName?: string
	siteDescription?: string
	legalNavigation?: INavItem[] | null
}

export const Footer: React.FC<FooterProps> = ({ siteName, legalNavigation }) => {
	return (
		<Container as="footer">
			<div className="mx-auto max-w-screen-2xl">
				<div className="flex flex-col space-y-4 md:flex-row md:justify-between md:space-y-0">
					<Typography as="p" size="xs" className="w-auto">
						&copy; {new Date().getFullYear()} {siteName}
					</Typography>
					<nav className="flex gap-4">
						{legalNavigation?.map((item) => (
							<Link
								key={item.label}
								href={item.href}
								className={`underline hover:no-underline ${typographyVariants({ size: 'xs' })}`}
							>
								{item.label}
							</Link>
						))}
					</nav>
				</div>
			</div>
		</Container>
	)
}
