import { cn } from '@/lib/utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'

const containerVariants = cva('mx-auto px-2 md:px-8', {
	variants: {
		variant: {
			default: 'max-w-screen-xl 2xl:max-w-screen-2xl',
			header: 'max-w-screen-2xl',
			footer: 'max-w-screen-2xl w-full mt-6 py-6',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

export interface IContainerProps
	extends React.HTMLAttributes<HTMLElement>,
		VariantProps<typeof containerVariants> {
	children: React.ReactNode
	as?: 'div' | 'main' | 'nav' | 'section' | 'footer' | 'header' | 'article'
}

const Container: React.FC<IContainerProps> = ({ className, as = 'div', children, ...props }) => {
	const Component = as === 'div' ? 'div' : as

	return (
		<Component
			className={cn(
				containerVariants({
					variant: as === 'header' ? 'header' : as === 'footer' ? 'footer' : 'default',
					className,
				}),
			)}
			{...props}
		>
			{children}
		</Component>
	)
}

Container.displayName = 'Container'
export { Container }
