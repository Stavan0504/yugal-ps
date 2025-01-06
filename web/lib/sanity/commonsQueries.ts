import { groq } from "next-sanity";

export const imageFields = /* groq */ `
  "src":asset->url,
    altText,
    "width":asset->metadata.dimensions.width,
    "height":asset->metadata.dimensions.height,
`;

export const labelLinkFields = groq`

`
