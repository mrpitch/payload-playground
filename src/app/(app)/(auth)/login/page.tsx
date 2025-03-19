import { FormContainer } from '@/components/auth/form-container'
import { FormLogin } from '@/components/auth/form-login'

export default async function Login() {
	return (
		<FormContainer title="Sign in to your Account">
			<FormLogin />
		</FormContainer>
	)
}
