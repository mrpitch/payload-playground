import { notFound } from 'next/navigation'

import { getNavData } from '@/lib/utils/getNavData'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'

export default async function RootLayout({ children }: { children: React.JSX.Element }) {
	const navData = await getNavData()
	if (!navData) {
		notFound()
	}
	const { settings, mainNav, footerNav } = navData

	return (
		<div className="flex h-screen flex-col">
			<Header siteName={settings?.siteName} />
			<main>{children}</main>
			<Footer siteName={settings?.siteName} navigation={footerNav?.menuItems} />
		</div>
	)
}
