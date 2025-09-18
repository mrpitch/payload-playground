'use client'

import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'

import { imageUrl } from '@/lib/utils/constants'
import { cn } from '@/lib/utils/cn'

import type { User } from '@payload-types'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button, buttonVariants } from '@/components/ui/button'
import {
	DropdownMenuLabel,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
	useSidebar,
} from '@/components/ui/sidebar'

interface INavItem {
	label: string
	href?: string
	icon?: ReactNode
}

interface INavProps {
	profileItems: INavItem[]
	user: User | null
	context?: 'marketing' | 'app'
}

export function UserNav({ profileItems, user, context = 'app' }: INavProps) {
	const [isOpen, setIsOpen] = useState(false)
	const { isMobile } = useSidebar()
	useEffect(() => {
		setIsOpen(false)
	}, [])

	if (!user || !profileItems) return null

	return (
		<>
			{context === 'marketing' ? (
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
			{context === 'app' ? (
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton
									size="lg"
									className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								>
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
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate text-xs">{user.email}</span>
									</div>
									<Icon iconName="chevronsUpDown" className="ml-auto size-4" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
								side={isMobile ? 'bottom' : 'right'}
								align="end"
								sideOffset={4}
							>
								<DropdownMenuLabel className="p-0 font-normal">
									<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
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
										<div className="grid flex-1 text-left text-sm leading-tight">
											<span className="truncate text-xs">{user.email}</span>
										</div>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									{profileItems.map((item, index) => (
										<DropdownMenuItem key={index} asChild>
											<Link href={item.href as string}>
												<Icon iconName={item.icon as IconType} />
												{item.label}
											</Link>
										</DropdownMenuItem>
									))}
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild>
									<LogoutButton icon>Sign Out</LogoutButton>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			) : null}
		</>
	)
}
