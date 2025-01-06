import { SchemaTypeDefinition } from "sanity";


export default {
  name: "richText",
  title: "Rich Text",
  type: "object",
  fields: [
    {
      name: "custom_rich_text",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading1", value: "h1" },
            { title: "Heading2", value: "h2" },
            { title: "Heading3", value: "h3" },
            { title: "Heading4", value: "h4" },
            { title: "Heading5", value: "h5" },
            { title: "Heading6", value: "h6" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            {
              title: "Bullet",
              value: "bullet",
            },
            { title: "Number", value: "number" },
          ],
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: 'link',
                    title: 'Link',
                    type: 'link',
                  }
                ],
              },
            ],
          },
        },
        { type: "customImage" },
      ],
    },
  ],
} as SchemaTypeDefinition;
