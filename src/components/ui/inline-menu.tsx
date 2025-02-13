'use client'

import { useState, useRef, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Icon } from '@/components/ui/icons'

type TMenuItem = {
	type?: 'dialog' | 'link'
	triggerChildren: ReactNode
	children?: ReactNode
}
interface IInlineMenuProps {
	menuItems: TMenuItem[]
	label?: string
}

interface IInlineMenuItemProps {
	triggerChildren: ReactNode
	children: ReactNode
	onSelect: () => void
	onOpenChange: (open: boolean) => void
}

export const InlineMenu: React.FC<IInlineMenuProps> = ({
	menuItems,
	label,
}) => {
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [hasOpenDialog, setHasOpenDialog] = useState(false)
	const dropdownTriggerRef = useRef<null | HTMLButtonElement>(null)
	const focusRef = useRef<null | HTMLButtonElement>(null)

	const handleDialogItemSelect = () => {
		focusRef.current = dropdownTriggerRef.current
	}

	const handleDialogItemOpenChange = (open: boolean) => {
		setHasOpenDialog(open)
		if (open === false) {
			setDropdownOpen(false)
		}
	}

	return (
		<DropdownMenu
			open={dropdownOpen}
			onOpenChange={setDropdownOpen}
			modal={false}
		>
			<DropdownMenuTrigger asChild>
				<Button aria-haspopup="true" size="icon" variant="ghost">
					<Icon iconName="moreHorizontal" className="h-4 w-4" />
					<span className="sr-only">Toggle menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-36"
				align="end"
				hidden={hasOpenDialog}
				onCloseAutoFocus={(event) => {
					if (focusRef.current) {
						focusRef.current.focus()
						focusRef.current = null
						event.preventDefault()
					}
				}}
				sideOffset={0}
			>
				{label ? (
					<>
						<DropdownMenuLabel>{label}</DropdownMenuLabel>
						<DropdownMenuSeparator />
					</>
				) : null}
				{menuItems.map((item, index) => {
					return item.type === 'dialog' ? (
						<DialogItem
							key={index}
							triggerChildren={item.triggerChildren}
							onSelect={handleDialogItemSelect}
							onOpenChange={handleDialogItemOpenChange}
						>
							{item.children}
						</DialogItem>
					) : (
						<DropdownMenuItem key={index}>
							<span className="p-1">{item.triggerChildren}</span>
						</DropdownMenuItem>
					)
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export const DialogItem = ({
	triggerChildren,
	children,
	onSelect,
	onOpenChange,
}: IInlineMenuItemProps) => {
	return (
		<Dialog onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<DropdownMenuItem
					className="cursor-pointer p-3"
					onSelect={(event) => {
						event.preventDefault()
						onSelect && onSelect()
					}}
				>
					{triggerChildren}
				</DropdownMenuItem>
			</DialogTrigger>
			<DialogPortal>
				<DialogContent>{children}</DialogContent>
			</DialogPortal>
		</Dialog>
	)
}
