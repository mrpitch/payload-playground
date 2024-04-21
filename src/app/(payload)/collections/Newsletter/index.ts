import { CollectionConfig } from 'payload/types'
import { QuoteBlock } from '../../blocks/quote-block'

const Newsletter: CollectionConfig = {
  slug: 'newsletter',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'SEO Meta',
          description: 'SEO Information',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
            },
          ],
        },
        {
          label: 'Content',
          description: 'Page Content',
          fields: [
            {
              name: 'title',
              type: 'text',
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
        },
      ],
    },
  ],
}

export default Newsletter
