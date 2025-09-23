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
import { useNavigation } from '@/components/utils/nav-provider'

export const MainNav = () => {
	const { mainNav } = useNavigation()

	console.log('rerender MainNav')
	return (
		<NavigationMenu className="hidden md:flex">
			{mainNav?.navItems?.length ? (
				<NavigationMenuList>
					{mainNav?.navItems?.map((item, index) => (
						<NavigationMenuItem key={index}>
							<NavigationMenuLink
								href={item.href as string}
								asChild
								className={navigationMenuTriggerStyle()}
							>
								<Link href={item.href as string}>{item.label}</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
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
