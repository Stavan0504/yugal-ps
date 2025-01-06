import { SchemaTypeDefinition } from "sanity";

export default {
  name: 'homeHowItWorks',
  title: 'How It Works',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
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
              name: 'imageleftRight',
              title: 'Image left Right',
               type:'string',
              options: { list: [
                {title:"left" ,value:"left"},
                {title:"right" ,value:"right"},
              ]
                ,  layout: "radio" },
            },
            {
              name: 'mainImage',
              title: 'Main Image',
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
              name: 'icon',
              title: 'Step Icon',
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
              title: 'Step Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Step Description',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
} as SchemaTypeDefinition;
