import {SchemaTypeDefinition} from 'sanity'

export default {
  name: 'homeContentBlock',
  title: 'Home Content Section',
  type: 'object',
  fields: [
    {
      name: 'contents',
      title: 'Contents',
      type: 'array',
      of: [{type: 'contentDetail'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({title}) => {
      return {
        title: title || 'Home Content Section',
      }
    },
  },
} as SchemaTypeDefinition
