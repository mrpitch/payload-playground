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

	return (
		<Sidebar {...props} variant="sidebar" collapsible="icon">
			<SidebarContent className="gap-0">
				<SidebarGroup>
					<SidebarGroupContent>
						<Logo name={state === 'collapsed' ? '' : settings?.siteName} />
					</SidebarGroupContent>
				</SidebarGroup>
				{docsNav.map((menu, menuIndex) => {
					console.log('Processing menu:', menu.name, 'menuItems:', menu.menuItems)

					// Process each menu item and its children
					const processedItems = menu.menuItems.map((item, itemIndex) => {
						console.log(
							`Processing item ${itemIndex}:`,
							item,
							'type:',
							item.type,
							'children:',
							item.children,
						)
						return item
					})

					console.log('Processed items:', processedItems)

					return processedItems.map((item, itemIndex) => (
						<SidebarGroup key={`${menuIndex}-${itemIndex}`}>
							{item.type === 'folder' && (
								<Collapsible defaultOpen={true} className="group/collapsible">
									<CollapsibleTrigger asChild>
										<SidebarGroupLabel className="hover:bg-sidebar-accent cursor-pointer">
											{item.label}
											<Icon
												iconName="chevronRight"
												className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
											/>
										</SidebarGroupLabel>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarGroupContent>
											<SidebarMenu>
												{item.children?.map((child, childIndex) => (
													<SidebarMenuItem key={childIndex}>
														<SidebarMenuButton
															asChild
															tooltip={child.label}
															isActive={isActive(child.href)}
														>
															<Link href={child.href}>
																{child.icon ? <Icon iconName={child.icon} /> : null}
																<span>{child.label}</span>
															</Link>
														</SidebarMenuButton>
													</SidebarMenuItem>
												))}
											</SidebarMenu>
										</SidebarGroupContent>
									</CollapsibleContent>
								</Collapsible>
							)}
							{item.type === 'label' && (
								<>
									<SidebarGroupLabel>{item.label}</SidebarGroupLabel>
									<SidebarGroupContent>
										<SidebarMenu>
											{item.children?.map((child, childIndex) => (
												<SidebarMenuItem key={childIndex}>
													<SidebarMenuButton
														asChild
														tooltip={child.label}
														isActive={isActive(child.href)}
													>
														<Link href={child.href}>
															{child.icon ? <Icon iconName={child.icon} /> : null}
															<span>{child.label}</span>
														</Link>
													</SidebarMenuButton>
												</SidebarMenuItem>
											))}
										</SidebarMenu>
									</SidebarGroupContent>
								</>
							)}
							{item.type === 'link' && (
								<SidebarGroupContent>
									<SidebarMenu>
										<SidebarMenuItem>
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
									</SidebarMenu>
								</SidebarGroupContent>
							)}
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
