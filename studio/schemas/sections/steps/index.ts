import {SchemaTypeDefinition} from 'sanity'

export default {
  name: 'stepsSection',
  title: 'Steps Section',
  type: 'object',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
    },
    {
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'stepNumber',
              title: 'Step Number',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: 'icon',
              title: 'Icon',
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
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'asset',
              title: 'Design',
              type: 'image',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(3),
    },
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'steps[0].title',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Steps Section',
        subtitle: `First Step: ${subtitle || 'No step defined'}`,
      }
    },
  },
} as SchemaTypeDefinition
