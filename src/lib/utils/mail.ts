import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendPasswordResetEmail = async (email: string, token: string) => {
	const confirmLink = `${process.env.NEXTAUTH_URL}/new-password?token=${token}`

	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'Reset your password',
		text: `Click this link to reset your password: ${confirmLink}`,
	})
}

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = `${process.env.NEXTAUTH_URL}/new-verification?token=${token}`

	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'Verify your email',
		text: `Click this link to verify your email: ${confirmLink}`,
	})
}
