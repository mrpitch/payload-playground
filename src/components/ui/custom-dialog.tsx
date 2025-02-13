'use client'
import { useState, ReactNode } from 'react'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

interface ICustomDialogProps {
	trigger: ReactNode
	children: ReactNode
	onOpenChange?: (open: boolean) => void
}

export const CustomDialog = ({
	trigger,
	children,
	onOpenChange,
}: ICustomDialogProps) => {
	return (
		<Dialog onOpenChange={onOpenChange}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogPortal>
				<DialogContent>{children}</DialogContent>
			</DialogPortal>
		</Dialog>
	)
}
