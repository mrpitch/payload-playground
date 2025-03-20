'use client'
import { useState } from 'react'

import Link from 'next/link'

import { cn } from '@/lib/utils/cn'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { register } from '@/lib/actions/register'
import { registerFormSchema } from '@/lib/schema/register.schema'
import type { TRegisterForm } from '@/lib/types'

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
import { typographyVariants } from '../ui/custom/typography'

export function FormRegister() {
	const [success, setSuccess] = useState<string>('')

	const form = useForm<TRegisterForm>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	const {
		control,
		handleSubmit,
		setError,
		reset,
		formState: { isSubmitting, isSubmitSuccessful },
	} = form

	const onSubmit = async (values: TRegisterForm) => {
		await register(values).then((res) => {
			const errors = res.errors

			if (errors) {
				if (errors.fieldErrors.email) {
					setError('email', {
						type: 'server',
						message: errors.fieldErrors.email[0].toString(),
					})
				}
			}
			if (res.success) {
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
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel className={typographyVariants({ as: 'label' })}>First Name</FormLabel>
									<FormControl>
										<Input placeholder="Name" {...field} />
									</FormControl>
									<FormMessage variant="error" />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="lastName"
							render={({ field }) => (
								<FormItem>
									<FormLabel className={typographyVariants({ as: 'label' })}>Last Name</FormLabel>
									<FormControl>
										<Input placeholder="Name" {...field} />
									</FormControl>
									<FormMessage variant="error" />
								</FormItem>
							)}
						/>
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
					</div>
				</div>
				<div className="w-full space-y-4">
					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? <Icon iconName="loader" className="mr-2 h-4 w-4 animate-spin" /> : null}
						Register
					</Button>
					<Link className={cn(buttonVariants({ variant: 'outline' }), 'w-full')} href="/login">
						Login
					</Link>
				</div>
			</form>
		</Form>
	)
}
