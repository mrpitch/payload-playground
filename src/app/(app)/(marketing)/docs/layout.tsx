import { AppSidebar } from '@/app/_components/navigation/sidebar-nav1'
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
import { SideBarNav } from '../../_components/navigation/sidebar-nav'

export default async function RootLayout({ children }: { children: React.JSX.Element }) {
	return (
		<SidebarProvider>
			<div className="flex flex-1">
				<aside className="border-foreground-light mt-4 hidden w-auto border-r px-4 md:block">
					<div className="sticky top-15 h-screen">
						<AppSidebar />
					</div>
				</aside>
				<div className="flex flex-1">{children}</div>
			</div>
		</SidebarProvider>
	)
}
