import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils/cn'

const buttonVariants = cva(
	"cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
				destructive:
					'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline:
					'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
				secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
				link: 'text-primary underline-offset-4 hover:underline',
				neutral: 'underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3',
				sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
				icon: 'size-9',
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

// const buttonVariants = cva(
// 	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
// 	{
// 		variants: {
// 			variant: {
// 				default:
// 					'border bg-primary border-border-primary-dark text-primary-light hover:text-primary hover:bg-primary/0 hover:border-border-primary-dark dark:text-foreground-light dark:border-primary-light',
// 				destructive:
// 					'bg-destructive border border-destructive hover:border-destructive text-destructive-foreground hover:bg-destructive/40 hover:text-destructive',
// 				outline:
// 					'border border-border-primary text-primary hover:bg-primary-light/50 dark:border-primary-light dark:text-foreground-light dark:hover:text-foreground dark:hover:border-border-primary',
// 				secondary:
// 					'border bg-secondary-dark border-secondary-dark text-foreground-light hover:bg-white hover:border-border-secondary',
// 				ghost: 'bg-background hover:bg-accent hover:text-accent-foreground border-foreground-light',
// 				link: 'text-primary underline-offset-4 hover:underline',
// 				neutral: 'underline-offset-4 hover:underline',
// 			},
// 			size: {
// 				default: 'h-10 px-4 py-2',
// 				sm: 'h-8 rounded-md px-2',
// 				lg: 'h-11 rounded-md px-8',
// 				icon: 'h-8 w-8',
// 				iconCircle: 'h-8 w-8 rounded-full border',
// 				neutral: 'h-auto w-auto',
// 			},
// 		},
// 		defaultVariants: {
// 			variant: 'default',
// 			size: 'default',
// 		},
// 	},
// )

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean
	}) {
	const Comp = asChild ? Slot : 'button'

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	)
}

export { Button, buttonVariants }
