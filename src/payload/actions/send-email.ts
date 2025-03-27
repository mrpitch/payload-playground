'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendEmailParams {
	to: string
	subject: string
	html: string
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
	try {
		await resend.emails.send({
			from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
			to,
			subject,
			html,
		})

		return { success: true }
	} catch (error) {
		console.error('Failed to send email:', error)
		throw new Error('Failed to send email')
	}
}
