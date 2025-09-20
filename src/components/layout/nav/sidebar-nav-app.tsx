'use client'

import { ReactNode } from 'react'

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

import { User } from '@/payload/payload-types'

import { Icon, IconType } from '@/components/ui/custom/icons'
import { Logo } from '@/components/ui/custom/logo'

import { siteConfig } from '@/lib/config'
import { UserNav } from './user-nav'
import { useNavigation } from '@/components/utils/nav-provider'

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
	const { appNav } = useNavigation()
	return (
		<Sidebar {...props} variant="sidebar" collapsible="icon">
			<SidebarContent className="gap-0">
				<SidebarGroup>
					<SidebarGroupContent>
						<Logo name={state === 'collapsed' ? '' : siteConfig.name} />
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupContent>
						{state === 'collapsed' ? null : <SidebarGroupLabel>Training</SidebarGroupLabel>}
						<SidebarMenu>
							{appNav?.navItems?.map((item) => (
								<SidebarMenuItem key={item.label}>
									<SidebarMenuButton asChild tooltip={item.label}>
										<a href={item.href as string}>
											{item?.icon ? <Icon iconName={item.icon as IconType} /> : null}
											<span>{item.label}</span>
										</a>
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
