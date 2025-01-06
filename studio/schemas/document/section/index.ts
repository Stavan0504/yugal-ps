import {SchemaTypeDefinition} from 'sanity'
import ArrayMaxItems from '../../../component/arrayFunctions'

export default {
  name: 'section',
  title: 'Section',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'This field is only used for CMS.',
    },

    {
      name: 'content',
      type: 'array',
      components: {input: ArrayMaxItems},
      validation: (Rule) => Rule.max(1),
      of: [
        {type: 'homeContentBlock'},
        {type: 'homeHeroSection'},
        {type: 'stepsSection'},
        {type: 'homelastSection'},
        {type: 'helpssupport'},
        {type: 'homeTestimonialSection'},
        {type: 'homewhyChooseUs'},
        {type: 'homeContactSection'},
        {type: 'homeHowItWorks'},
        {type: 'homeBlogSection'},
      ],
    },
  ],
} as SchemaTypeDefinition
