import { render } from '@react-email/render'
import { ReactElement } from 'react'

export const renderEmail = async (email: ReactElement) => {
	if (!email) throw new Error('Email component is required')
	const html = await render(email, {
		pretty: true,
	})

	return html
}

export function getEmailSubject({ subject, username }: { subject: string; username: string }) {
	return `Hi ${username}, ${subject}`
}

export const getEmailContents = async () => {
	const req = await fetch(`/api/globals/e-mail-templates`, {
		method: 'GET',
		credentials: 'include',
	})
	const data = await req.json()
	console.log('data', data)
	return data
}
