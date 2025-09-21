import Link from 'next/link'
import { draftMode } from 'next/headers'

import { siteConfig } from '@/lib/config'
import { getSession } from '@/lib/actions/get-session'

import type { AppShell } from '@payload-types'

import { Container } from '@/components/ui/custom/container'
import { Logo } from '@/components/ui/custom/logo'
import { MainNav } from '@/app/_components/navigation'
import { DisablePreviewButton } from '@/components/ui/custom/disable-preview-button'
import { ThreedotsNav } from '@/components/layout/nav/threedots-nav'
import { NavigationProvider } from '@/components/utils/nav-provider'
import { getGlobals } from '@/lib/utils/getGlobals'

export async function Header() {
	const user = await getSession()
	const { isEnabled } = await draftMode()
	const appShell = (await getGlobals('app-shell')) as AppShell

	const { mainNavigation, profileNavigation } = appShell

	return (
		<NavigationProvider data={{ mainNav: mainNavigation, userNav: profileNavigation }}>
			<div className="bg-background sticky top-0 z-50 w-full border-b">
				<Container as="header">
					<div className="flex w-full items-center justify-between py-2">
						<div className="flex gap-6 md:gap-10">
							<Link href="/" passHref>
								<Logo className="text-foreground -ml-1" name={siteConfig.name} />
							</Link>
							<MainNav items={mainNavigation?.navItems} />
						</div>
						<div className="flex items-center justify-end">
							<ThreedotsNav user={user} context="marketing" />
							{isEnabled ? <DisablePreviewButton /> : null}
						</div>
					</div>
				</Container>
			</div>
		</NavigationProvider>
	)
}
