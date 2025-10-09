'use client'

import Link from 'next/link'

import type { User } from '@payload-types'

import { cn } from '@/lib/utils/cn'

import { Button, buttonVariants } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Icon } from '@/components/ui/custom/icons'
import { useNavigation } from '@/components/utils/nav-provider'
import { UserNav } from './profile-nav'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarGroupLabel,
	SidebarProvider,
} from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { ThemeToggle } from '@/components/ui/custom/theme-toggle'

interface INavProps {
	user: User | null
	context?: 'marketing' | 'app'
}

export function ThreedotsNavSkeleton() {
	return (
		<div className="flex items-center gap-2">
			<Skeleton className="h-8 w-8 rounded-md" />
			<Skeleton className="h-8 w-8 rounded-md" />
		</div>
	)
}

// Helper function to get the correct href for threedots menu items (pages only)
function getThreedotsMenuItemHref(
	item: NonNullable<NonNullable<ReturnType<typeof useNavigation>['mainNav']>['menuItems']>[0],
): string {
	if (!item?.link) return '#'

	const { type, pages } = item.link

	// Only handle pages, ignore other types
	if (type === 'pages' && pages && typeof pages === 'object' && 'value' in pages) {
		const page = pages.value
		if (typeof page === 'object' && page?.slug) {
			return `/${page.slug}`
		}
	}

	return '#'
}

export function ThreedotsNav({ user, context = 'marketing' }: INavProps) {
	const { mainNav } = useNavigation()

	return (
		<div className="flex items-center gap-1">
			{!user ? (
				<Link href="/login" className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}>
					<Icon iconName="logIn" />
					<span className="sr-only">log in</span>
				</Link>
			) : null}
			<ThemeToggle />
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className={cn('text-foreground data-[state=open]:bg-accent', !user ? 'md:hidden' : '')}
					>
						<Icon iconName="moreHorizontal" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="min-w-56 overflow-hidden rounded-lg p-0"
					align="end"
					side="bottom"
					sideOffset={8}
				>
					<SidebarProvider className="min-h-auto w-full">
						<Sidebar collapsible="none" className="bg-transparent">
							<SidebarContent>
								{/* Main Navigation Items Group */}
								{mainNav && mainNav.menuItems ? (
									<SidebarGroup className={cn(context === 'marketing' ? 'md:hidden' : '')}>
										<SidebarGroupLabel>Main</SidebarGroupLabel>
										<SidebarGroupContent className="min-w-56 gap-0">
											<SidebarMenu>
												{mainNav.menuItems.map((item, index) => {
													// Only show pages, ignore other types
													if (item.link?.type !== 'pages') {
														return null
													}

													const href = getThreedotsMenuItemHref(item)
													const label = item.link?.label || 'Link'

													// Skip if no valid href
													if (href === '#') {
														return null
													}

													return (
														<SidebarMenuItem key={index}>
															<SidebarMenuButton asChild>
																<Link href={href}>
																	<span>{label}</span>
																</Link>
															</SidebarMenuButton>
														</SidebarMenuItem>
													)
												})}
											</SidebarMenu>
										</SidebarGroupContent>
									</SidebarGroup>
								) : null}
								{/* User/Profile Items Group */}
								{context === 'marketing' ? <UserNav user={user} context={context} /> : null}
							</SidebarContent>
						</Sidebar>
					</SidebarProvider>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
