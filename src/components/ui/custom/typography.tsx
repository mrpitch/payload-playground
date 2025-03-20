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

	const componentProps: React.HTMLAttributes<HTMLElement> = {
		...props,
		className,
	}

	componentProps.className = cn(typographyVariants({ as, size }), className)

	return <Component {...componentProps}>{children}</Component>
}

const proseStyles = {
	default: 'prose prose-gray:text-grey-70',
	h3: 'prose-h3:text-2xl prose-h3:font-semibold',
	h4: 'prose-h4:text-xl prose-h4:font-regular',
	h5: 'prose-h5:text-lg prose-h5:font-regular',
	h6: 'prose-h6:text-base prose-h6:font-regular',
	p: 'prose-base:text-base prose-base:font-regular',
}

const proseTypography = cn(
	proseStyles.default,
	proseStyles.h3,
	proseStyles.h4,
	proseStyles.h5,
	proseStyles.h6,
	proseStyles.p,
)

Typography.displayName = 'Typography'
export { Typography, typographyVariants, proseTypography }
