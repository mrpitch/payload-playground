import { siteConfig } from '@/lib/config'

import { getPayloadSession } from 'payload-authjs'

import { Logo } from '@/components/ui/logo'
import { SideBarNav, ProfileNav, DrawerNav } from '@/app/_components/navigation'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Typography } from '@/components/ui/typography'
import { redirect } from 'next/navigation'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const payloadSession = await getPayloadSession()
	const user = payloadSession?.user ?? null
	if (!user) {
		redirect('/login')
	}
	return (
		<div className="flex h-screen flex-col">
			<header className="flex items-center justify-between border-b border-foreground-light bg-background py-2">
				<Logo className="ml-2 text-foreground" name={siteConfig.name} />
				<div className="flex items-center justify-end">
					<ProfileNav items={siteConfig.profileNav} user={user} />
					<ThemeToggle />
					<DrawerNav items={siteConfig.sideBarNav} />
				</div>
			</header>
			<div className="flex flex-1 overflow-hidden">
				<aside className="mt-4 hidden h-screen w-14 self-start overflow-y-auto border-r border-foreground-light px-4 md:block">
					<SideBarNav items={siteConfig.sideBarNav} />
				</aside>
				<div className="flex flex-1 overflow-y-auto p-8">{children}</div>
			</div>
			<footer className="mt-4 flex border-t border-foreground-light bg-background px-4 py-4">
				<Typography as="p" size="xs">
					&copy; {new Date().getFullYear()} {siteConfig.name}
				</Typography>
			</footer>
		</div>
	)
}
