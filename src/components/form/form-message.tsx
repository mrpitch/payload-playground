import React from 'react'

import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

import { useFormField } from '@/components/form/form'
import { Icon } from '@/components/ui/custom/icons'

interface IFormMessageProps {
	variant?: 'error' | 'success' | 'warning' | null
	size?: 'default' | 'sm' | 'lg' | 'xl'
	className?: string
	children?: React.ReactNode
}

interface IMessageProps extends IFormMessageProps {
	formMessageId?: string
	message?: React.ReactNode
}

export const FormMessage = ({ variant, size, className, children }: IFormMessageProps) => {
	variant = !variant ? 'error' : variant
	const { error, formMessageId } = useFormField()
	const body = error ? String(error?.message) : children

	if (!body) {
		return null
	}

	return (
		<Message variant={variant} size={size} className={className} formMessageId={formMessageId}>
			{body}
		</Message>
	)
}

const messageVariants = cva(
	'flex min-w-[22rem] items-center gap-x-2 rounded-md text-sm border-[1px] border-solid',
	{
		variants: {
			variant: {
				error: 'text-error-foreground bg-error-background border-error-border',
				success: 'text-success-foreground bg-success-background border-success-border',
				warning: 'text-warning-foreground bg-warning-background border-warning-border',
			},
			size: {
				default: 'px-3 py-2',
				sm: 'px-3 py-1',
				lg: 'px-3 py-3',
				xl: 'px-3 py-6',
			},
		},
		defaultVariants: {
			variant: 'success',
			size: 'default',
		},
	},
)

export const Message = ({ variant, size, className, children, formMessageId }: IMessageProps) => {
	return (
		<div id={formMessageId} className={cn(messageVariants({ variant, size, className }))}>
			{variant === 'error' ? <Icon iconName="xCircle" className="h-5 w-5" /> : null}
			{variant === 'success' ? <Icon iconName="checkCircle" className="h-5 w-5" /> : null}
			{variant === 'warning' ? <Icon iconName="alertTriangle" className="h-5 w-5" /> : null}
			<p>{children}</p>
		</div>
	)
}
