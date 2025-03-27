import { useState, useEffect } from 'react'
import { renderEmailHtml } from '@/payload/utils/render-email'
import { ReactElement } from 'react'

interface UseEmailPreviewProps<T> {
	component: (props: T) => Promise<ReactElement> | ReactElement
	props: T
	templateKey: string
}

interface UseEmailPreviewResult {
	html: string
	isLoading: boolean
}

export function useEmailPreview<T extends object>({
	component: Component,
	props,
}: UseEmailPreviewProps<T>): UseEmailPreviewResult {
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
