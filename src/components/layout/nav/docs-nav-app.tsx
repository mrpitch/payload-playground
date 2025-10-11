'use client'

import Link from 'next/link'
import { User } from '@/payload/payload-types'

import { Icon } from '@/components/ui/custom/icons'
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
import { useNavigation, NavigationType, isActive } from '@/lib/hooks/use-navigation'

import { UserNav } from './profile-nav'

export interface ISideBarNavProps {
	user: User | null
	children?: React.ReactNode
	className?: string
}

export function DocsNavApp({
	user,
	...props
}: React.ComponentProps<typeof Sidebar> & ISideBarNavProps) {
	const { state } = useSidebar()
	const { docsNav, settings } = useNavigation(NavigationType.DocsNav)

	return (
		<Sidebar {...props} variant="sidebar" collapsible="icon">
			<SidebarContent className="gap-0">
				<SidebarGroup>
					<SidebarGroupContent>
						<Logo name={state === 'collapsed' ? '' : settings?.siteName} />
					</SidebarGroupContent>
				</SidebarGroup>
				{docsNav.map((menu, menuIndex) => {
					// Group menuItems by labels (items with label but no href)
					const groups: Array<{
						label?: string
						items: typeof menu.menuItems
					}> = []
					let currentGroup: (typeof groups)[0] = { items: [] }

					menu.menuItems.forEach((item) => {
						// If item has label but no href (empty string), it's a group header
						if (item.label && (!item.href || item.href === '')) {
							// Save current group if it has items
							if (currentGroup.items.length > 0) {
								groups.push(currentGroup)
							}
							// Start new group with this label
							currentGroup = { label: item.label, items: [] }
						} else {
							// Regular menu item, add to current group
							currentGroup.items.push(item)
						}
					})

					// Add the last group
					if (currentGroup.items.length > 0) {
						groups.push(currentGroup)
					}

					return groups.map((group, groupIndex) => (
						<SidebarGroup key={`${menuIndex}-${groupIndex}`}>
							{group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
							<SidebarGroupContent>
								<SidebarMenu>
									{group.items.map((item, index) => (
										<SidebarMenuItem key={index}>
											<SidebarMenuButton
												asChild
												tooltip={item.label}
												isActive={isActive(item.href)}
											>
												<Link href={item.href}>
													{item.icon ? <Icon iconName={item.icon} /> : null}
													<span>{item.label}</span>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					))
				})}
			</SidebarContent>
			<SidebarFooter>
				<UserNav user={user} context="app" />
			</SidebarFooter>
		</Sidebar>
	)
}

export function DocsNavAppSkeleton() {
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
