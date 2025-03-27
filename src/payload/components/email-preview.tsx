'use client'
import { Fragment, useState, useCallback, useMemo } from 'react'

import type { Language } from 'prism-react-renderer'
import { Highlight } from 'prism-react-renderer'
import { cn } from '@/lib/utils/cn'

import { EmailPasswordReset } from '@/payload/email-templates/password-reset'
import { EmailVerifyAccount } from '@/payload/email-templates/verify-account'
import { useEmailPreview } from '@/payload/hooks/email-preview'
import { useAllFormFields } from '@payloadcms/ui'
import { sendEmail } from '@/payload/actions/send-email'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/custom/icons'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { toast } from '@/components/ui/custom/toast'

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

const TestEmailPopover = ({ html }: { html: string }) => {
	const [testEmail, setTestEmail] = useState('')
	const [isSending, setIsSending] = useState(false)
	const [openPopover, setOpenPopover] = useState(false)

	const handleSendTestEmail = useCallback(async () => {
		if (!testEmail) {
			toast({
				title: 'Please enter an email address',
				type: 'error',
			})
			return
		}

		try {
			setIsSending(true)
			await sendEmail({
				to: testEmail,
				subject: 'Test Email',
				html,
			})
			toast({
				title: 'Email sent successfully',
				type: 'success',
			})
		} catch (err) {
			console.error('Failed to send email:', err)
			toast({
				title: 'Failed to send email',
				description: err instanceof Error ? err.message : 'An unknown error occurred',
				type: 'error',
			})
		} finally {
			setIsSending(false)
			setOpenPopover(false)
		}
	}, [testEmail, html])

	return (
		<Popover open={openPopover} onOpenChange={setOpenPopover}>
			<PopoverTrigger asChild>
				<Button variant="outline" type="button">
					Test
				</Button>
			</PopoverTrigger>
			<PopoverContent align="end" className="w-80">
				<div className="grid gap-4">
					<div className="space-y-2">
						<Input
							id="test-email"
							type="email"
							placeholder="Enter email address"
							value={testEmail}
							onChange={(e) => setTestEmail(e.target.value)}
						/>
					</div>
					<Button
						variant="outline"
						type="button"
						onClick={handleSendTestEmail}
						disabled={isSending || !testEmail}
						className="w-full"
					>
						{isSending ? <Icon iconName="loader" className="mr-2 h-4 w-4 animate-spin" /> : null}
						Send Test Email
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	)
}

export const EmailPreview = ({ type }: EmailPreviewProps) => {
	const [viewPort, setViewPort] = useState<'desktop' | 'mobile' | 'code'>('desktop')

	const [fields] = useAllFormFields()

	const props = useMemo(
		() => ({
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
		}),
		[fields, type],
	)

	const { html, isLoading } = useEmailPreview({
		component: type === 'passwordReset' ? EmailPasswordReset : EmailVerifyAccount,
		props,
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
				{!isLoading && <TestEmailPopover html={html} />}
			</div>
			<div className="mx-auto">
				{isLoading ? (
					<div className="bg-background flex h-[calc(100vh_-_140px)] w-[640px]">
						<div className="border-accent mx-auto my-[40px] w-[465px] rounded border border-solid">
							<div className="mx-auto mt-8 mb-8 flex w-10/12 flex-col space-y-3">
								<Skeleton className="mx-auto h-[25px] w-full rounded-xl" />
								<Skeleton className="mx-auto h-[250px] w-full rounded-xl" />
								<div className="space-y-2">
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-full" />
								</div>
								<Skeleton className="mx-auto h-[250px] w-full rounded-xl" />
								<div className="space-y-2">
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-full" />
								</div>
							</div>
						</div>
					</div>
				) : (
					<>
						{viewPort === 'desktop' ? (
							<iframe
								className="bg-background h-[calc(100vh_-_140px)] w-[640px] border-none lg:h-[calc(100vh_-_70px)]"
								srcDoc={html}
								title="Desktop"
							/>
						) : null}
						{viewPort === 'mobile' ? (
							<iframe
								className="bg-background mx-auto h-[calc(100vh_-_140px)] w-[360px] border-none lg:h-[calc(100vh_-_70px)]"
								srcDoc={html}
								title="Mobile"
							/>
						) : null}
						{viewPort === 'code' ? <CodePreview html={html} /> : null}
					</>
				)}
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
	const [isCopied, setIsCopied] = useState(false)

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(html)
			setIsCopied(true)
			toast({
				title: 'Copied to clipboard',
				type: 'info',
			})
			setTimeout(() => setIsCopied(false), 3000)
		} catch (error) {
			console.error('Failed to copy:', error)
		}
	}

	const downloadHtml = async (text: string, filename: string) => {
		const blob = new Blob([text], { type: 'text/html' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = filename
		a.click()
		URL.revokeObjectURL(url)
	}

	return (
		<div className="border-accent w-[640px] rounded-sm border p-4">
			<div className="flex items-center justify-end gap-2 pb-4">
				<Button type="button" variant="outline" size="icon" onClick={() => copyToClipboard()}>
					{isCopied ? <Icon iconName="check" /> : <Icon iconName="clipboard" />}
				</Button>
				<Button
					type="button"
					variant="outline"
					size="icon"
					onClick={() => downloadHtml(html, 'email.html')}
				>
					<Icon iconName="download" />
				</Button>
			</div>
			<div className="rounded-sm bg-gray-900 p-4">
				<Code>{html}</Code>
			</div>
		</div>
	)
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
