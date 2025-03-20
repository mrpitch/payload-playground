import { Typography } from '@/components/ui/custom/typography'
import { EmailPasswordResetPreview } from '@/payload/emails/password-reset'
import { EmailVerifyAccountPreview } from '@/payload/emails/verify-account'

export default async function EmailPreviewPage() {
	return (
		<>
			<Typography as="h1" className="mb-8">
				Email Preview
			</Typography>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<EmailPasswordResetPreview
					url="https://example.com"
					email="test@example.com"
					username="John Doe"
				/>
				<EmailVerifyAccountPreview
					url="https://example.com"
					email="test@example.com"
					username="John Doe"
				/>
			</div>
		</>
	)
}
