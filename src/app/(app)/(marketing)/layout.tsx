// import { unstable_cache } from 'next/cache'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { siteConfig } from '@/lib/config'
import { getSession } from '@/lib/actions/get-session'

import { getGlobals } from '@/lib/utils/getGlobals'

import type { AppShell } from '@payload-types'

import { Logo } from '@/components/ui/custom/logo'
import { Footer } from '@/app/_components/footer'
import { MainNav, DrawerNav, ProfileNav } from '@/app/_components/navigation'
import { ThemeToggle } from '@/components/ui/custom/theme-toggle'

export default async function RootLayout({ children }: { children: React.JSX.Element }) {
	const appShell = (await getGlobals('app-shell')) as AppShell
	if (!appShell) {
		notFound()
	}
	const { mainNavigation, settings, legalNavigation, profileNavigation } = appShell

	const user = await getSession()

	return (
		<div className="flex h-screen flex-col">
			<header className="border-foreground-light bg-background flex items-center justify-between border-b px-2 py-2">
				<div className="flex gap-6 md:gap-10">
					<Link href="/" passHref>
						<Logo className="text-foreground" name={siteConfig.name} />
					</Link>
					<MainNav items={mainNavigation?.navItems} />
				</div>
				<div className="flex items-center justify-end">
					<ProfileNav items={profileNavigation?.navItems ?? undefined} user={user} />
					<ThemeToggle />
					<DrawerNav items={mainNavigation?.navItems ?? undefined} />
				</div>
			</header>
			<main>{children}</main>
			<Footer siteName={settings?.siteName} legalNavigation={legalNavigation?.navItems} />
		</div>
	)
}
