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

import { UserNav } from './profile-nav'

export interface ISideBarNavProps {
	user: User | null
	children?: React.ReactNode
	className?: string
}

/**
 *
 * tbd: move this to a utils file or something
 */
// Helper function to get the correct href for docs menu items
function getDocsMenuItem(
	item: NonNullable<NonNullable<ReturnType<typeof useNavigation>['docsNav']>[0]['menuItems']>[0],
): { href: string; icon: IconType } | null {
	if (!item?.link) {
		console.log('No link found for item:', item)
		return null
	}

	const { docs } = item.link
	console.log('Processing docs item:')

	if (docs && typeof docs === 'object' && 'value' in docs) {
		const doc = docs.value
		if (typeof doc === 'object' && doc?.slug) {
			console.log('Found doc slug:', doc.slug)
			return { href: `/docs/${doc.slug}`, icon: doc.icon as IconType }
		}
	}

	return null
}

export function DocsNavApp({
	user,
	...props
}: React.ComponentProps<typeof Sidebar> & ISideBarNavProps) {
	const { state } = useSidebar()
	const { docsNav, settings } = useNavigation()

	return (
		<Sidebar {...props} variant="sidebar" collapsible="icon">
			<SidebarContent className="gap-0">
				<SidebarGroup>
					<SidebarGroupContent>
						<Logo name={state === 'collapsed' ? '' : settings?.siteName} />
					</SidebarGroupContent>
				</SidebarGroup>
				{docsNav?.map((menu, menuIndex) => (
					<SidebarGroup key={menuIndex}>
						<SidebarGroupContent>
							{/* {state === 'collapsed' ? null : (
								<SidebarGroupLabel>
									{menu.name}
									{menu.shortDescription && (
										<span className="text-muted-foreground block text-xs">
											{menu.shortDescription}
										</span>
									)}
								</SidebarGroupLabel>
							)} */}
							<SidebarMenu>
								{menu.menuItems?.map((navItem, index) => {
									//get href and icon from navItem
									const docItem = getDocsMenuItem(navItem)
									const href = docItem?.href
									const icon = docItem?.icon as IconType
									//get label from navItem
									const label = navItem.link?.label || 'Link'

									// Skip if no valid href
									if (docItem === null) {
										console.log('Skipping item with invalid href:', { label, docItem })
										return null
									}

									console.log('Rendering docs item:', { label, docItem, icon })

									return (
										<SidebarMenuItem key={index}>
											<SidebarMenuButton asChild tooltip={label}>
												<Link href={href || '#'}>
													{icon ? <Icon iconName={icon} /> : null}
													<span>{label}</span>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									)
								})}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
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
