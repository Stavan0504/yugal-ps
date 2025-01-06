import {SchemaTypeDefinition} from 'sanity'

export default {
  name: 'helpssupport',
  title: 'Help & Support',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
    },
    {
      name: 'heroimage',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'altText',
          title: 'Alternative Text',
          type: 'string',
        },
      ],
      description: 'The main image displayed in the section.',
    },
    {
      name: 'contacTitle',
      title: 'Contact Us section',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'contactMethods',
      title: 'Contact Methods',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'link',
              title: 'Link',
              type: 'string',
            },
            
            {
              name: 'value',
              title: 'Value',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
} as SchemaTypeDefinition
