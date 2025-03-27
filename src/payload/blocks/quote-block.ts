import { Block } from 'payload'

export const QuoteBlock: Block = {
	slug: 'quote',
	imageURL: '/images/icons/icon-quote.svg', // optional
	imageAltText: 'Quote Block Icon',
	interfaceName: 'QuoteBlock', // optional
	fields: [
		// required
		{
			name: 'quoteHeader',
			type: 'text',
			required: true,
			localized: true,
		},
		{
			name: 'quoteText',
			type: 'text',
			localized: true,
		},
	],
}
