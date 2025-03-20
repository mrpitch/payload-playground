'use client'
import { useState } from 'react'

import Link from 'next/link'

import { cn } from '@/lib/utils/cn'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { changePassword } from '@/lib/actions/change-password'
import { changePasswordFormSchema } from '@/lib/schema/change-password.schema'
import type { TChangePasswordForm } from '@/lib/types'

import { Button, buttonVariants } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	//FormMessage,
} from '@/components/form/form'
import { FormMessage } from '@/components/form/form-message'
import { Icon } from '@/components/ui/custom/icons'
import { Input } from '@/components/ui/input'
import { typographyVariants } from '@/components/ui/custom/typography'

export function FormChangePassword({ token }: { token: string }) {
	const [success, setSuccess] = useState<string>('')

	const form = useForm<TChangePasswordForm>({
		resolver: zodResolver(changePasswordFormSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	})

	const {
		control,
		handleSubmit,
		setError,
		reset,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = form

	const onSubmit = async (values: TChangePasswordForm) => {
		await changePassword(values, token).then((res) => {
			const formError = res?.error
			console.log('formError', formError)
			if (formError) {
				setError('root.serverError', {
					type: 'server',
					message: formError.toString(),
				})
			}
			if (res?.success) {
				setSuccess(res.success)
				reset()
			}
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
				<div className="space-y-2">
					<div className="space-y-4">
						<FormField
							control={control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className={typographyVariants({ as: 'label' })}>Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="Password" {...field} />
									</FormControl>
									<FormMessage variant="error" />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input type="password" placeholder="Confirm Password" {...field} />
									</FormControl>
									<FormMessage variant="error" />
								</FormItem>
							)}
						/>
						{isSubmitSuccessful ? <FormMessage variant="success">{success}</FormMessage> : null}

						{errors.root?.serverError ? (
							<div className="space-y-1">
								<FormMessage variant="error">{errors.root?.serverError.message}</FormMessage>
								<Link
									className={cn(buttonVariants({ variant: 'neutral' }), 'px-0')}
									href="/reset-password"
								>
									Send Verification E-Mail again
								</Link>
							</div>
						) : null}
					</div>
				</div>
				<div className="w-full space-y-4">
					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? <Icon iconName="loader" className="mr-2 h-4 w-4 animate-spin" /> : null}
						Change Password
					</Button>
					<Link className={cn(buttonVariants({ variant: 'outline' }), 'w-full')} href="/login">
						Login
					</Link>
				</div>
			</form>
		</Form>
	)
}
