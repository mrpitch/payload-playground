'use client'
import { Fragment, useState } from 'react'

import type { Language } from 'prism-react-renderer'
import { Highlight } from 'prism-react-renderer'
import { cn } from '@/lib/utils/cn'

import { EmailPasswordReset } from '@/payload/email-templates/password-reset'
import { EmailVerifyAccount } from '@/payload/email-templates/verify-account'
import { useEmailPreview } from '@/payload/hooks/email-preview'
import { useAllFormFields } from '@payloadcms/ui'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/custom/icons'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export interface EmailTemplate<T extends Record<string, string> = Record<string, string>> {
	Template: {
		previewText: string
		heading: string
		salutation: string
		copy: string
		buttonLabel: string
		disclaimer: string
	} & T
}

type EmailPreviewProps = {
	type: 'passwordReset' | 'verifyEmail'
}

export const EmailPreview = ({ type }: EmailPreviewProps) => {
	const [viewPort, setViewPort] = useState<'desktop' | 'mobile' | 'code'>('desktop')

	const [fields] = useAllFormFields()

	const html = useEmailPreview({
		component: type === 'passwordReset' ? EmailPasswordReset : EmailVerifyAccount,
		props: {
			username: 'John Doe',
			url: 'https://www.google.com',
			email: 'john.doe@example.com',
			previewText: (fields?.[`${type}.Template.previewText`]?.value as string) || '',
			heading: (fields?.[`${type}.Template.heading`]?.value as string) || '',
			salutation: (fields?.[`${type}.Template.salutation`]?.value as string) || '',
			copy: (fields?.[`${type}.Template.copy`]?.value as string) || '',
			buttonLabel: (fields?.[`${type}.Template.buttonLabel`]?.value as string) || '',
			footer: (fields?.['footer.content']?.value as DefaultTypedEditorState) || {
				root: {
					children: [
						{
							children: [{ text: '' }],
							direction: null,
							format: '',
							indent: 0,
							type: 'paragraph',
							version: 1,
						},
					],
				},
			},
		},
		templateKey: type,
	})

	return (
		<div
			className="field-type group-field group-field--within-row group-field--within-tab min-h-[500px]"
			style={{ '--field-width': '50%' } as React.CSSProperties}
		>
			<div className="flex items-center justify-end gap-2 py-4">
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
				<Button variant="outline">Test Send</Button>
			</div>
			<div className="mx-auto">
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

export const verifyEmail = () => {
	return <EmailPreview type="verifyEmail" />
}

export const passwordReset = () => {
	return <EmailPreview type="passwordReset" />
}

export const newsletter = () => {
	return <EmailPreview type="passwordReset" />
}

export const CodePreview = ({ html }: { html: string }) => {
	return (
		<div className="border-border-foreground w-[640px] rounded-sm border p-4">
			<div className="flex items-center justify-end gap-2">
				<Button variant="outline" size="icon" onClick={() => copyHtmlToClipboard(html)}>
					<Icon iconName="clipboard" />
				</Button>
				<Button variant="outline" size="icon" onClick={() => downloadHtml(html, 'email.html')}>
					<Icon iconName="download" />
				</Button>
			</div>
			<Code>{html}</Code>
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

interface CodeProps {
	children: string
	className?: string
	language?: Language
}

export const Code: React.FC<Readonly<CodeProps>> = ({ children, language = 'html' }) => {
	const value = children.trim()

	return (
		<Highlight code={value} language={language}>
			{({ tokens, getLineProps, getTokenProps }) => (
				<>
					<div
						className="absolute top-0 right-0 h-px w-[200px]"
						style={{
							background:
								'linear-gradient(90deg, rgba(56, 189, 248, 0) 0%, rgba(56, 189, 248, 0) 0%, rgba(232, 232, 232, 0.2) 33.02%, rgba(143, 143, 143, 0.6719) 64.41%, rgba(236, 72, 153, 0) 98.93%)',
						}}
					/>
					<pre className="h-[640px] overflow-auto p-4">
						{tokens.map((line, i) => {
							const lineProps = getLineProps({
								line,
							})
							return (
								<div
									key={i}
									{...lineProps}
									className={cn('whitespace-pre', {
										"before:text-slate-11 before:mr-2 before:content-['$']":
											language === 'bash' && tokens.length === 1,
									})}
								>
									{line.map((token, key) => {
										const tokenProps = getTokenProps({
											token,
										})
										console.log('tokenProps', tokenProps)
										const isException = token.content === 'from' && line[key + 1]?.content === ':'
										const newTypes = isException ? [...token.types, 'key-white'] : token.types
										token.types = newTypes

										return (
											<Fragment key={key}>
												<span {...tokenProps} />
											</Fragment>
										)
									})}
								</div>
							)
						})}
					</pre>
					<div
						className="absolute bottom-0 left-0 h-px w-[200px]"
						style={{
							background:
								'linear-gradient(90deg, rgba(56, 189, 248, 0) 0%, rgba(56, 189, 248, 0) 0%, rgba(232, 232, 232, 0.2) 33.02%, rgba(143, 143, 143, 0.6719) 64.41%, rgba(236, 72, 153, 0) 98.93%)',
						}}
					/>
				</>
			)}
		</Highlight>
	)
}
