export default {
  name: 'contentDetail',
  title: 'Content Detail',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main title of the section.',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description text for the section.',
    },

    {
      name: 'image',
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
      hidden: ({parent}: {parent: {selectImage: boolean}}) => parent?.selectImage === false,
    },
  ],
}
