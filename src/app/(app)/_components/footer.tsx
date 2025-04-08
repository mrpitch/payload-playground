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
		<Container as="footer" className="py-4">
			<div className="flex">
				<Typography as="p" size="xs">
					&copy; {new Date().getFullYear()} {siteName}
				</Typography>
				<nav className="ml-8 flex gap-4">
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
		</Container>
	)
}
