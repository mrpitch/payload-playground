'use client'

import { ReactNode } from 'react'
import Link from 'next/link'

import { imageUrl } from '@/lib/utils/constants'

import type { User } from '@payload-types'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button, buttonVariants } from '@/components/ui/button'
import { Icon, IconType } from '@/components/ui/custom/icons'
import { LogoutButton } from '@/components/auth/logout-button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuGroup,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { ThemeToggle } from '@/components/ui/custom/theme-toggle'
import { cn } from '@/lib/utils/cn'

interface INavItem {
	label: string
	href?: string
	icon?: ReactNode
}

interface INavProps {
	profileItems?: INavItem[]
	mainItems?: INavItem[]
	user: User | null
	context?: 'marketing' | 'app'
}

export function ThreedotsNav({ profileItems, mainItems, user, context = 'marketing' }: INavProps) {
	return (
		<div className="flex items-center gap-1">
			{!user ? (
				<Link href="/login" className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}>
					<Icon iconName="logIn" />
					<span className="sr-only">log in</span>
				</Link>
			) : null}
			<ThemeToggle />
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className={cn('data-[state=open]:bg-accent', !user ? 'md:hidden' : '')}
					>
						<Icon iconName="moreHorizontal" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-56 overflow-hidden rounded-lg"
					align="end"
					side="bottom"
					sideOffset={8}
				>
					{mainItems && mainItems.length > 0 ? (
						<>
							<DropdownMenuGroup className={cn(context === 'marketing' ? 'md:hidden' : '')}>
								{mainItems.map((item, index) => (
									<DropdownMenuItem key={index} asChild>
										<Link href={item.href as string} className="flex items-center gap-2">
											{item.icon ? <Icon iconName={item.icon as IconType} /> : null}
											<span>{item.label}</span>
										</Link>
									</DropdownMenuItem>
								))}
								{!user && profileItems && profileItems.length === 0 ? (
									<DropdownMenuSeparator />
								) : null}
							</DropdownMenuGroup>
						</>
					) : null}
					{user && profileItems && profileItems.length > 0 ? (
						<>
							<DropdownMenuLabel className="flex items-center gap-2">
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
								<span className="text-sm font-medium">{user?.email}</span>
								<span className="sr-only">My Account</span>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								{profileItems.map((item, index) => (
									<DropdownMenuItem key={index} asChild>
										<Link href={item.href as string} className="flex items-center gap-2">
											{item.icon ? <Icon iconName={item.icon as IconType} /> : null}
											<span>{item.label}</span>
										</Link>
									</DropdownMenuItem>
								))}
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild>
									<LogoutButton className="w-full justify-start" icon>
										Logout
									</LogoutButton>
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</>
					) : null}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
