'use client'
import { ReactNode } from 'react'

import { Dialog, DialogContent, DialogPortal, DialogTrigger } from '@/components/ui/dialog'

interface ICustomDialogProps {
	trigger: ReactNode
	children: ReactNode
	onOpenChange?: (open: boolean) => void
}

export const CustomDialog = ({ trigger, children, onOpenChange }: ICustomDialogProps) => {
	return (
		<Dialog onOpenChange={onOpenChange}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogPortal>
				<DialogContent>{children}</DialogContent>
			</DialogPortal>
		</Dialog>
	)
}
