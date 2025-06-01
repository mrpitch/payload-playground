'use client'
import Link from 'next/link'

import { AppShell } from '@payload-types'

import { Button } from '@/components/ui/button'
import { Icon, IconType } from '@/components/ui/custom/icons'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export interface IDrawerNavProps {
	items?: INavItem[]
	className?: string
}

export interface INavItem {
	label: string
	href?: string
	icon?: NonNullable<NonNullable<AppShell['sideBarNavigation']>['navItems']>[number]['icon']
}

export const DrawerNav: React.FC<IDrawerNavProps> = ({ items }) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size="icon" variant="neutral" className="md:hidden">
					<Icon iconName="menu" className="h-5 w-5" />
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="right" className="pt-0 sm:max-w-xs">
				<nav className="grid gap-6 pt-16">
					{items?.map((item, index) => {
						return (
							<Link
								key={index}
								href={item.href as string}
								className="text-foreground hover:text-foreground-dark flex items-center gap-4 px-2.5"
							>
								{item.icon ? (
									<Icon iconName={item.icon as IconType} className="h-5 w-5" aria-hidden="true" />
								) : null}
								{item.label}
							</Link>
						)
					})}
				</nav>
			</SheetContent>
		</Sheet>
	)
}
