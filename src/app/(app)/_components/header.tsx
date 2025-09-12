import Link from 'next/link'
import { draftMode } from 'next/headers'

import { siteConfig } from '@/lib/config'
import { getSession } from '@/lib/actions/get-session'

import type { AppShell } from '@payload-types'

import { Container } from '@/components/ui/custom/container'
import { Logo } from '@/components/ui/custom/logo'
import { MainNav, DrawerNav, ProfileNav } from '@/app/_components/navigation'
import { DisablePreviewButton } from '@/components/ui/custom/disable-preview-button'
import { NavThreedots } from '@/app/_components/nav-threedots'

interface HeaderProps {
	mainNavigation?: AppShell['mainNavigation']
	profileNavigation?: AppShell['profileNavigation']
}

export async function Header({ mainNavigation, profileNavigation }: HeaderProps) {
	const user = await getSession()
	const { isEnabled } = await draftMode()

	return (
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
						<NavThreedots
							profileItems={profileNavigation?.navItems ?? undefined}
							mainItems={mainNavigation?.navItems ?? undefined}
							user={user}
						/>
						{isEnabled ? <DisablePreviewButton /> : null}
					</div>
				</div>
			</Container>
		</div>
	)
}
