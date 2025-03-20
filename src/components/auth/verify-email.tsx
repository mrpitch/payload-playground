'use client'
import Link from 'next/link'

import { Button, buttonVariants } from '@/components/ui/button'
import { Message } from '@/components/form/form-message'

export default function VerifyEmail({ result, message }: { result: boolean; message: string }) {
	return (
		<div>
			{result === true ? (
				<>
					<Message variant="success">{message}</Message>
					<Link href="/login" className={`${buttonVariants({ variant: 'outline' })} mt-6`}>
						Back to login
					</Link>
				</>
			) : (
				<>
					<Message variant="error">{message}</Message>
					<Button
						variant="outline"
						className="mt-6"
						onClick={() => {
							alert('TBD: Send verification email again')
						}}
					>
						Send verification email again
					</Button>
				</>
			)}
		</div>
	)
}
