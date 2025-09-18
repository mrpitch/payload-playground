import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

import { getSession } from '@/lib/actions/get-session'
import { siteConfig } from '@/lib/config'
import { getGlobals } from '@/lib/utils/getGlobals'
import type { AppShell } from '@payload-types'

import { Footer } from '../_components/footer'
import { Logo } from '@/components/ui/custom/logo'
import { SideBarNav, ProfileNav, DrawerNav } from '@/app/_components/navigation'
import { NavThreedots } from '../../../components/layout/nav/threedots-nav'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const appShell = (await getGlobals('app-shell')) as AppShell
	if (!appShell) {
		notFound()
	}
	const { settings, legalNavigation, profileNavigation, sideBarNavigation } = appShell

	const user = await getSession()
	if (!user) {
		redirect('/login')
	}
	return (
		<div className="flex h-screen flex-col">
			<header className="bg-background flex items-center justify-between border-b py-2">
				<Link href="/">
					<Logo className="text-foreground" name={siteConfig.name} />
				</Link>
				<div className="flex items-center justify-end">
					<NavThreedots
						profileItems={profileNavigation?.navItems ?? undefined}
						mainItems={sideBarNavigation?.navItems ?? undefined}
						user={user}
					/>
				</div>
			</header>
			<div className="flex flex-1 overflow-hidden">
				<aside className="mt-4 hidden h-screen w-14 self-start overflow-y-auto border-r px-4 md:block">
					<SideBarNav items={sideBarNavigation?.navItems ?? undefined} />
				</aside>
				<div className="flex flex-1 overflow-y-auto p-8">{children}</div>
			</div>
			<Footer siteName={settings?.siteName} legalNavigation={legalNavigation?.navItems} />
		</div>
	)
}
