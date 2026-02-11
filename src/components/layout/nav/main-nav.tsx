'use client'

import Link from 'next/link'

import { Icon } from '@/components/ui/custom/icons'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { NavigationType, useNavigation } from '@/lib/hooks/use-navigation'
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
							<NavigationMenuItem key={`group-${entry.label}-${index}`}>
								<NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), 'gap-2')}>
									{entry.icon ? (
										<Icon iconName={entry.icon} className="h-4 w-4" aria-hidden="true" />
									) : null}
									<span>{entry.label}</span>
								</NavigationMenuTrigger>
								<NavigationMenuContent className="p-3">
									<div className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
										{entry.items.map((item, itemIndex) => {
											if (item.type === 'folder') {
												return (
													<div
														key={`group-folder-${item.label}-${itemIndex}`}
														className="space-y-1"
														id={`group-folder-${item.label}-${itemIndex}`}
													>
														<div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
															{item.icon ? (
																<Icon
																	iconName={item.icon}
																	className="h-3.5 w-3.5"
																	aria-hidden="true"
																/>
															) : null}
															<span>{item.label}</span>
														</div>
														<ul className="space-y-1 pl-4">
															{item.items.map((child) => (
																<ListItem
																	key={child.label}
																	title={child.label ?? ''}
																	href={child.href ?? ''}
																>
																	{child.label}
																</ListItem>
															))}
														</ul>
													</div>
												)
											}

											return (
												<li key={`group-item-${item.href}-${itemIndex}`}>
													<NavigationMenuLink
														asChild
														className="flex items-center gap-2 rounded-md p-2 text-sm transition-colors hover:bg-muted"
													>
														<Link href={item.href}>
															{item.icon ? (
																<Icon iconName={item.icon} className="h-4 w-4" aria-hidden="true" />
															) : null}
															<span>{item.label}</span>
														</Link>
													</NavigationMenuLink>
												</li>
											)
										})}
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>
						)
					}

					return (
						<NavigationMenuItem key={`item-${entry.href}-${index}`}>
							<NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), 'gap-2')}>
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

function ListItem({
	title,
	children,
	href,
	...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
	return (
		<li {...props}>
			<NavigationMenuLink asChild>
				<Link href={href}>
					<div className="text-sm leading-none font-medium">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
				</Link>
			</NavigationMenuLink>
		</li>
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
