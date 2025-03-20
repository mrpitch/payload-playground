'use client'
import { useState } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils/cn'
import { imageUrl } from '@/lib/utils/constants'

import type { User } from '@payload-types'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'
import { Icon } from '@/components/ui/custom/icons'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogoutButton } from '@/components/auth/logout-button'

interface INavItem {
	label: string
	href?: string
}

interface IMainNavProps {
	items?: INavItem[]
	user: User | null
}

export const ProfileNav = ({ items, user }: IMainNavProps) => {
	const [_, setOpen] = useState(false)

	console.log('avatar:', `${imageUrl}/${(user?.avatar as { filename?: string })?.filename}`)
	return (
		<>
			{user ? (
				<DropdownMenu onOpenChange={setOpen}>
					<DropdownMenuTrigger className="cursor-pointer">
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
						<span className="sr-only">My Account</span>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" onCloseAutoFocus={(e) => e.preventDefault()}>
						{items?.length ? (
							<>
								{items?.map((item, index) => (
									<DropdownMenuItem key={index} asChild className="cursor-pointer">
										<Link href={item.href as string}>{item.label}</Link>
									</DropdownMenuItem>
								))}
							</>
						) : null}
						{user ? (
							<DropdownMenuItem>
								<LogoutButton>Sign Out</LogoutButton>
							</DropdownMenuItem>
						) : null}
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<Link href="/login" className={cn(buttonVariants({ variant: 'neutral', size: 'icon' }))}>
					<Icon iconName="logIn" className="h-5 w-5" />
					<span className="sr-only">log in</span>
				</Link>
			)}
		</>
	)
}
