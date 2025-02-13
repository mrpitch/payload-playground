import Image from 'next/image'

import { cn } from '@/lib/utils/cn'

import { Logo } from '@/components/ui/logo'
import { Typography } from '@/components/ui/typography'

export interface IContainerProps {
	children: React.ReactNode
	className?: string
	title: string
}

const FormContainer: React.FC<IContainerProps> = ({
	className,
	children,
	title,
	...props
}) => {
	const baseStyles = {
		default: '',
	}

	className = cn(baseStyles.default, className)

	return (
		<div className="flex min-h-screen flex-1">
			<div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
				<div className="mx-auto w-full max-w-sm lg:w-96">
					<div className="mb-12">
						<Logo className="mx-auto mb-8" />
						<Typography as="h2" size="4xl" className="text-center">
							{title}
						</Typography>
					</div>
					{children}
				</div>
			</div>

			<div className="relative hidden w-0 flex-1 lg:block">
				<div className="relative h-full w-full">
					<Image
						className="absolute inset-0 object-cover"
						src="/images/bg_form_sunset.webp"
						alt="My Account"
						fill={true}
					/>
				</div>
			</div>
		</div>
	)
}

FormContainer.displayName = 'FormContainer'
export { FormContainer }
