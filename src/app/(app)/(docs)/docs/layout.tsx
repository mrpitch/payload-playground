import { notFound } from 'next/navigation'

import { getSession } from '@/lib/actions/get-session'
import { getGlobals } from '@/lib/utils/getGlobals'
import type { AppShell } from '@payload-types'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import { DocsNavApp, DocsNavAppSkeleton } from '@/components/layout/nav'
import { NavigationProvider } from '@/components/utils/nav-provider.server'
import { Suspense } from 'react'
import { Footer } from '@/components/layout/footer'

export default async function Layout({ children }: { children: React.ReactNode }) {
	const appShell = (await getGlobals('app-shell')) as AppShell
	if (!appShell) {
		notFound()
	}
	// appShell fetched to ensure existence; navigation is provided via NavProviderServer

	const user = await getSession()

	return (
		<SidebarProvider defaultOpen={false}>
			<Suspense fallback={<DocsNavAppSkeleton />}>
				<NavigationProvider>
					<DocsNavApp user={user} />
				</NavigationProvider>
			</Suspense>
			<SidebarInset>
				{children}
				<Footer />
			</SidebarInset>
		</SidebarProvider>
	)
}
