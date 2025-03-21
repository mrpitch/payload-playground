'use client'
import { useState } from 'react'

import { redirect } from 'next/navigation'
import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { login } from '@/lib/actions/login'
import { loginFormSchema } from '@/lib/schema/login.schema'
import type { TLoginForm } from '@/lib/types'
import { DEFAULT_LOGIN_REDIRECT } from '@/lib/routes'

import { cn } from '@/lib/utils/cn'

import { Button, buttonVariants } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/form/form'
import { Icon } from '@/components/ui/custom/icons'
import { Input } from '@/components/ui/input'
import { FormMessage } from '@/components/form/form-message'
import { typographyVariants } from '@/components/ui/custom/typography'

export function FormLogin() {
	const [success, setSuccess] = useState<string>('')

	const form = useForm<TLoginForm>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const {
		control,
		handleSubmit,
		setError,
		reset,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = form

	async function onSubmit(values: TLoginForm) {
		await login(values).then((res) => {
			const fieldErrors = res?.errors?.fieldErrors
			const formError = res?.error
			if (fieldErrors) {
				if (fieldErrors.email) {
					setError('email', {
						type: 'server',
						message: fieldErrors.email[0].toString(),
					})
				}
				if (fieldErrors.password) {
					setError('password', {
						type: 'server',
						message: fieldErrors.password[0].toString(),
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
				setSuccess('Login successful')
				reset()
				redirect(DEFAULT_LOGIN_REDIRECT)
			}
		})
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
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
						<div>
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
							<Link
								className={cn(buttonVariants({ variant: 'neutral' }), 'px-0')}
								href="/reset-password"
							>
								Forgot password?
							</Link>
						</div>
						{errors.root?.serverError ? (
							<FormMessage variant="error">{errors.root?.serverError.message}</FormMessage>
						) : null}

						{isSubmitSuccessful ? <FormMessage variant="success">{success}</FormMessage> : null}
					</div>
					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? <Icon iconName="loader" className="mr-2 h-4 w-4 animate-spin" /> : null}
						Login
					</Button>
				</form>
			</Form>
			<div className="mt-6 space-y-6">
				<Link className={cn(buttonVariants({ variant: 'neutral' }), 'w-full')} href="/register">
					Create new Account
				</Link>
			</div>
		</>
	)
}
