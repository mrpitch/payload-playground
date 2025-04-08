// import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'

import { getGlobals } from '@/lib/utils/getGlobals'

import type { AppShell } from '@payload-types'

import { Footer } from '@/app/_components/footer'
import { Header } from '@/app/_components/header'

export default async function RootLayout({ children }: { children: React.JSX.Element }) {
	const appShell = (await getGlobals('app-shell')) as AppShell
	if (!appShell) {
		notFound()
	}
	const { mainNavigation, settings, legalNavigation, profileNavigation } = appShell

	return (
		<div className="flex h-screen flex-col">
			<Header mainNavigation={mainNavigation} profileNavigation={profileNavigation} />
			<main>{children}</main>
			<Footer siteName={settings?.siteName} legalNavigation={legalNavigation?.navItems} />
		</div>
	)
}
