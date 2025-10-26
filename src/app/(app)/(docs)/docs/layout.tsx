import { Suspense } from 'react'

import { getSession } from '@/lib/actions/get-session'
import { getNavData } from '@/lib/utils/navigation'

import { SidebarProvider } from '@/components/ui/sidebar'

import { DocsNavApp, DocsNavAppSkeleton } from '@/components/layout/nav'
import { SidebarWrapper } from '@/components/layout/nav/sidebar-wrapper'
import { NavigationProvider } from '@/components/utils/nav-provider.server'
import { Footer } from '@/components/layout/footer'

export default async function Layout({ children }: { children: React.ReactNode }) {
	const navData = await getNavData()
	const { settings } = navData

	const user = await getSession()

	return (
		<SidebarProvider defaultOpen={true}>
			<Suspense fallback={<DocsNavAppSkeleton />}>
				<NavigationProvider>
					<DocsNavApp user={user} />
				</NavigationProvider>
			</Suspense>
			<SidebarWrapper>
				{children}
				<Suspense fallback={null}>
					<NavigationProvider>
						<Footer siteName={settings?.siteName} />
					</NavigationProvider>
				</Suspense>
			</SidebarWrapper>
		</SidebarProvider>
	)
}
