import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

export interface ITypographyProps
	extends React.HTMLAttributes<HTMLElement>,
		VariantProps<typeof typographyVariants> {
	children: React.ReactNode
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'label'
	size?: 'sm' | 'xs' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
	className?: string
}

const typographyVariants = cva('text-grey-70', {
	variants: {
		as: {
			h1: 'text-4xl font-light',
			h2: 'text-3xl font-light',
			h3: 'text-2xl font-semibold',
			h4: 'text-xl font-regular',
			h5: 'text-lg font-regular',
			h6: 'text-base font-regular',
			p: 'text-base font-regular',
			label: 'text-base font-light',
		},
		size: {
			sm: 'text-sm',
			xs: 'text-xs',
			base: 'text-base',
			lg: 'text-lg',
			xl: 'text-xl',
			'2xl': 'text-2xl',
			'3xl': 'text-3xl',
			'4xl': 'text-4xl',
		},
	},
})
const Typography: React.FC<ITypographyProps> = ({
	className,
	as = 'p',
	size,
	children,
	...props
}) => {
	const Component = as === 'p' ? 'p' : as

	const componentProps: Record<string, any> = {
		...props,
		className,
	}

	componentProps.className = cn(typographyVariants({ as, size }), className)

	return <Component {...componentProps}>{children}</Component>
}

Typography.displayName = 'Typography'
export { Typography, typographyVariants }
