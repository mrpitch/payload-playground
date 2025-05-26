import { useEffect, useState } from 'react'
import { useDocumentInfo, usePayloadAPI } from '@payloadcms/ui'
import { renderEmailHtml } from '@/payload/utils/render-email'
import { ReactElement } from 'react'
import { EmailTemplateType } from '../types/email-templates'

interface UseEmailPreviewResult {
	html: string
	isLoading: boolean
	isError: boolean
}

interface UseEmailPreviewProps {
	component: (props: any) => Promise<ReactElement> | ReactElement
	type: EmailTemplateType
}

interface UseEmailPreviewResult {
	html: string
	isLoading: boolean
	isError: boolean
}

export function useEmailPreview({
	component: Component,
	type,
}: UseEmailPreviewProps): UseEmailPreviewResult {
	const [html, setHtml] = useState('')
	const { apiURL, collectionSlug, id, docConfig } = useDocumentInfo()
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
			console.log('template', template.layout)

			// Map data based on type
			const props =
				type === 'newsletter'
					? {
							subject: template.subject,
							salutation: template.salutation,
							layout: template.layout,
							footer,
						}
					: {
							subject: template.subject,
							salutation: template.salutation,
							heading: template.heading,
							copy: template.copy,
							buttonLabel: template.buttonLabel,
							url: template.url,
							footer,
						}

			console.log('props', props)
			const element = await Component(props)
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
