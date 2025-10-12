'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { useNavigation, NavigationType, isActive } from '@/lib/hooks/use-navigation'

interface INavProps {
	user: User | null
	context?: 'marketing' | 'app'
}

export function UserNav({ user, context = 'app' }: INavProps) {
	const { isMobile } = useSidebar()
	if (!user) return null

	return (
		<>
			{context === 'marketing' ? <UserProfile user={user} /> : null}
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
								className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg p-0"
								side={isMobile ? 'bottom' : 'right'}
								align="end"
								sideOffset={4}
							>
								<UserProfile user={user} />
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			) : null}
		</>
	)
}

export function UserProfile({ user }: { user: User | null }) {
	const { profileNav } = useNavigation(NavigationType.ProfileNav)
	const pathname = usePathname()

	if (!user || !profileNav.length) return null

	return (
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
					{profileNav.map((group, groupIndex) => (
						<React.Fragment key={groupIndex}>
							{/* Render group items */}
							{group.items.map((item, itemIndex) => (
								<SidebarMenuItem key={`${groupIndex}-${itemIndex}`}>
									<SidebarMenuButton asChild isActive={isActive(item.href, pathname)}>
										<Link href={item.href}>
											{item.icon ? <Icon iconName={item.icon} /> : null}
											<span>{item.label}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</React.Fragment>
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
	)
}

export function UserNavSkeleton() {
	return (
		<div className="min-w-56">
			<div className="flex items-center gap-2 p-2">
				<Skeleton className="bg-sidebar-accent h-8 w-8 rounded-full" />
				<Skeleton className="bg-sidebar-accent h-4 w-24" />
			</div>
			<div className="space-y-2 p-2">
				<Skeleton className="bg-sidebar-accent h-8 w-full rounded-md" />
				<Skeleton className="bg-sidebar-accent h-8 w-full rounded-md" />
			</div>
		</div>
	)
}
