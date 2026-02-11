'use client'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'

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
	const title = process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
	return (
		<FormContainer title={title}>
			<div className="flex flex-col gap-4">
				<Button onClick={handleRetry} variant="secondary">
					Try again
				</Button>
			</div>
		</FormContainer>
	)
}
