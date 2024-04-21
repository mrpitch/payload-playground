export const revalidate = !process.env.NEXT_PUBLIC_REVALIDATE
	? 0
	: parseInt(process.env.NEXT_PUBLIC_REVALIDATE)

export const formMessages = {
	error: {
		emailNotExists: 'Email does not exist!',
		emailInUse: 'Email already in use!',
		emailInUseByProvider: 'Email already in use by provider account!',
		credentialsInvalid: 'Invalid email or password!',
		somethingWrong: 'Something went wrong!',
		tokenNotExists: 'Token does not exist!',
		tokenExpired: 'Token has expired!',
		tokenMissing: 'Token is missing!',
	},
	success: {
		emailConfirmationSent: 'Confirmation email sent!',
		emailConfirmationSentAgain:
			'Email exists, but not verified. Confirmation email sent again!',
		emailVerified: 'Email verified!',
		emailResetSend: 'Password reset email sent!',
		passwordUpdated: 'Password updated!',
	},
	validation: {
		emailNotValid: 'Please enter a valid email address.',
		passwordLength: 'Password must be at least 4 characters.',
		passwordNotMatch: 'Passwords do not match.',
	},
}
