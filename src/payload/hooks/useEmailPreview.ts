import { useState, useEffect } from 'react'
import { renderEmail } from '@/payload/utils/renderEmail'
import { ReactElement } from 'react'

interface UseEmailPreviewProps<T> {
	component: (props: T) => Promise<ReactElement> | ReactElement
	props: T
	templateKey: string
}

export function useEmailPreview<T extends object>({
	component: Component,
	props,
	templateKey,
}: UseEmailPreviewProps<T>) {
	const [html, setHtml] = useState('')
	console.log('templateKey', templateKey)

	useEffect(() => {
		const renderPreview = async () => {
			const element = await Component(props)
			const renderedHtml = await renderEmail(element)
			setHtml(renderedHtml)
		}
		renderPreview()
	}, [Component, props])

	return html
}
