'use client'

import { ReactNode } from 'react'
import Link from 'next/link'

import { imageUrl } from '@/lib/utils/constants'

import type { User } from '@payload-types'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Icon, IconType } from '@/components/ui/custom/icons'
import { LogoutButton } from '@/components/auth/logout-button'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
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
	const { isMobile } = useSidebar()

	if (!user || !profileItems) return null

	return (
		<>
			{context === 'marketing' ? (
				<SidebarGroup className="min-w-56 border-t">
					<SidebarGroupLabel>Profile</SidebarGroupLabel>
					<SidebarGroupContent className="gap-0">
						<SidebarMenu>
							{user ? (
								<SidebarMenuItem className="mb-2 flex items-center gap-2">
									<Avatar className="ml-2 h-8 w-8">
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
								className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg p-0"
								side={isMobile ? 'bottom' : 'right'}
								align="end"
								sideOffset={4}
							>
								<Sidebar collapsible="none" className="bg-transparent">
									<SidebarContent>
										<SidebarGroup className="border-b last:border-none">
											<SidebarGroupContent className="gap-0">
												<SidebarGroupLabel className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
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
												</SidebarGroupLabel>
												<SidebarMenu>
													{profileItems.map((item, index) => (
														<SidebarMenuItem key={index}>
															<SidebarMenuButton asChild>
																<Link href={item.href as string}>
																	<Icon iconName={item.icon as IconType} />
																	<span>{item.label}</span>
																</Link>
															</SidebarMenuButton>
														</SidebarMenuItem>
													))}
													<SidebarMenuItem>
														<SidebarMenuButton asChild>
															<LogoutButton icon>Sign Out</LogoutButton>
														</SidebarMenuButton>
													</SidebarMenuItem>
												</SidebarMenu>
											</SidebarGroupContent>
										</SidebarGroup>
									</SidebarContent>
								</Sidebar>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			) : null}
		</>
	)
}
