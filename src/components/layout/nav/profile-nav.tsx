'use client'

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
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { useNavigation } from '@/components/utils/nav-provider'

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

// Helper function to get the correct href for profile menu items (URL only)
function getProfileMenuItemHref(
	item: NonNullable<NonNullable<ReturnType<typeof useNavigation>['profileNav']>['menuItems']>[0],
): string {
	if (!item?.link) return '#'

	const { type, url } = item.link

	// Only handle URLs, ignore other types
	if (type === 'url') {
		return url || '#'
	}

	return '#'
}

export function UserProfile({ user }: { user: User | null }) {
	const { profileNav } = useNavigation()

	if (!user || !profileNav || !profileNav.menuItems) return null

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
					{profileNav.menuItems.map((item, index) => {
						// Only show URL items, ignore other types
						if (item.link?.type !== 'url') {
							return null
						}

						const href = getProfileMenuItemHref(item)
						const label = item.link?.label || 'Link'
						const icon = item.link?.icon as IconType

						// Skip if no valid href
						if (href === '#') {
							return null
						}

						return (
							<SidebarMenuItem key={index}>
								<SidebarMenuButton asChild>
									<Link href={href}>
										{icon ? <Icon iconName={icon} /> : null}
										<span>{label}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						)
					})}
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
