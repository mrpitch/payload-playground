import { Suspense } from 'react'
import { notFound, redirect } from 'next/navigation'

import type { AppShell } from '@payload-types'

import { getSession } from '@/lib/actions/get-session'
import { getGlobals } from '@/lib/utils/getGlobals'
import { NavigationProvider } from '@/components/utils/nav-provider.server'

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import {
	DashboardNavApp,
	DashboardNavAppSkeleton,
	ThreedotsNav,
	ThreedotsNavSkeleton,
} from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'

export default async function Layout({ children }: { children: React.ReactNode }) {
	const appShell = (await getGlobals('app-shell')) as AppShell
	if (!appShell) {
		notFound()
	}
	const { legalNavigation, settings } = appShell

	const user = await getSession()
	if (!user) {
		redirect('/login')
	}
	return (
		<SidebarProvider defaultOpen={false}>
			<Suspense fallback={<DashboardNavAppSkeleton />}>
				<NavigationProvider>
					<DashboardNavApp user={user} />
				</NavigationProvider>
			</Suspense>
			<SidebarInset>
				<header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
					<SidebarTrigger className="text-foreground -ml-1" />
					<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage>Inbox</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
					<div className="ml-auto">
						<Suspense fallback={<ThreedotsNavSkeleton />}>
							<NavigationProvider>
								<ThreedotsNav user={user} context="app" />
							</NavigationProvider>
						</Suspense>
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
				<Footer siteName={settings?.siteName} />
			</SidebarInset>
		</SidebarProvider>
	)
}
