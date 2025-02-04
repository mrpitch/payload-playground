import Link from 'next/link'
import { notFound } from 'next/navigation'

import { siteConfig } from '@/lib/config'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Container } from '@/components/ui/container'
import { Logo } from '@/components/ui/logo'
import { MainNav, DrawerNav } from '@/app/_components/navigation'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Typography } from '@/components/ui/typography'

export default async function RootLayout({ children }: { children: React.JSX.Element }) {
	const payload = await getPayload({ config: configPromise })
	const appShell = await payload.findGlobal({ slug: 'app-shell', draft: false })

	if (!appShell) {
		notFound()
	}
	const { mainNavigation } = appShell

	return (
		<div className="flex h-screen flex-col">
			<header className="flex items-center justify-between border-b border-foreground-light bg-background px-8 py-2">
				<div className="flex gap-6 md:gap-10">
					<Link href="/" passHref>
						<Logo className="text-foreground" name={siteConfig.name} />
					</Link>
					<MainNav items={mainNavigation?.navItems} />
				</div>
				<div className="flex flex-1 items-center justify-end">
					<ThemeToggle />
					<DrawerNav items={siteConfig.mainNav} />
				</div>
			</header>
			<main className="flex flex-1 overflow-y-auto p-8">{children}</main>
			<footer className="py-4">
				<Container as="div" className="flex w-full">
					<Typography as="p" size="xs">
						&copy; {new Date().getFullYear()} {siteConfig.name}
					</Typography>
				</Container>
			</footer>
		</div>
	)
}
