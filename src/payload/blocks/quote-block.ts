import { Block } from 'payload'

export const QuoteBlock: Block = {
  slug: 'Quote',
  imageURL: '/icon-quote.svg', // optional
  imageAltText: 'A nice thumbnail image to show what this block looks like',
  interfaceName: 'QuoteBlock', // optional
  fields: [
    // required
    {
      name: 'quoteHeader',
      type: 'text',
      required: true,
    },
    {
      name: 'quoteText',
      type: 'text',
    },
  ],
}
