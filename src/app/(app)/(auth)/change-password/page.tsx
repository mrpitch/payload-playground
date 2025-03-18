import { Metadata } from 'next'

import { FormContainer } from '@/components/auth/form-container'
import { FormChangePassword } from '@/components/auth/form-change-password'

export const metadata: Metadata = {
	title: 'Password reset',
	description: 'Verify your email address',
}

interface Props {
	searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ChangePasswordPage({ searchParams }: Props) {
	const { token } = await searchParams
	return (
		<FormContainer title="Set your new password">
			<FormChangePassword token={token as string} />
		</FormContainer>
	)
}
