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
import { useNavigation, NavigationType } from '@/lib/hooks/use-navigation'
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

export function ThreedotsNav({ user, context = 'marketing' }: INavProps) {
	const { mainNav } = useNavigation(NavigationType.ThreedotsNav)

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
								{mainNav.length
									? mainNav.map((group, groupIndex) => (
											<SidebarGroup
												key={groupIndex}
												className={cn(context === 'marketing' ? 'md:hidden' : '')}
											>
												<SidebarGroupLabel>{group.name}</SidebarGroupLabel>
												<SidebarGroupContent className="min-w-56 gap-0">
													<SidebarMenu>
														{group.items.map((item, itemIndex) => (
															<SidebarMenuItem key={`${groupIndex}-${itemIndex}`}>
																<SidebarMenuButton asChild>
																	<Link href={item.href}>
																		<span>{item.label}</span>
																	</Link>
																</SidebarMenuButton>
															</SidebarMenuItem>
														))}
													</SidebarMenu>
												</SidebarGroupContent>
											</SidebarGroup>
										))
									: null}
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
