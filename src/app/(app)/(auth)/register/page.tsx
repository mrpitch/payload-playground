import { FormContainer } from '@/components/auth/form-container'
import { FormRegister } from '@/components/auth/form-register'

export default async function Register() {
	return (
		<FormContainer title="Create new Account">
			<FormRegister />
		</FormContainer>
	)
}
