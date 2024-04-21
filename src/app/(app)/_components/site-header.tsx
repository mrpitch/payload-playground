import Link from 'next/link'

import { cn } from '@/lib/utils/cn'
import { siteConfig } from '@/lib/config'

import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Logo } from '@/components/ui/logo'
import { MainNav, DrawerNav } from '@/app/_components/navigation'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export const SiteHeader = async () => {
	return (
		<header className="sticky top-0 z-40 w-full border-b bg-background">
			<Container className="flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
				<div className="flex gap-6 md:gap-10">
					<Link href="/" passHref>
						<Logo className="text-foreground" name={siteConfig.name} />
					</Link>
					<MainNav items={siteConfig.mainNav} />
				</div>
				<div className="flex flex-1 items-center justify-end ">
					<ThemeToggle />
					<DrawerNav items={siteConfig.mainNav} />
				</div>
			</Container>
		</header>
	)
}
