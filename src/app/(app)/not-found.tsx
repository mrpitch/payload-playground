import { Metadata } from 'next'
import Link from 'next/link'

import { FormContainer } from '@/components/auth/form-container'
import { buttonVariants } from '@/components/ui/button'

export const metadata: Metadata = {
	title: 'Fehler 404 - Seite nicht gefunden',
	description: 'Die Seite konnte leider nicht gefunden werden (Fehler 404)',
}

export default function FourOFour() {
	return (
		<FormContainer title="Fehler 404 - Seite nicht gefunden">
			<div>
				<Link href="/" className={buttonVariants({ variant: 'outline' })}>
					Back to home
				</Link>
			</div>
		</FormContainer>
	)
}
