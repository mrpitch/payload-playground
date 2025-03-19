'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

import { Icon } from '@/components/ui/icons'

import { cn } from '@/lib/utils/cn'

const Checkbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
	<CheckboxPrimitive.Root
		ref={ref}
		className={cn(
			'focus-visible:ring-ring data-[state=checked]:text-primary-foreground peer h-4 w-4 shrink-0 rounded-xs border border-primary ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary',
			className
		)}
		{...props}
	>
		<CheckboxPrimitive.Indicator
			className={cn('text-current flex items-center justify-center')}
		>
			<Icon iconName="check" className="h-4 w-4" />
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
