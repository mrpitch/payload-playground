'use client'
import { useAuth } from '@payloadcms/ui'

import type { User, Media } from '@payload-types'

const NewsletterPreview = () => {
	const { user } = useAuth<User>()

	if (!user) return null

	const avatar = user.avatar as Media

	return (
		<div>
			<h2>Hi {user.firstName} this is the newsletter preview</h2>
		</div>
	)
}

export default NewsletterPreview
