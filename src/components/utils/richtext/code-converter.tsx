'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/custom/icons'

import { SerializedBlockNode } from '@payloadcms/richtext-lexical'

export const CodeBlockComponent: React.FC<{
	node: SerializedBlockNode
}> = ({ node }) => {
	const [copied, setCopied] = useState(false)
	const { language, code, filename } = node.fields

	if (!language || !code) {
		return null
	}

	const handleCopy = async () => {
		await navigator.clipboard.writeText(code)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<div className="group relative my-6">
			{/* Filename header if provided */}
			{filename && (
				<div className="border-border text-muted-foreground rounded-t-lg border border-b-0 px-4 py-2 font-mono text-sm">
					{filename}
				</div>
			)}

			{/* Code container */}
			<div
				className={`border-border relative border ${filename ? 'rounded-b-lg' : 'rounded-lg'} overflow-hidden`}
			>
				{/* Copy button */}
				<Button
					variant="ghost"
					size="sm"
					onClick={handleCopy}
					className="absolute top-3 right-3 z-10 h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
				>
					{copied ? (
						<Icon iconName="check" className="h-4 w-4 text-green-500" />
					) : (
						<Icon iconName="copy" className="h-4 w-4" />
					)}
				</Button>

				{/* Code content */}
				<pre className="overflow-x-auto bg-transparent p-4 text-sm leading-relaxed">
					<code className="text-foreground font-mono">{code}</code>
				</pre>
			</div>
		</div>
	)
}
