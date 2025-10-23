'use client'

import Link from 'next/link'

import { Skeleton } from '@/components/ui/skeleton'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Icon } from '@/components/ui/custom/icons'
import { useNavigation, NavigationType } from '@/lib/hooks/use-navigation'
import { cn } from '@/lib/utils/cn'

export const MainNav = () => {
	const { mainNav } = useNavigation(NavigationType.MainNav)

	if (!mainNav.length) {
		return null
	}

	return (
		<NavigationMenu className="hidden md:flex">
			<NavigationMenuList>
				{mainNav.map((entry, index) => {
					if (entry.type === 'group') {
						return (
							<NavigationMenuItem key={`group-${index}`} className="px-2" role="presentation">
								<span className="text-muted-foreground flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
									{entry.icon ? (
										<Icon iconName={entry.icon} className="h-4 w-4" aria-hidden="true" />
									) : null}
									{entry.label}
								</span>
							</NavigationMenuItem>
						)
					}

					return (
						<NavigationMenuItem key={`item-${entry.href}-${index}`}>
							<NavigationMenuLink
								asChild
								className={cn(navigationMenuTriggerStyle(), 'gap-2')}
							>
								<Link href={entry.href} className="flex items-center gap-2">
									{entry.icon ? (
										<Icon iconName={entry.icon} className="h-4 w-4" aria-hidden="true" />
									) : null}
									<span>{entry.label}</span>
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					)
				})}
			</NavigationMenuList>
		</NavigationMenu>
	)
}

export function MainNavSkeleton() {
	return (
		<div className="flex items-center gap-2">
			<Skeleton className="h-8 w-16 rounded-md" />
			<Skeleton className="h-8 w-20 rounded-md" />
			<Skeleton className="h-8 w-24 rounded-md" />
		</div>
	)
}
