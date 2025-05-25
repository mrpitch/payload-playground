import { useEffect, useState } from 'react'
import { useDocumentInfo, usePayloadAPI } from '@payloadcms/ui'
import { renderEmailHtml } from '@/payload/utils/render-email'
import { ReactElement } from 'react'

interface UseEmailPreviewResult {
	html: string
	isLoading: boolean
	isError: boolean
}

interface UseEmailPreviewProps {
	component: (props: any) => Promise<ReactElement> | ReactElement
}

export function useEmailPreview({
	component: Component,
}: UseEmailPreviewProps): UseEmailPreviewResult {
	const [html, setHtml] = useState('')

	const { apiURL, collectionSlug, id } = useDocumentInfo()

	const tmp = useDocumentInfo()
	console.log('tmp', tmp)

	const locale = new URLSearchParams(apiURL?.split('?')[1] || '').get('locale') || 'en'
	const [{ data, isLoading, isError }] = usePayloadAPI(`/api/${collectionSlug}/${id}` || '', {
		initialParams: {
			depth: 2,
			locale,
		},
	})

	useEffect(() => {
		const renderPreview = async () => {
			if (!data?.content?.Template) return

			const { subject, salutation, layout } = data.content.Template
			const props = {
				subject,
				salutation,
				layout,
			}

			const element = await Component(props)
			const renderedHtml = await renderEmailHtml(element)
			setHtml(renderedHtml)
		}

		renderPreview()
	}, [Component, data])

	return {
		html,
		isLoading,
		isError,
	}
}
