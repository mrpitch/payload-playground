'use client'
import { useState } from 'react'

import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { resetPassword } from '@/lib/actions/reset-password'
import { resetPasswordFormSchema } from '@/lib/schema/reset-password.schema'
import type { TResetPasswordForm } from '@/lib/types'

import { cn } from '@/lib/utils/cn'

import { Button, buttonVariants } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/form/form'
import { FormMessage } from '@/components/form/form-message'
import { Icon } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { typographyVariants } from '@/components/ui/typography'

export const ResetPasswordForm = () => {
	const [success, setSuccess] = useState<string>('')

	const form = useForm<TResetPasswordForm>({
		resolver: zodResolver(resetPasswordFormSchema),
		defaultValues: {
			email: '',
		},
	})

	const {
		control,
		handleSubmit,
		setError,
		reset,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = form

	async function onSubmit(values: TResetPasswordForm) {
		await resetPassword(values).then((res) => {
			const fieldErrors = res?.errors?.fieldErrors
			const formError = res?.error

			if (fieldErrors) {
				if (fieldErrors.email) {
					setError('email', {
						type: 'server',
						message: fieldErrors.email[0].toString(),
					})
				}
			}
			if (formError) {
				setError('root.serverError', {
					type: 'server',
					message: formError.toString(),
				})
			}

			if (res?.success) {
				setSuccess(res?.success)
				reset()
			}
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
				<div className="space-y-2">
					<div className="space-y-4">
						<FormField
							control={control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className={typographyVariants({ as: 'label' })}>E-Mail</FormLabel>
									<FormControl>
										<Input placeholder="E-Mail" {...field} />
									</FormControl>
									<FormMessage variant="error" />
								</FormItem>
							)}
						/>
						{errors.root?.serverError ? (
							<FormMessage variant="error">{errors.root?.serverError.message}</FormMessage>
						) : null}
						{isSubmitSuccessful ? <FormMessage variant="success">{success}</FormMessage> : null}
					</div>
				</div>
				<div className="w-full space-y-6">
					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? <Icon iconName="loader" className="mr-2 h-4 w-4 animate-spin" /> : null}
						Send reset email
					</Button>
					<Link className={cn(buttonVariants({ variant: 'neutral' }), 'w-full')} href="/login">
						Back to login
					</Link>
				</div>
			</form>
		</Form>
	)
}
