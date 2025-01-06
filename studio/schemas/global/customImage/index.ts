import { defineField, SchemaTypeDefinition } from "sanity";
import { GrImage } from "react-icons/gr";

export default {
  name: "customImage",
  title: "Custom Image",
  type: "image",
  icon: GrImage,
  options: {
    hotspot: true, // <-- Defaults to false
  },
  fields: [
    defineField({
      name: "alt",
      type: "string",
      title: "Alt",
    }),
  ],
  preview: {
    select: {
      imageUrl: "asset",
      alt: "alt",
    },
    prepare(select) {
      const { imageUrl, alt } = select;
      return {
        title: alt,
        media: imageUrl && imageUrl,
      };
    },
  },
} as SchemaTypeDefinition;
