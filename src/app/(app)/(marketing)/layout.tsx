// import { unstable_cache } from 'next/cache'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { siteConfig } from '@/lib/config'

import { getGlobals } from '@/lib/utils/getGlobals'

import { Logo } from '@/components/ui/logo'
import { Footer } from '@/app/_components/footer'
import { MainNav, DrawerNav } from '@/app/_components/navigation'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export default async function RootLayout({ children }: { children: React.JSX.Element }) {
	const appShell = await getGlobals('app-shell')
	if (!appShell) {
		notFound()
	}
	const { mainNavigation, settings, legalNavigation } = appShell

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
			<Footer siteName={settings?.siteName} legalNavigation={legalNavigation?.navItems} />
		</div>
	)
}
