import { notFound, redirect } from 'next/navigation'

import { getSession } from '@/lib/actions/get-session'
import { getGlobals } from '@/lib/utils/getGlobals'
import type { AppShell } from '@payload-types'

import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { SidebarNavApp, SidebarNavAppSkeleton } from '@/components/layout/nav/sidebar-nav-app'

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { ThreedotsNav, ThreedotsNavSkeleton } from '@/components/layout/nav/threedots-nav'
import { Footer } from '@/app/_components/footer'
import { Suspense } from 'react'
import { NavProviderServer } from '@/components/utils/nav-provider.server'

export default async function Layout({ children }: { children: React.ReactNode }) {
	const appShell = (await getGlobals('app-shell')) as AppShell
	if (!appShell) {
		notFound()
	}
	const { profileNavigation, sideBarNavigation, legalNavigation, settings, mainNavigation } =
		appShell

	const user = await getSession()
	if (!user) {
		redirect('/login')
	}
	return (
		<SidebarProvider defaultOpen={false}>
			<Suspense fallback={<SidebarNavAppSkeleton />}>
				<NavProviderServer>
					<SidebarNavApp user={user} />
				</NavProviderServer>
			</Suspense>
			<SidebarInset>
				<header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
					<SidebarTrigger className="-ml-1" />
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
							<NavProviderServer>
								<ThreedotsNav user={user} context="app" />
							</NavProviderServer>
						</Suspense>
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
				<Footer siteName={settings?.siteName} legalNavigation={legalNavigation?.navItems} />
			</SidebarInset>
		</SidebarProvider>
	)
}
