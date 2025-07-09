import { AppSidebar } from '@/app/_components/navigation/sidebar-nav1'

import { Container } from '@/components/ui/custom/container'
import { SidebarProvider } from '@/components/ui/sidebar'

export default async function RootLayout({ children }: { children: React.JSX.Element }) {
	return (
		<Container>
			<div className="flex min-h-screen">
				<aside className="border-foreground-light sticky top-[60px] mt-4 hidden w-auto self-start border-r px-4 md:block">
					<SidebarProvider>
						<AppSidebar />
					</SidebarProvider>
				</aside>
				{children}
			</div>
		</Container>
	)
}
