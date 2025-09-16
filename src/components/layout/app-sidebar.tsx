'use client'
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

import { AppShell } from '@/payload/payload-types'

import { Icon, IconType } from '@/components/ui/custom/icons'
import { Logo } from '@/components/ui/custom/logo'

import { siteConfig } from '@/lib/config'

export interface ISideBarNavProps {
	items?: INavItem[]
	children?: React.ReactNode
	className?: string
}

interface INavItem {
	label: string
	href?: string
	icon: NonNullable<NonNullable<AppShell['sideBarNavigation']>['navItems']>[number]['icon']
}

export function AppSidebar({
	items,
	...props
}: React.ComponentProps<typeof Sidebar> & ISideBarNavProps) {
	const { state } = useSidebar()
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
							{items?.map((item) => (
								<SidebarMenuItem key={item.label}>
									<SidebarMenuButton asChild>
										<a href={item.href as string}>
											{item.icon ? <Icon iconName={item.icon as IconType} /> : null}
											<span>{item.label}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}
