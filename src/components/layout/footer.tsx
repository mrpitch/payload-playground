import Link from 'next/link'

import { Container } from '@/components/ui/custom/container'
import { Typography, typographyVariants } from '@/components/ui/custom/typography'

import type { Menu } from '@payload-types'

interface FooterProps {
	siteName?: string
	siteDescription?: string
	navigation?: Menu['menuItems'] | null
}

// Helper function to get the correct href for menu items
function getMenuItemHref(item: NonNullable<Menu['menuItems']>[0]): string {
	if (!item?.link) return '#'

	const { type, pages, docs, url } = item.link

	switch (type) {
		case 'pages':
			return pages || '#'
		case 'docs':
			return docs || '#'
		case 'url':
			return url || '#'
		case 'nolink':
		case 'folder':
		default:
			return '#'
	}
}

export const Footer: React.FC<FooterProps> = ({ siteName, navigation }) => {
	return (
		<Container as="footer">
			<div className="mx-auto max-w-screen-2xl">
				<div className="flex flex-col space-y-4 md:flex-row md:justify-between md:space-y-0">
					<Typography as="p" size="xs" className="w-auto">
						&copy; {new Date().getFullYear()} {siteName}
					</Typography>
					<nav className="flex gap-4">
						{navigation?.map((item, index) => (
							<Link
								key={index}
								href={getMenuItemHref(item)}
								className={`underline hover:no-underline ${typographyVariants({ size: 'xs' })}`}
							>
								{item.link?.label || 'Link'}
							</Link>
						))}
					</nav>
				</div>
			</div>
		</Container>
	)
}
