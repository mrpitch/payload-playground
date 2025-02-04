import Link from 'next/link'

import { Typography, typographyVariants } from '@/components/ui/typography'

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
		<footer className="px-8 py-4">
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
		</footer>
	)
}
