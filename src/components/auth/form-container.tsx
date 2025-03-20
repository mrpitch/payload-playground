import Image from 'next/image'

import { Logo } from '@/components/ui/custom/logo'
import { Typography } from '@/components/ui/custom/typography'

export interface IContainerProps {
	children: React.ReactNode
	title: string
}

const FormContainer: React.FC<IContainerProps> = ({ children, title }) => {
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
						priority={true}
					/>
				</div>
			</div>
		</div>
	)
}

FormContainer.displayName = 'FormContainer'
export { FormContainer }
