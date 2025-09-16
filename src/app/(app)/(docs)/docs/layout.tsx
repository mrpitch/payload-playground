import { AppSidebar } from '@/app/_components/navigation/sidebar-nav1'

import { Container } from '@/components/ui/custom/container'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'

export default async function RootLayout({ children }: { children: React.JSX.Element }) {
	return (
		// <Container>
		<div className="flex min-h-screen">
			<SidebarProvider>
				{/* <aside className="sticky top-[60px] mt-4 block w-auto self-start">
						
					</aside> */}
				<AppSidebar />
				{children}
			</SidebarProvider>
		</div>
		// </Container>
	)
}
