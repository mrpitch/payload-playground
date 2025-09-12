'use client'

import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'

import { imageUrl } from '@/lib/utils/constants'

import type { User } from '@payload-types'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button, buttonVariants } from '@/components/ui/button'
import { Icon, IconType } from '@/components/ui/custom/icons'
import { LogoutButton } from '@/components/auth/logout-button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
} from '@/components/ui/sidebar'
import { ThemeToggle } from '@/components/ui/custom/theme-toggle'
import { cn } from '@/lib/utils/cn'

interface INavItem {
	label: string
	href?: string
	icon?: ReactNode
}

interface INavProps {
	profileItems?: INavItem[]
	mainItems?: INavItem[]
	user: User | null
}

export function NavThreedots({ profileItems, mainItems, user }: INavProps) {
	const [isOpen, setIsOpen] = useState(false)
	useEffect(() => {
		setIsOpen(false)
	}, [])

	return (
		<div className="flex items-center gap-1">
			{!user ? (
				<Link href="/login" className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}>
					<Icon iconName="logIn" />
					<span className="sr-only">log in</span>
				</Link>
			) : null}
			<ThemeToggle />
			<Popover open={isOpen} onOpenChange={setIsOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className={cn('data-[state=open]:bg-accent', !user ? 'md:hidden' : '')}
					>
						<Icon iconName="moreHorizontal" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-56 overflow-hidden rounded-lg p-0" align="end">
					<SidebarProvider className="min-h-auto">
						<Sidebar collapsible="none" className="w-full bg-transparent">
							<SidebarContent className="w-full">
								{mainItems && mainItems.length > 0 ? (
									<SidebarGroup className="block border-b last:border-none md:hidden">
										<SidebarGroupContent className="gap-0">
											<SidebarMenu>
												{mainItems.map((item, index) => (
													<SidebarMenuItem key={index}>
														<SidebarMenuButton asChild>
															<Link href={item.href as string}>
																{item.icon ? <Icon iconName={item.icon as IconType} /> : null}
																<span>{item.label}</span>
															</Link>
														</SidebarMenuButton>
													</SidebarMenuItem>
												))}
											</SidebarMenu>
										</SidebarGroupContent>
									</SidebarGroup>
								) : null}
								{user && profileItems && profileItems.length > 0 ? (
									<SidebarGroup className="border-b last:border-none">
										<SidebarGroupContent className="gap-0">
											<SidebarMenu>
												{user ? (
													<SidebarMenuItem className="flex items-center gap-2">
														<Avatar className="mr-2 h-8 w-8">
															{user?.avatar ? (
																<AvatarImage
																	src={`${imageUrl}/${(user?.avatar as { filename?: string })?.filename}`}
																/>
															) : null}
															<AvatarFallback>
																<Icon iconName="user" className="h-5 w-5" />
															</AvatarFallback>
														</Avatar>
														<span className="text-sm font-medium">{user?.email}</span>
														<span className="sr-only">My Account</span>
													</SidebarMenuItem>
												) : null}
												{profileItems.map((item, index) => (
													<SidebarMenuItem key={index}>
														<SidebarMenuButton asChild>
															<Link href={item.href as string}>
																{item.icon ? <Icon iconName={item.icon as IconType} /> : null}
																<span>{item.label}</span>
															</Link>
														</SidebarMenuButton>
													</SidebarMenuItem>
												))}
												<SidebarMenuItem>
													<SidebarMenuButton asChild>
														<LogoutButton>
															<Icon iconName="logOut" />
															Sign Out
														</LogoutButton>
													</SidebarMenuButton>
												</SidebarMenuItem>
											</SidebarMenu>
										</SidebarGroupContent>
									</SidebarGroup>
								) : null}
							</SidebarContent>
						</Sidebar>
					</SidebarProvider>
				</PopoverContent>
			</Popover>
		</div>
	)
}
