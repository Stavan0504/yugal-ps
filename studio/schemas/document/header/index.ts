import {buttonVariant} from '../../../constant/select-options'
import {SchemaTypeDefinition} from 'sanity'

export default {
  name: 'header',
  title: 'Header',
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
  ],
} as SchemaTypeDefinition
