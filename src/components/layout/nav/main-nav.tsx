'use client'

import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils/cn'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Typography } from '@/components/ui/custom/typography'
import { useNavigation } from '@/components/utils/nav-provider'

export const MainNav = () => {
	const { mainNav } = useNavigation()
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
