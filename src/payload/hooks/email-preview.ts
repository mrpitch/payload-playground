import { useState, useEffect } from 'react'
import { renderEmailHtml } from '@/payload/utils/render-email'
import { ReactElement } from 'react'
import { EmailTemplateType } from '@/payload/types/email-templates'
import {
	PasswordResetFields,
	VerifyEmailFields,
	NewsletterFields,
} from '@/payload/types/email-templates'

export type EmailComponentProps = {
	passwordReset: PasswordResetFields
	verifyEmail: VerifyEmailFields
	newsletter: NewsletterFields
}[EmailTemplateType]

interface UseEmailPreviewProps {
	component: (props: EmailComponentProps) => Promise<ReactElement> | ReactElement
	props: EmailComponentProps
	templateKey: EmailTemplateType
}

interface UseEmailPreviewResult {
	html: string
	isLoading: boolean
}

export function useEmailPreview({
	component: Component,
	props,
}: UseEmailPreviewProps): UseEmailPreviewResult {
	const [html, setHtml] = useState('')
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const renderPreview = async () => {
			try {
				setIsLoading(true)
				const element = await Component(props)
				const renderedHtml = await renderEmailHtml(element)
				setHtml(renderedHtml)
			} finally {
				setIsLoading(false)
			}
		}
		renderPreview()
	}, [Component, props])

	return { html, isLoading }
}
