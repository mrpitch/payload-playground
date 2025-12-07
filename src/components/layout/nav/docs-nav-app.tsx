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
		<Sidebar
			{...props}
			variant="sidebar"
			collapsible="icon"
			className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ${
				state === 'collapsed' ? 'w-16' : 'w-64'
			}`}
		>
			<SidebarContent className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-border/80 h-screen gap-0 overflow-x-hidden overflow-y-auto">
				<SidebarGroup>
					<SidebarGroupContent>
						<Logo name={state === 'collapsed' ? '' : settings?.siteName} />
					</SidebarGroupContent>
				</SidebarGroup>
				{docsNav.map((menu, menuIndex) => (
					<React.Fragment key={`menu-${menuIndex}`}>
						{menu.navGroups.map((group, groupIndex) => {
							if (!group.items.length) return null
							const groupLabel = group.label || menu.name || ''

							return (
								<SidebarGroup key={`menu-${menuIndex}-group-${groupIndex}`}>
									<SidebarGroupContent>
										{state === 'collapsed' || !groupLabel ? null : (
											<SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>
										)}
										<SidebarMenu>
											{group.items.map((item, itemIndex) => {
												const itemKeyBase = `menu-${menuIndex}-group-${groupIndex}-item-${itemIndex}`
												if (item.type === 'folder') {
													return (
														<SidebarMenuItem key={`folder-${itemKeyBase}`}>
															<Collapsible defaultOpen className="group/collapsible">
																<CollapsibleTrigger asChild>
																	<SidebarMenuButton
																		className="cursor-pointer"
																		tooltip={item.label}
																	>
																		{item.icon ? (
																			<Icon
																				iconName={item.icon}
																				className="h-4 w-4"
																				aria-hidden="true"
																			/>
																		) : null}
																		<span>{item.label}</span>
																		<Icon
																			iconName="chevronRight"
																			className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90"
																			aria-hidden="true"
																		/>
																	</SidebarMenuButton>
																</CollapsibleTrigger>
																<CollapsibleContent>
																	<SidebarMenuSub>
																		{item.items.map((child, childIndex) => (
																			<SidebarMenuSubItem
																				key={`${itemKeyBase}-child-${childIndex}`}
																			>
																				<SidebarMenuSubButton
																					asChild
																					isActive={isActive(child.href, pathname)}
																				>
																					<Link href={child.href}>
																						{child.icon ? (
																							<Icon
																								iconName={child.icon}
																								className="h-4 w-4"
																								aria-hidden="true"
																							/>
																						) : null}
																						<span>{child.label}</span>
																					</Link>
																				</SidebarMenuSubButton>
																			</SidebarMenuSubItem>
																		))}
																	</SidebarMenuSub>
																</CollapsibleContent>
															</Collapsible>
														</SidebarMenuItem>
													)
												}

												return (
													<SidebarMenuItem key={`item-${itemKeyBase}`}>
														<SidebarMenuButton
															asChild
															tooltip={item.label}
															isActive={isActive(item.href, pathname)}
														>
															<Link href={item.href}>
																{item.icon ? (
																	<Icon
																		iconName={item.icon}
																		className="h-4 w-4"
																		aria-hidden="true"
																	/>
																) : null}
																<span>{item.label}</span>
															</Link>
														</SidebarMenuButton>
													</SidebarMenuItem>
												)
											})}
										</SidebarMenu>
									</SidebarGroupContent>
								</SidebarGroup>
							)
						})}
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
