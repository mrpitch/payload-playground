import { FormContainer } from '@/components/auth/form-container'
import { ResetPasswordForm } from '@/components/auth/form-reset-password'

export default async function ResetPasswordPage() {
	return (
		<FormContainer title="Reset your password">
			<ResetPasswordForm />
		</FormContainer>
	)
}
