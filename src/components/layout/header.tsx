import Link from 'next/link'
import { draftMode } from 'next/headers'

import { getSession } from '@/lib/actions/get-session'

import { Container } from '@/components/ui/custom/container'
import { Logo } from '@/components/ui/custom/logo'
import { MainNav, MainNavSkeleton } from '@/components/layout/nav'
import { DisablePreviewButton } from '@/components/ui/custom/disable-preview-button'
import { ThreedotsNav, ThreedotsNavSkeleton } from '@/components/layout/nav/threedots-nav'
import { Suspense } from 'react'
import { NavigationProvider } from '@/components/layout/nav/nav-provider.server'

interface HeaderProps {
	siteName?: string
}

export async function Header({ siteName }: HeaderProps) {
	const user = await getSession()
	const { isEnabled } = await draftMode()

	return (
		<div className="bg-background sticky top-0 z-50 w-full border-b">
			<Container as="header">
				<div className="flex w-full items-center justify-between py-2">
					<div className="flex gap-6 md:gap-10">
						<Link href="/" passHref>
							<Logo className="text-foreground -ml-1" name={siteName} />
						</Link>
						<Suspense fallback={<MainNavSkeleton />}>
							<NavigationProvider>
								<MainNav />
							</NavigationProvider>
						</Suspense>
					</div>
					<div className="flex items-center justify-end">
						<Suspense fallback={<ThreedotsNavSkeleton />}>
							<NavigationProvider>
								<ThreedotsNav user={user} context="marketing" />
							</NavigationProvider>
						</Suspense>
						{isEnabled ? <DisablePreviewButton /> : null}
					</div>
				</div>
			</Container>
		</div>
	)
}
