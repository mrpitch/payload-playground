'use client'
import { useState } from 'react'
import { useAuth } from '@payloadcms/ui'

import type { User } from '@payload-types'

import { render } from '@react-email/render'

import { EmailPasswordReset } from '@/payload/emails/password-reset'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/custom/icons'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
const html = await render(
	<EmailPasswordReset
		username="John Doe"
		url="https://www.google.com"
		email="john.doe@example.com"
	/>,
	{
		pretty: true,
	},
)
const EmailPreview = () => {
	const [viewPort, setViewPort] = useState<'desktop' | 'mobile' | 'code'>('desktop')
	const { user } = useAuth<User>()

	if (!user) return null

	return (
		<div className="flex min-h-[500px] flex-col">
			<div className="flex items-center justify-end gap-2 p-4">
				<ToggleGroup
					type="single"
					variant="outline"
					value={viewPort}
					onValueChange={(value) => value && setViewPort(value as 'desktop' | 'mobile' | 'code')}
				>
					<ToggleGroupItem value="desktop">
						<Icon iconName="monitor" />
					</ToggleGroupItem>
					<ToggleGroupItem value="mobile">
						<Icon iconName="smartphone" />
					</ToggleGroupItem>
					<ToggleGroupItem value="code">
						<Icon iconName="code" />
					</ToggleGroupItem>
				</ToggleGroup>
				<Button variant="outline">Send</Button>
			</div>
			<div className="mx-auto flex-1 overflow-y-auto">
				{viewPort === 'desktop' ? (
					<iframe
						className="h-[calc(100vh_-_140px)] w-[640px] border-none lg:h-[calc(100vh_-_70px)]"
						srcDoc={html}
						title="Desktop"
					/>
				) : null}
				{viewPort === 'mobile' ? (
					<iframe
						className="mx-auto h-[calc(100vh_-_140px)] w-[360px] border-none lg:h-[calc(100vh_-_70px)]"
						srcDoc={html}
						title="Mobile"
					/>
				) : null}
				{viewPort === 'code' ? <CodePreview html={html} /> : null}
			</div>
		</div>
	)
}

export default EmailPreview

export const CodePreview = ({ html }: { html: string }) => {
	return (
		<div className="w-[640px]">
			<div className="flex items-center justify-end gap-2">
				<Button variant="outline" size="icon" onClick={() => copyHtmlToClipboard(html)}>
					<Icon iconName="clipboard" />
				</Button>
				<Button variant="outline" size="icon" onClick={() => downloadHtml(html, 'email.html')}>
					<Icon iconName="download" />
				</Button>
			</div>
			<code>
				<pre>{html}</pre>
			</code>
		</div>
	)
}

export const copyHtmlToClipboard = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text)
	} catch {
		throw new Error('Not able to copy')
	}
}

export const downloadHtml = async (text: string, filename: string) => {
	const blob = new Blob([text], { type: 'text/html' })
	const url = URL.createObjectURL(blob)
	const a = document.createElement('a')
	a.href = url
	a.download = filename
	a.click()
	URL.revokeObjectURL(url)
}
