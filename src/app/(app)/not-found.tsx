import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { FormContainer } from '@/components/auth/form-container'
import { Button, buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Typography } from '@/components/ui/typography'

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
