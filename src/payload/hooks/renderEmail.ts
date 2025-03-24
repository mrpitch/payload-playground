import { render } from '@react-email/render'
import { ReactElement } from 'react'

export const renderEmail = async (email: ReactElement) => {
	if (!email) throw new Error('Email component is required')
	const html = await render(email, {
		pretty: true,
	})

	return html
}
