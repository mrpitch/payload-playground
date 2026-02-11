import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { Footer } from '@/components/layout/footer'
import {
	DashboardNavApp,
	DashboardNavAppSkeleton,
	ThreedotsNav,
	ThreedotsNavSkeleton,
} from '@/components/layout/nav'
import { NavigationProvider } from '@/components/layout/nav/nav-provider.server'
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
import { getSession } from '@/lib/actions/get-session'
import { getNavData } from '@/lib/utils/navigation'

export default async function Layout({ children }: { children: React.ReactNode }) {
	const navData = await getNavData()
	const { settings } = navData

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
				<header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
					<SidebarTrigger className="-ml-1 text-foreground" />
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
				<div className="flex flex-1 flex-col gap-4 p-4 md:pl-24">{children}</div>
				<Suspense fallback={null}>
					<NavigationProvider>
						<Footer siteName={settings?.siteName} />
					</NavigationProvider>
				</Suspense>
			</SidebarInset>
		</SidebarProvider>
	)
}
