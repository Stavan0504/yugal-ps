import { SchemaTypeDefinition } from "sanity";

export default {
    name: 'imageWithLink',
    title: 'Image With Link',
    type: 'object',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'customImage',
        },
        {
            name: 'link',
            title: 'Link',
            type: 'link',
        },
    ],
    preview: {
        select: {
            image: "image",
            title: "image.alt"
        },
        prepare({ title, image }) {
            if (!title) {
                return {
                    title: "Image With Link",
                    media: image
                };
            }
            return {
                title: title,
                media: image
            };
        },
    },
} as SchemaTypeDefinition;