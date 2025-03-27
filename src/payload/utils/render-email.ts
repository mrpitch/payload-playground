import { ReactElement } from 'react'

import { render } from '@react-email/render'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { PayloadRequest } from 'payload'
import type { User } from '@payload-types'

interface EmailTemplateProps {
	url: string
	email: string
	username: string
	previewText: string
	heading: string
	salutation: string
	copy: string
	buttonLabel: string
	footer: DefaultTypedEditorState
}

export const renderEmailHtml = async (email: ReactElement) => {
	if (!email) throw new Error('Email component is required')
	const html = await render(email, {
		pretty: true,
	})

	return html
}

export const getEmailContents = async (req: PayloadRequest) => {
	const data = await req?.payload.findGlobal({ slug: 'e-mail-templates' })

	return data
}

export const getEmailSubject = async (args?: {
	token?: string
	user?: User
	req?: PayloadRequest
}) => {
	if (!args?.token || !args?.user || !args?.req) return ''
	const { user, req } = args
	const data = await getEmailContents(req)
	const subject = data?.passwordReset?.Template?.subject || 'Reset your password'
	const username = user?.firstName || ''
	return `Hi ${username}, ${subject}`
}

export const renderEMail = async (args?: {
	req?: PayloadRequest
	token?: string
	user?: User
	EmailTemplate: (props: EmailTemplateProps) => ReactElement
	type: 'verifyEmail' | 'passwordReset'
}) => {
	if (!args?.token || !args?.user || !args?.req) return ''
	const { token, user, req, EmailTemplate, type } = args
	const url = `${process.env.NEXT_PUBLIC_URL}/change-password?token=${token}`
	const data = await getEmailContents(req)
	const previewText = data?.[type]?.Template?.previewText || ''
	const heading = data?.[type]?.Template?.heading || ''
	const salutation = data?.[type]?.Template?.salutation || ''
	const copy = data?.[type]?.Template?.copy || ''
	const buttonLabel = data?.[type]?.Template?.buttonLabel || ''
	const footer = data?.footer?.content || ''

	return await render(
		EmailTemplate({
			url,
			email: user.email,
			username: user.firstName,
			previewText,
			heading,
			salutation,
			copy,
			buttonLabel,
			footer,
		}),
	)
}
