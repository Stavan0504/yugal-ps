import {SchemaTypeDefinition} from 'sanity'

export default {
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'This field is only used for CMS.',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'customImage',
    },
    {
      name: 'label',
      title: 'Label',
      type: 'string',
    },
    {
      name: 'sections',
      title: 'Footer Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
            },
            {
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'text',
                      title: 'Link Text',
                      type: 'string',
                    },
                    {
                      name: 'url',
                      title: 'Link URL',
                      type: 'string',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
    },
    {
      name: 'disclaimer',
      title: 'Disclaimer Text',
      type: 'string',
    },
  ],
} as SchemaTypeDefinition
