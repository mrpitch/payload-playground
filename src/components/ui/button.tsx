import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils/cn'

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default:
					'border bg-primary border-border-primary-dark text-primary-light hover:text-primary hover:bg-primary/0 hover:border-border-primary-dark dark:text-foreground-light dark:border-primary-light',
				destructive:
					'bg-destructive border border-destructive hover:border-destructive text-destructive-foreground hover:bg-destructive/40 hover:text-destructive',
				outline:
					'border border-border-primary text-primary hover:bg-primary-light/50 dark:border-primary-light dark:text-foreground-light dark:hover:text-foreground dark:hover:border-border-primary',
				secondary:
					'border bg-secondary-dark border-secondary-dark text-foreground-light hover:bg-white hover:border-border-secondary',
				ghost: 'bg-background hover:bg-accent hover:text-accent-foreground border-foreground-light',
				link: 'text-primary underline-offset-4 hover:underline',
				neutral: 'underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-8 rounded-md px-2',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-8 w-8',
				iconCircle: 'h-8 w-8 rounded-full border',
				neutral: 'h-auto w-auto',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
		)
	},
)
Button.displayName = 'Button'

export { Button, buttonVariants }
