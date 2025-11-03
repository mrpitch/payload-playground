import { SerializedBlockNode } from '@payloadcms/richtext-lexical'

export const CodeBlockComponent: React.FC<{
	node: SerializedBlockNode
}> = ({ node }) => {
	const { language, code } = node.fields

	if (!language || !code) {
		return null
	}
	return (
		<div>
			<h1>Code Block</h1>
			<p>
				language:{language}
				<br />
				code: {code}
			</p>
		</div>
	)
}
