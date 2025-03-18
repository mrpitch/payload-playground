export const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}`

export const revalidate = !process.env.NEXT_PUBLIC_REVALIDATE
	? 0
	: parseInt(process.env.NEXT_PUBLIC_REVALIDATE)

export const formMessages = {
	error: {
		emailNotExists: 'Email does not exist!',
		emailInUse: 'Email already in use!',
		emailInUseByProvider: 'Email already in use by provider account!',
		emailNotVerified: 'Email not verified. Please verify your email to login.',
		credentialsInvalid: 'Invalid email or password.',
		somethingWrong: 'Something went wrong!',
		tokenNotExists: 'Invalid or expired verification token.',
		tokenExpired: 'Expired verification token.',
		tokenMissing: 'No token provided.',
		failedToVerify: 'Failed to verify email',
	},
	success: {
		emailConfirmationSent:
			'Confirmation email sent! Please check your E-Mail Inbox. Sometimes the verification email might be in the spam folder.',
		emailConfirmationSentAgain: 'Email exists, but not verified. Confirmation email sent again!',
		emailVerified: 'Email verified successfully',
		emailResetSend: 'Password reset email sent!',
		passwordUpdated: 'Password updated!',
	},
	validation: {
		emailNotValid: 'Please enter a valid email address.',
		passwordLength: 'Password must be at least 4 characters.',
		passwordNotMatch: 'Passwords do not match.',
	},
}
