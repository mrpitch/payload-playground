import { CollectionConfig } from 'payload/types'
import { QuoteBlock } from '../../blocks/quote-block'

const Pages: CollectionConfig = {
  slug: 'pages',
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
            {
              name: 'slug',
              type: 'text',
              label: 'Slug',
              required: true,
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

export default Pages
