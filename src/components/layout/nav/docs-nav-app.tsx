'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	useSidebar,
} from '@/components/ui/sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
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
	const pathname = usePathname()

	return (
		<Sidebar {...props} variant="sidebar" collapsible="icon">
			<SidebarContent className="gap-0">
				<SidebarGroup>
					<SidebarGroupContent>
						<Logo name={state === 'collapsed' ? '' : settings?.siteName} />
					</SidebarGroupContent>
				</SidebarGroup>
				{docsNav.map((menu, menuIndex) => (
					<React.Fragment key={menuIndex}>
						{menu.navGroups.map((group, groupIndex) => (
							<SidebarGroup key={`${menuIndex}-${groupIndex}`}>
								<SidebarGroupLabel>{group.name}</SidebarGroupLabel>
								<SidebarGroupContent>
									<SidebarMenu>
										{group.items.map((item, itemIndex) => (
											<SidebarMenuItem key={`${menuIndex}-${groupIndex}-${itemIndex}`}>
												{item.type === 'folder' && item.children ? (
													<Collapsible defaultOpen={true} className="group/collapsible">
														<CollapsibleTrigger asChild>
															<SidebarMenuButton
																className="hover:bg-sidebar-accent cursor-pointer"
																tooltip={item.label}
															>
																{item.icon ? <Icon iconName={item.icon} /> : null}
																<span>{item.label}</span>
																<Icon
																	iconName="chevronRight"
																	className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
																/>
															</SidebarMenuButton>
														</CollapsibleTrigger>
														<CollapsibleContent>
															<SidebarMenuSub>
																{item.children.map((child, childIndex) => (
																	<SidebarMenuSubItem key={childIndex}>
																		<SidebarMenuSubButton
																			asChild
																			isActive={isActive(child.href, pathname)}
																		>
																			<Link href={child.href}>
																				{child.icon ? <Icon iconName={child.icon} /> : null}
																				<span>{child.label}</span>
																			</Link>
																		</SidebarMenuSubButton>
																	</SidebarMenuSubItem>
																))}
															</SidebarMenuSub>
														</CollapsibleContent>
													</Collapsible>
												) : (
													<SidebarMenuButton
														asChild
														tooltip={item.label}
														isActive={isActive(item.href, pathname)}
													>
														<Link href={item.href}>
															{item.icon ? <Icon iconName={item.icon} /> : null}
															<span>{item.label}</span>
														</Link>
													</SidebarMenuButton>
												)}
											</SidebarMenuItem>
										))}
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>
						))}
					</React.Fragment>
				))}
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
