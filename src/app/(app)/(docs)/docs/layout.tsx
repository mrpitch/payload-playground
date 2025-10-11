import { getSession } from '@/lib/actions/get-session'
import { getNavData } from '@/lib/utils/getNavData'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import { DocsNavApp, DocsNavAppSkeleton } from '@/components/layout/nav'
import { NavigationProvider } from '@/components/utils/nav-provider.server'
import { Suspense } from 'react'
import { Footer } from '@/components/layout/footer'

export default async function Layout({ children }: { children: React.ReactNode }) {
	const navData = await getNavData()
	const { settings, footerNav } = navData

	const user = await getSession()

	return (
		<SidebarProvider defaultOpen={true}>
			<Suspense fallback={<DocsNavAppSkeleton />}>
				<NavigationProvider>
					<DocsNavApp user={user} />
				</NavigationProvider>
			</Suspense>
			<SidebarInset>
				{children}
				<Footer siteName={settings?.siteName} navigation={footerNav?.menuItems} />
			</SidebarInset>
		</SidebarProvider>
	)
}
