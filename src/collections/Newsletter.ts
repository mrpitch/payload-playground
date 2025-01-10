import { CollectionConfig } from 'payload'
import { QuoteBlock } from '../blocks/quote-block'

export const Newsletter: CollectionConfig = {
  slug: 'newsletter',
  admin: {
    useAsTitle: 'title',
    preview: (doc) => {
      if (doc?.title) {
        return `/admin/email-preview`
      }

      return null
    },
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'subject',
          label: 'Subject',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'layout', // required
      type: 'blocks', // required
      minRows: 1,
      maxRows: 20,
      blocks: [
        // required
        QuoteBlock,
      ],
    },
  ],
}
