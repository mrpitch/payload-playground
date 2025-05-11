'use client'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/custom/icons'
export function DisablePreviewButton() {
	const pathname = usePathname()
	console.log('pathname', pathname)
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
