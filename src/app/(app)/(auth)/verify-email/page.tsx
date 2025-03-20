import { Metadata } from 'next'

import { verifyEmail } from '@/lib/actions/verify-email'

import { FormContainer } from '@/components/auth/form-container'
import VerifyEmail from '@/components/auth/verify-email'

export const metadata: Metadata = {
	title: 'E-Mail verification',
	description: 'Verify your email address',
}

type Props = {
	params: Promise<{ id: string }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function VerifyPage({ searchParams }: Props) {
	const { token } = await searchParams

	const { result, message } = await verifyEmail(token as string)

	return (
		<FormContainer title="E-Mail Verification">
			<VerifyEmail result={result} message={message} />
		</FormContainer>
	)
}
