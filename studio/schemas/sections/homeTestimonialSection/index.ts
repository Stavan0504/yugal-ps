export default {
  name: 'homeTestimonialSection',
  title: 'Home Testimonial Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'bgImage',
      title: 'Background Image',
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
      name: 'svgImage',
      title: 'SVG Image',
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
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'review',
              title: 'Review',
              type: 'text',
              description: 'The customer review text.',
            },
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              description: 'Name of the reviewer.',
            },
            {
              name: 'location',
              title: 'Location',
              type: 'string',
              description: 'Location of the reviewer.',
            },
          ],
        },
      ],
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    },
  ],
}
