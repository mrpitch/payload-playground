import { SiteHeader } from '@/app/_components/site-header'
import { SiteFooter } from '@/app/_components/site-footer'

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<SiteHeader />
			{children}
			<SiteFooter />
		</>
	)
}
