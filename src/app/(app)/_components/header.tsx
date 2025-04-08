import Link from 'next/link'

import { siteConfig } from '@/lib/config'
import { getSession } from '@/lib/actions/get-session'

import type { AppShell } from '@payload-types'

import { Container } from '@/components/ui/custom/container'
import { Logo } from '@/components/ui/custom/logo'
import { MainNav, DrawerNav, ProfileNav } from '@/app/_components/navigation'
import { ThemeToggle } from '@/components/ui/custom/theme-toggle'

interface HeaderProps {
	mainNavigation?: AppShell['mainNavigation']
	profileNavigation?: AppShell['profileNavigation']
}

export async function Header({ mainNavigation, profileNavigation }: HeaderProps) {
	const user = await getSession()

	return (
		<div className="border-foreground-light bg-background w-full border-b">
			<Container as="header">
				<div className="flex w-full items-center justify-between px-2 py-2">
					<div className="flex gap-6 md:gap-10">
						<Link href="/" passHref>
							<Logo className="text-foreground" name={siteConfig.name} />
						</Link>
						<MainNav items={mainNavigation?.navItems} />
					</div>
					<div className="flex items-center justify-end">
						<ProfileNav items={profileNavigation?.navItems ?? undefined} user={user} />
						<ThemeToggle />
						<DrawerNav items={mainNavigation?.navItems ?? undefined} />
					</div>
				</div>
			</Container>
		</div>
	)
}
