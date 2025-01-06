import { groq } from "next-sanity";
import { imageFields } from "./commonsQueries";

export const footerFields = /* groq */ `
_id,
_type,
logo{
${imageFields}
},
copyright,
sections[]{
    title,
    links[]{
        text,
        url
    }
},
disclaimer
`;
