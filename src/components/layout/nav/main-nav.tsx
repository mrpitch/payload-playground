'use client'

import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils/cn'
import { Skeleton } from '@/components/ui/skeleton'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Typography } from '@/components/ui/custom/typography'
import { useNavigation, NavigationType } from '@/lib/hooks/use-navigation'

export const MainNav = () => {
	const { mainNav } = useNavigation(NavigationType.MainNav)

	return (
		<NavigationMenu className="hidden md:flex">
			{mainNav.length ? (
				<NavigationMenuList>
					{mainNav.map((group, groupIndex) => (
						<React.Fragment key={groupIndex}>
							{/* Render group items */}
							{group.items.map((item, itemIndex) => (
								<NavigationMenuItem key={`${groupIndex}-${itemIndex}`}>
									<NavigationMenuLink
										href={item.href}
										asChild
										className={navigationMenuTriggerStyle()}
									>
										<Link href={item.href}>{item.label}</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							))}
						</React.Fragment>
					))}
				</NavigationMenuList>
			) : null}
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

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
	({ className, title, children, ...props }, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<a
						ref={ref}
						className={cn(
							'hover:text-foreground-dark dark:hover:text-foreground-light block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none',
							className,
						)}
						{...props}
					>
						<Typography as="p" className="font-medium">
							{title}
						</Typography>
						<Typography as="p" className="line-clamp-2 text-sm leading-snug">
							{children}
						</Typography>
					</a>
				</NavigationMenuLink>
			</li>
		)
	},
)
ListItem.displayName = 'ListItem'
