'use client'

import Link from 'next/link'

import type { User } from '@payload-types'

import { ThemeToggle } from '@/components/ui/custom/theme-toggle'
import { cn } from '@/lib/utils/cn'
import { UserNav } from './user-nav'
import { useNavigation } from '@/components/utils/nav-provider'
import { Button, buttonVariants } from '@/components/ui/button'
import { Icon } from '@/components/ui/custom/icons'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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

interface INavProps {
	user: User | null
	context?: 'marketing' | 'app'
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
						className={cn('data-[state=open]:bg-accent', !user ? 'md:hidden' : '')}
					>
						<Icon iconName="moreHorizontal" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-56 overflow-hidden rounded-lg p-0"
					align="end"
					side="bottom"
					sideOffset={8}
				>
					<SidebarProvider className="min-h-auto w-full">
						<Sidebar collapsible="none" className="bg-transparent">
							<SidebarContent>
								{/* Main Navigation Items Group */}
								{mainNav && mainNav.navItems ? (
									<SidebarGroup className={cn(context === 'marketing' ? 'md:hidden' : '')}>
										<SidebarGroupLabel>Main</SidebarGroupLabel>
										<SidebarGroupContent className="gap-0">
											<SidebarMenu>
												{mainNav.navItems.map((item, index) => (
													<SidebarMenuItem key={index}>
														<SidebarMenuButton asChild>
															<Link href={item.href as string}>
																<span>{item.label}</span>
															</Link>
														</SidebarMenuButton>
													</SidebarMenuItem>
												))}
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
