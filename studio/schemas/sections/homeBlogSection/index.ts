export default {
  name: 'homeBlogSection',
  title: 'Blog Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'asset',
      title: 'Asset',
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
      name: 'blogs',
      title: 'Blogs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Blog Image',
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
              name: 'tag',
              title: 'Blog Tag',
              type: 'string',
            },
            {
              name: 'title',
              title: 'Blog Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Blog Description',
              type: 'text',
            },
            {
              name: 'button',
              title: 'Button Label',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
}
