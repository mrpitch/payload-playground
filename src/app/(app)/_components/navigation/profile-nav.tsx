'use client'
import { useState } from 'react'
import Link from 'next/link'

import type { User } from '@payload-types'
import { logout } from '@/lib/actions/logout'

import { cn } from '@/lib/utils/cn'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button, buttonVariants } from '@/components/ui/button'
import { Icon } from '@/components/ui/icons'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface INavItem {
	label: string
	href?: string
}

interface IMainNavProps {
	items?: INavItem[]
	user: User | null
}

export const ProfileNav = ({ items, user }: IMainNavProps) => {
	const [open, setOpen] = useState(false)
	console.log('open', open)
	console.log('user', user)
	return (
		<>
			{user ? (
				<DropdownMenu onOpenChange={setOpen}>
					<DropdownMenuTrigger>
						<Avatar className="h-8 w-8">
							{/* <AvatarImage src={user?.avatar?.url ?? ''} /> */}
							<AvatarFallback>
								<Icon iconName="user" className="fill-current h-5 w-5" />
							</AvatarFallback>
						</Avatar>
						<span className="sr-only">My Account</span>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" onCloseAutoFocus={(e) => e.preventDefault()}>
						{items?.length ? (
							<>
								{items?.map((item, index) => (
									<DropdownMenuItem key={index} asChild>
										<Link href={item.href as string}>{item.label}</Link>
									</DropdownMenuItem>
								))}
							</>
						) : null}
						{user ? (
							<DropdownMenuItem>
								<button onClick={() => logout()}>Sign Out</button>
							</DropdownMenuItem>
						) : null}
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<Link href="/login" className={cn(buttonVariants({ variant: 'neutral', size: 'icon' }))}>
					<Icon iconName="logIn" className="fill-current h-5 w-5" />
					<span className="sr-only">log in</span>
				</Link>
			)}
		</>
	)
}
