import { Block } from 'payload'

export const languages = {
	ts: 'TypeScript',
	plaintext: 'Plain Text',
	tsx: 'TSX',
	js: 'JavaScript',
	jsx: 'JSX',
}

export const CodeBlock: Block = {
	slug: 'code',
	imageURL: '/images/icons/icon-code.svg', // optional
	imageAltText: 'Code Block Icon',
	interfaceName: 'CodeBlock', // optional
	fields: [
		{
			type: 'select',
			name: 'language',
			options: Object.entries(languages).map(([key, value]) => ({
				label: value,
				value: key,
			})),
			defaultValue: 'ts',
		},
		{
			admin: {
				components: {
					Field: 'src/payload/components/code-component#Code',
				},
			},
			name: 'code',
			type: 'code',
		},
	],
}
