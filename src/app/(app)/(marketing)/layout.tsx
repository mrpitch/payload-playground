// import { unstable_cache } from 'next/cache'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getPayloadSession } from 'payload-authjs'

import { siteConfig } from '@/lib/config'

import { getGlobals } from '@/lib/utils/getGlobals'

import { SignInButton } from '../_components/signin-button'
import { SignOutButton } from '../_components/signout-button'

import { Logo } from '@/components/ui/logo'
import { Footer } from '@/app/_components/footer'
import { MainNav, DrawerNav } from '@/app/_components/navigation'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export default async function RootLayout({ children }: { children: React.JSX.Element }) {
	const appShell = await getGlobals('app-shell')
	if (!appShell) {
		notFound()
	}
	const { mainNavigation, settings, legalNavigation } = appShell

	const payloadSession = await getPayloadSession()

	return (
		<div className="flex h-screen flex-col">
			<header className="flex items-center justify-between border-b border-foreground-light bg-background px-8 py-2">
				<div className="flex gap-6 md:gap-10">
					<Link href="/" passHref>
						<Logo className="text-foreground" name={siteConfig.name} />
					</Link>
					<MainNav items={mainNavigation?.navItems} />
				</div>
				<div className="flex flex-1 items-center justify-end">
					<ThemeToggle />
					<DrawerNav items={siteConfig.mainNav} />
				</div>
			</header>
			<main className="p-8">
				<div className="mb-8 mt-8">
					{payloadSession ? <Link href="/logout">Logout</Link> : <Link href="/login">Login</Link>}

					<h3>Payload CMS Session</h3>
					<pre>{JSON.stringify(payloadSession, null, 2)}</pre>
				</div>
				<div>{children}</div>
			</main>
			<Footer siteName={settings?.siteName} legalNavigation={legalNavigation?.navItems} />
		</div>
	)
}
