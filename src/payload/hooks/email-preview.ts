/**
 * A hook for previewing email templates in PayloadCMS.
 *
 * @template T - The type of email template ('newsletter' | 'verifyEmail' | 'passwordReset')
 *
 * @param props - The hook configuration
 * @param props.component - The email template component to render
 * @param props.type - The type of email template
 *
 * @returns {UseEmailPreviewResult} An object containing:
 *   - html: The rendered HTML string of the email template
 *   - isLoading: Boolean indicating if the template is currently loading
 *   - isError: Boolean indicating if an error occurred during loading
 *
 * @example
 * ```tsx
 * const { html, isLoading, isError } = useEmailPreview({
 *   component: NewsletterTemplate,
 *   type: 'newsletter'
 * });
 * ```
 */

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

// Result interface for the hook's return value
interface UseEmailPreviewResult {
	html: string
	isLoading: boolean
	isError: boolean
}

// Props interface for the hook configuration
export interface UseEmailPreviewProps<T extends TEmailTemplateType> {
	// Component can be either async or sync, returning a ReactElement
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
	// State for storing the rendered HTML
	const [html, setHtml] = useState('')
	// State for tracking previous saved data to prevent infinite loops
	const [prevSavedData, setPrevSavedData] = useState<any>(null)

	// Get document info from PayloadCMS
	const { apiURL, collectionSlug, id, savedDocumentData } = useDocumentInfo()
	// Extract locale from URL or default to 'en'
	const locale = new URLSearchParams(apiURL?.split('?')[1] || '').get('locale') || 'en'

	// Initial parameters for API requests
	const initialParams = { depth: 2, locale, draft: true }

	// Determine which API endpoint to use based on template type
	const apiPath =
		type === 'newsletter' ? `/api/${collectionSlug}/${id}` : `/api/globals/e-mail-templates`

	// Fetch email template data with live preview support
	const [
		{ data: templateData, isLoading: isTemplateLoading, isError: isTemplateError },
		{ setParams },
	] = usePayloadAPI(apiPath, {
		initialParams,
	})

	// Fetch footer data (required for all email types)
	const [{ data: footerData, isLoading: isFooterLoading, isError: isFooterError }] = usePayloadAPI(
		'/api/globals/e-mail-templates',
		{
			initialParams,
		},
	)

	// Combine loading and error states
	const isLoading = isTemplateLoading || isFooterLoading
	const isError = isTemplateError || isFooterError

	useEffect(() => {
		// Function to force a re-fetch of template data
		const handleSave = () => {
			setParams((prev: Record<string, unknown>) => ({
				...prev,
				_ts: Date.now(), // Add timestamp to force re-fetch
			}))
		}

		// Only trigger handleSave when savedDocumentData actually changes
		if (savedDocumentData && JSON.stringify(savedDocumentData) !== JSON.stringify(prevSavedData)) {
			handleSave()
			setPrevSavedData(savedDocumentData)
		}

		// Function to render the email preview
		const renderPreview = async () => {
			if (!templateData || !footerData) return

			// Get template based on type
			const template =
				type === 'newsletter' ? templateData.content?.Template : footerData[type]?.Template

			const footer = footerData.footer

			if (!template) return

			// Create base props shared across all template types
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

			// Render the component and convert to HTML
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
	}, [Component, templateData, footerData, type, savedDocumentData])

	return {
		html,
		isLoading,
		isError,
	}
}
