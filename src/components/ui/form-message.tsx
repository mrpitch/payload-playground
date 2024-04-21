import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

import { useFormField } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import React from 'react'

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

export const FormMessage = ({
	variant,
	size,
	className,
	children,
}: IFormMessageProps) => {
	variant = !variant ? 'error' : variant
	const { error, formMessageId } = useFormField()
	const body = error ? String(error?.message) : children

	if (!body) {
		return null
	}

	return (
		<Message
			variant={variant}
			size={size}
			className={className}
			formMessageId={formMessageId}
		>
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
				success:
					'text-success-foreground bg-success-background border-success-border',
				warning:
					'text-warning-foreground bg-warning-background border-warning-border',
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
	}
)

export const Message = ({
	variant,
	size,
	className,
	children,
	formMessageId,
}: IMessageProps) => {
	return (
		<div
			id={formMessageId}
			className={cn(messageVariants({ variant, size, className }))}
		>
			{variant === 'error' ? <Icons.xCircle className="h-4 w-4" /> : null}
			{variant === 'success' ? <Icons.checkCircle className="h-4 w-4" /> : null}
			{variant === 'warning' ? (
				<Icons.alertTriangle className="h-4 w-4" />
			) : null}
			<p>{children}</p>
		</div>
	)
}
