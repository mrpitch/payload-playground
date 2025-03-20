import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

import { getSession } from '@/lib/actions/get-session'
import { siteConfig } from '@/lib/config'
import { getGlobals } from '@/lib/utils/getGlobals'

import { Footer } from '../_components/footer'
import { Logo } from '@/components/ui/custom/logo'
import { SideBarNav, ProfileNav, DrawerNav } from '@/app/_components/navigation'
import { ThemeToggle } from '@/components/ui/custom/theme-toggle'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const appShell = await getGlobals('app-shell')
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
			<header className="border-foreground-light bg-background flex items-center justify-between border-b py-2">
				<Link href="/" passHref>
					<Logo className="text-foreground" name={siteConfig.name} />
				</Link>
				<div className="flex items-center justify-end">
					<ProfileNav items={profileNavigation?.navItems ?? undefined} user={user} />
					<ThemeToggle />
					<DrawerNav items={sideBarNavigation?.navItems ?? undefined} />
				</div>
			</header>
			<div className="flex flex-1 overflow-hidden">
				<aside className="border-foreground-light mt-4 hidden h-screen w-14 self-start overflow-y-auto border-r px-4 md:block">
					<SideBarNav items={sideBarNavigation?.navItems ?? undefined} />
				</aside>
				<div className="flex flex-1 overflow-y-auto p-8">{children}</div>
			</div>
			<Footer siteName={settings?.siteName} legalNavigation={legalNavigation?.navItems} />
		</div>
	)
}
