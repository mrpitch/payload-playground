import { draftMode } from 'next/headers'
import Link from 'next/link'
import { Suspense } from 'react'

import { MainNav, MainNavSkeleton } from '@/components/layout/nav'
import { NavigationProvider } from '@/components/layout/nav/nav-provider.server'
import { ThreedotsNav, ThreedotsNavSkeleton } from '@/components/layout/nav/threedots-nav'
import { Container } from '@/components/ui/custom/container'
import { DisablePreviewButton } from '@/components/ui/custom/disable-preview-button'
import { Logo } from '@/components/ui/custom/logo'
import { getSession } from '@/lib/actions/get-session'

interface HeaderProps {
	siteName?: string
}

export async function Header({ siteName }: HeaderProps) {
	const user = await getSession()
	const { isEnabled } = await draftMode()

	return (
		<div className="sticky top-0 z-50 w-full border-b bg-background">
			<Container as="header">
				<div className="flex w-full items-center justify-between py-2">
					<div className="flex gap-6 md:gap-10">
						<Link href="/" passHref>
							<Logo className="-ml-1 text-foreground" name={siteName} />
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
