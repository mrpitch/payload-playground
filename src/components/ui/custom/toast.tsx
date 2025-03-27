'use client'
import { Toaster as Sonner, toast as sonnerToast } from 'sonner'
import { cn } from '@/lib/utils/cn'
import { cva } from 'class-variance-authority'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/custom/icons'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
	return (
		<Sonner
			toastOptions={{
				unstyled: true,
				duration: 3000,
			}}
			{...props}
		/>
	)
}

interface ToastProps {
	id: string | number
	title: string
	description?: string
	button?: {
		label: string
		onClick: () => void
	}
	dismiss?: boolean
	type: 'success' | 'error' | 'info' | 'warning' | 'default'
	className?: string
}

function toast(toast: Omit<ToastProps, 'id'>) {
	const { title, description, button, type, dismiss } = toast

	return sonnerToast.custom((id) => (
		<Toast
			id={id}
			type={type}
			title={title}
			dismiss={dismiss ?? false}
			description={description ? description : undefined}
			button={
				button
					? {
							label: button?.label,
							onClick: button?.onClick,
						}
					: undefined
			}
		/>
	))
}

/** A fully custom toast that still maintains the animations and interactions. */
function Toast(props: ToastProps) {
	const { title, description, button, id, type, dismiss } = props
	const toastVariants = cva(
		'isolate border-solid group pointer-events-auto relative flex w-[300px] items-center justify-between space-x-2 rounded-md border border-accent-foreground p-4 pr-6 shadow-lg',
		{
			variants: {
				variant: {
					success: 'bg-success-background text-success-foreground border-success-border',
					error: 'bg-error-background text-error-foreground border-error-border',
					info: 'bg-info-background text-info-foreground border-info-border',
					warning: 'bg-warning-background text-warning-foreground border-warning-border',
					default: 'bg-background text-foreground border-border',
				},
			},
			defaultVariants: {
				variant: 'default',
			},
		},
	)

	const icon = {
		success: 'checkCircle',
		error: 'xCircle',
		info: 'info',
		warning: 'alertTriangle',
	} as const

	const iconClass = cva('flex h-6 w-6 items-center justify-center', {
		variants: {
			variant: {
				success: 'text-success-foreground',
				error: 'text-error-foreground',
				info: 'text-info-foreground',
				warning: 'text-warning-foreground',
				default: 'text-foreground',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	})
	return (
		<div className={cn(toastVariants({ variant: type }))}>
			{dismiss ? (
				<button
					type="button"
					className="bg-background text-foreground absolute -top-2 -left-2 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border"
					onClick={() => sonnerToast.dismiss(id)}
				>
					<Icon iconName="x" className="h-6 w-6" />
				</button>
			) : null}
			<div className="flex items-center justify-start gap-2">
				{type !== 'default' ? (
					<Icon iconName={icon[type]} className={iconClass({ variant: type })} />
				) : null}
				<div className="flex-grow">
					<p className="text-sm font-medium">{title}</p>
					{description ? <p className="mt-1 text-sm">{description}</p> : null}
				</div>
			</div>
			{button ? (
				<div>
					<Button
						variant="outline"
						onClick={() => {
							button.onClick()
							sonnerToast.dismiss(id)
						}}
					>
						{button.label}
					</Button>
				</div>
			) : null}
		</div>
	)
}

export { Toaster, toast }
