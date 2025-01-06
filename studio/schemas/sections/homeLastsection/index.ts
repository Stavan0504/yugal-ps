import {SchemaTypeDefinition} from 'sanity'

export default {
  name: 'homelastSection',
  title: 'Home Last Section',
  type: 'object',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
    },
    {
      name: 'btntext',
      title: 'Button',
      type: 'string',
    },
  ],
} as SchemaTypeDefinition
