import {SchemaTypeDefinition} from 'sanity'

export default {
  name: 'settings',
  title: 'Settings',
  type: 'document',
  groups: [
    {
      name: 'layout',
      title: 'Layout',
      default: true,
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'This field is only used for CMS.',
      group: 'layout',
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'customImage',
      group: 'layout',
    },
    {
      name: 'header',
      type: 'reference',
      to: [{type: 'header'}],
      options: {disableNew: true},
      validation: (Rule) => Rule.required(),
      group: 'layout',
    },
    {
      name: 'footer',
      type: 'reference',
      to: [{type: 'footer'}],
      options: {disableNew: true},
      validation: (Rule) => Rule.required(),
      group: 'layout',
    },
  ],
} as SchemaTypeDefinition
