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

const typographyVariants = cva('text-foreground', {
	variants: {
		as: {
			h1: 'text-4xl font-light mb-6',
			h2: 'text-3xl font-light mb-4',
			h3: 'text-2xl font-semibold mb-2',
			h4: 'text-xl font-regular mb-2',
			h5: 'text-lg font-regular mb-2',
			h6: 'text-base font-regular mb-2',
			p: 'text-base font-regular mb-4',
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
	default: 'prose dark:prose-invert prose-gray',
	h2: 'prose-h2:text-3xl prose-h2:font-light prose-h2:font-normal prose-h2:mb-4 prose-h2:mt-0',
	h3: 'prose-h3:text-2xl prose-h3:font-semibold prose-h3:font-normal prose-h3:mb-2 prose-h3:mt-0',
	h4: 'prose-h4:text-xl prose-h4:font-regular prose-h4:mb-2',
	h5: 'prose-h5:text-lg prose-h5:font-regular prose-h5:mb-2',
	h6: 'prose-h6:text-base prose-h6:font-regular prose-h6:mb-2',
	p: 'prose-p:text-base prose-p:font-regular prose-p:mb-2',
	a: 'prose-a:hover:no-underline',
	ul: 'prose-ul:list-disc prose-ul:pl-4 prose-ul:ml-4 prose-ul:mb-2 prose-ul:mt-2',
	ol: 'prose-ol:list-decimal prose-ol:pl-4 prose-ol:ml-4 prose-ol:mb-2 prose-ol:mt-2',
	li: 'prose-li:my-0',
	em: 'prose-em:font-light prose-em:italic',
	strong: 'prose-strong:font-semibold',
	blockquote:
		'prose-blockquote:text-foreground prose-blockquote:font-light prose-blockquote:italic prose-blockquote:border-l-2 prose-blockquote:border-primary prose-blockquote:pl-4',
	code: 'prose-code:text-foreground prose-code:font-regular prose-code:bg-background prose-code:rounded-md prose-code:p-1',
}

const proseTypography = cn(
	proseStyles.default,
	proseStyles.h2,
	proseStyles.h3,
	proseStyles.h4,
	proseStyles.h5,
	proseStyles.h6,
	proseStyles.p,
	proseStyles.a,
	proseStyles.ul,
	proseStyles.ol,
	proseStyles.li,
	proseStyles.em,
	proseStyles.strong,
	proseStyles.blockquote,
	proseStyles.code,
)

Typography.displayName = 'Typography'
export { Typography, typographyVariants, proseTypography }
