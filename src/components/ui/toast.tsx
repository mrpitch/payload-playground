'use client'
//import { useThemeStore } from '@/lib/store/themeStore'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
	//const { theme } = useThemeStore()
	return (
		<Sonner
			toastOptions={{
				unstyled: true,
			}}
			// className="toaster group"
			// toastOptions={{
			// 	classNames: {
			// 		toast:
			// 			'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
			// 		description: 'group-[.toast]:text-primary',
			// 		actionButton:
			// 			'group-[.toast]:bg-primary group-[.toast]:text-secondary',
			// 		cancelButton:
			// 			'group-[.toast]:bg-input-muted group-[.toast]:text-input-muted',
			// 	},
			// }}
			{...props}
		/>
	)
}

export { Toaster }
