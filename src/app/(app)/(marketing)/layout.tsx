import { Suspense } from 'react'

import { getNavData } from '@/lib/utils/navigation'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { NavigationProvider } from '@/components/layout/nav/nav-provider.server'

export default async function RootLayout({ children }: { children: React.JSX.Element }) {
	const navData = await getNavData()
	const { settings } = navData

	return (
		<div className="flex h-screen flex-col">
			<Header siteName={settings?.siteName} />
			<main>{children}</main>
			<Suspense fallback={null}>
				<NavigationProvider>
					<Footer siteName={settings?.siteName} />
				</NavigationProvider>
			</Suspense>
		</div>
	)
}
