'use client'

import Link from 'next/link'

import { User } from '@/payload/payload-types'

import { Icon, IconType } from '@/components/ui/custom/icons'
import { Logo } from '@/components/ui/custom/logo'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
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

import { UserNav } from './user-nav'

export interface ISideBarNavProps {
	user: User | null
	children?: React.ReactNode
	className?: string
}

export function SidebarNavApp({
	user,
	...props
}: React.ComponentProps<typeof Sidebar> & ISideBarNavProps) {
	const { state } = useSidebar()
	const { appNav, settings } = useNavigation()

	return (
		<Sidebar {...props} variant="sidebar" collapsible="icon">
			<SidebarContent className="gap-0">
				<SidebarGroup>
					<SidebarGroupContent>
						<Logo name={state === 'collapsed' ? '' : settings?.siteName} />
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupContent>
						{state === 'collapsed' ? null : <SidebarGroupLabel>Training</SidebarGroupLabel>}
						<SidebarMenu>
							{appNav?.navItems?.map((item) => (
								<SidebarMenuItem key={item.label}>
									<SidebarMenuButton asChild tooltip={item.label}>
										<Link href={item.href as string}>
											{item?.icon ? <Icon iconName={item.icon as IconType} /> : null}
											<span>{item.label}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<UserNav user={user} context="app" />
			</SidebarFooter>
		</Sidebar>
	)
}

export function SidebarNavAppSkeleton() {
	return (
		<Sidebar variant="sidebar" collapsible="icon">
			<SidebarContent className="gap-0">
				<SidebarGroup>
					<SidebarGroupContent>
						<Skeleton className="h-10 w-10 rounded-lg" />
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<Skeleton className="mt-1 h-8 w-8 rounded-md" />
							</SidebarMenuItem>
							<SidebarMenuItem>
								<Skeleton className="mt-1 h-8 w-8 rounded-md" />
							</SidebarMenuItem>
							<SidebarMenuItem>
								<Skeleton className="mt-1 h-8 w-8 rounded-md" />
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<Skeleton className="h-10 w-10 rounded-full" />
			</SidebarFooter>
		</Sidebar>
	)
}
