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
import { Typography } from '@/components/ui/typography'

interface INavItem {
	label: string
	href?: string
	children?: INavChildItem[]
}

interface INavChildItem {
	label: string
	href: string
	description: string
}

interface IMainNavProps {
	items?: INavItem[] | null
}

export const MainNav = ({ items }: IMainNavProps) => {
	return (
		<NavigationMenu className="hidden md:flex">
			{items?.length ? (
				<NavigationMenuList>
					{items?.map((item, index) =>
						item.children ? (
							<NavigationMenuItem key={index}>
								<NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
										{item.children.map((child) => (
											<ListItem key={child.label} title={child.label} href={child.href}>
												{child.description}
											</ListItem>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
						) : (
							<NavigationMenuItem key={index}>
								<Link href={item.href as string} legacyBehavior passHref>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										{item.label}
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						),
					)}
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
							'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-foreground-dark dark:hover:text-foreground-light',
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
