'use client'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/custom/icons'

export function ExitPreviewButton() {
	const pathname = usePathname()

	const handleExitPreview = async () => {
		try {
			await fetch('/api/preview/disable', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ path: pathname }),
			})
			window.location.reload()
		} catch (error) {
			console.error('Error exiting preview mode:', error)
		}
	}

	return (
		<Button variant="ghost" size="icon" onClick={handleExitPreview}>
			<Icon iconName="monitorX" className="h-5 w-5" />
			<span className="sr-only">Exit preview mode</span>
		</Button>
	)
}
