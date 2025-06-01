import { useEffect, useState } from 'react'
import { useDocumentInfo, usePayloadAPI } from '@payloadcms/ui'
import { renderEmailHtml } from '@/payload/utils/render-email'
import { ReactElement } from 'react'
import {
	TEmailTemplateType,
	TPasswordResetProps,
	TVerifyEmailProps,
	TNewsletterProps,
} from '@/payload/types/email-templates'

interface UseEmailPreviewResult {
	html: string
	isLoading: boolean
	isError: boolean
}

export interface UseEmailPreviewProps<T extends TEmailTemplateType> {
	component: (
		props: T extends 'newsletter'
			? TNewsletterProps
			: T extends 'verifyEmail'
				? TVerifyEmailProps
				: TPasswordResetProps,
	) => Promise<ReactElement> | ReactElement
	type: T
}

export function useEmailPreview<T extends TEmailTemplateType>({
	component: Component,
	type,
}: UseEmailPreviewProps<T>): UseEmailPreviewResult {
	const [html, setHtml] = useState('')
	const { apiURL, collectionSlug, id } = useDocumentInfo()
	const locale = new URLSearchParams(apiURL?.split('?')[1] || '').get('locale') || 'en'

	const initialParams = { depth: 2, locale, draft: true }
	// Determine API path based on type
	const apiPath =
		type === 'newsletter' ? `/api/${collectionSlug}/${id}` : `/api/globals/e-mail-templates`

	// Fetch email template data
	const [{ data: templateData, isLoading: isTemplateLoading, isError: isTemplateError }] =
		usePayloadAPI(apiPath, {
			initialParams,
		})

	// Fetch footer data (needed for all types)
	const [{ data: footerData, isLoading: isFooterLoading, isError: isFooterError }] = usePayloadAPI(
		'/api/globals/e-mail-templates',
		{
			initialParams,
		},
	)

	// console.log('templateData', templateData)
	// console.log('footerData', footerData)

	const isLoading = isTemplateLoading || isFooterLoading
	const isError = isTemplateError || isFooterError

	useEffect(() => {
		const renderPreview = async () => {
			if (!templateData || !footerData) return

			// For newsletter, templateData should have the content
			// For transactional emails, we need to get the template from footerData
			const template =
				type === 'newsletter' ? templateData.content?.Template : footerData[type]?.Template

			const footer = footerData.footer

			if (!template) return

			// Create base props
			const baseProps = {
				subject: template.subject,
				salutation: template.salutation,
				footer,
			}

			// Create type-specific props
			const props =
				type === 'newsletter'
					? ({
							...baseProps,
							previewText: template.previewText,
							layout: template.layout,
						} as TNewsletterProps)
					: ({
							...baseProps,
							heading: template.heading,
							copy: template.copy,
							buttonLabel: template.buttonLabel,
							url: template.url,
							previewText: template.previewText,
						} as TPasswordResetProps | TVerifyEmailProps)

			const element = await Component(
				props as T extends 'newsletter'
					? TNewsletterProps
					: T extends 'verifyEmail'
						? TVerifyEmailProps
						: TPasswordResetProps,
			)
			const renderedHtml = await renderEmailHtml(element)
			setHtml(renderedHtml)
		}

		renderPreview()
	}, [Component, templateData, footerData, type])

	return {
		html,
		isLoading,
		isError,
	}
}
