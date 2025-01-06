import {SchemaTypeDefinition} from 'sanity'

export default {
  name: 'homeHeroSection',
  title: 'Home Hero Section',
  type: 'object',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'coupleImage',
      title: 'Couple Image',
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
      name: 'backgroundImage',
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
      name: 'button1',
      title: 'Button 1',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Label',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Link',
          type: 'url',
        },
      ],
    },
    {
      name: 'button2',
      title: 'Button 2',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Label',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Link',
          type: 'url',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'description',
      media: 'coupleImage',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Home Hero Section',
        subtitle: subtitle || 'No description provided',
        media: media || null,
      }
    },
  },
} as SchemaTypeDefinition
