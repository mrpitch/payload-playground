import Link from 'next/link'

import { Container } from '@/components/ui/custom/container'
import { Typography, typographyVariants } from '@/components/ui/custom/typography'
import { AppShell } from '@/payload/payload-types'
import { getGlobals } from '@/lib/utils/getGlobals'

export async function Footer() {
	const appShell = (await getGlobals('app-shell')) as AppShell

	const { settings, legalNavigation } = appShell
	return (
		<Container as="footer">
			<div className="mx-auto max-w-screen-2xl">
				<div className="flex flex-col space-y-4 md:flex-row md:justify-between md:space-y-0">
					<Typography as="p" size="xs" className="w-auto">
						&copy; {new Date().getFullYear()} {settings?.siteName}
					</Typography>
					<nav className="flex gap-4">
						{legalNavigation?.navItems?.map((item) => (
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
