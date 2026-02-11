'use client'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/custom/icons'
export function DisablePreviewButton() {
	const handleDisablePreview = async () => {
		try {
			await fetch('/api/preview/disable', { method: 'GET' })
			window.location.reload()
		} catch (error) {
			console.error('Error exiting preview mode:', error)
		}
	}

	return (
		<Button variant="ghost" size="icon" onClick={handleDisablePreview}>
			<Icon iconName="monitorX" className="h-5 w-5" />
			<span className="sr-only">Exit preview mode</span>
		</Button>
	)
}
