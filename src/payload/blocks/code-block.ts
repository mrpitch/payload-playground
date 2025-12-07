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
			type: 'row',
			fields: [
				{
					type: 'select',
					name: 'language',
					options: Object.entries(languages).map(([key, value]) => ({
						label: value,
						value: key,
					})),
					defaultValue: 'ts',
					admin: {
						width: '50%',
					},
				},
				{
					name: 'filename',
					type: 'text',
					label: 'Filename',
					admin: {
						width: '50%',
					},
				},
			],
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
