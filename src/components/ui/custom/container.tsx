import { cn } from '@/lib/utils/cn'

export interface IContainerProps {
	children: React.ReactNode
	as?: 'div' | 'main' | 'nav' | 'section' | 'footer' | 'header'
	className?: string
}

const Container: React.FC<IContainerProps> = ({ className, as = 'div', children, ...props }) => {
	const baseStyles = {
		default: 'mx-auto px-2 md:px-8',
	}

	className = cn(baseStyles.default, className)

	const Component = as === 'div' ? 'div' : as

	return (
		<Component className={className} {...props}>
			{children}
		</Component>
	)
}

Container.displayName = 'Container'
export { Container }
