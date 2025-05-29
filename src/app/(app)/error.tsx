'use client'
import { startTransition } from 'react'
import { useRouter } from 'next/navigation'

import { FormContainer } from '@/components/auth/form-container'
import { Button } from '@/components/ui/button'
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	const router = useRouter()

	const handleRetry = () => {
		startTransition(() => {
			router.refresh()
			reset()
		})
	}
	const { message } = error
	console.log('message', message)
	return (
		<FormContainer title={message}>
			<div className="flex flex-col gap-4">
				<Button onClick={handleRetry} variant="secondary">
					Try again
				</Button>
			</div>
		</FormContainer>
	)
}
