import { groq } from "next-sanity";
import { imageFields } from "./commonsQueries";

export const headerFields = /* groq */ `
_id,
_type,
title,
logo{
${imageFields}
},
label
`;
