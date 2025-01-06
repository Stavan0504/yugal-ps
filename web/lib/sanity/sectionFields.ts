import { groq } from "next-sanity";
import { imageFields } from "./commonsQueries";

export const homeHeroSectionFields = groq`
_type,
headline,
description,
coupleImage{
    ${imageFields}
},
button1,
button2,
backgroundImage{
    ${imageFields}
},
`;

export const contentDetailFields = groq`
_type,
title,
description,
image{
    ${imageFields}
},
contentAlign
`;

export const stepsSection = groq`
_type,
headline,
steps[]{
stepNumber,
icon{
    ${imageFields}
},
title,
description,
asset{
    ${imageFields}
},
}
`;

export const homelastSection = groq`
_type,
headline,
btntext,
`;

export const homeContentBlock = groq`
_type,
contents[]{
${contentDetailFields}
}
`;

export const helpssupport = groq`
_type,
title,
heroimage{
    ${imageFields}
},
contacTitle,
description,
headQuarters,
contactMethods[]{
   link,
    value
}
`;

export const homeTestimonialSection = groq`
_type,
title,
bgImage{
    ${imageFields}
},
svgImage{
    ${imageFields}
},
reviews[]{
    image{
        ${imageFields}
    },
    review,
    name,
    location,
},
buttonText
`;

export const homewhyChooseUs = groq`
_type,
title,
whyText,
asset{
    ${imageFields}
},
subtitle,
features[]{
    icon{
        ${imageFields}
    },
    title,
    description,
},
bgImage{
        ${imageFields}
    }
`;

export const homeContactSection = groq`
 _type,
 title,
 subtitle,
 asset{
    ${imageFields}
 },
 description,
 images[]{
    title,
    icon{
        ${imageFields}
    }
 },
 contactDetails[]{
    title,
    value,
    link,
    icon{
        ${imageFields}
    }
 }
`;

export const homeHowItWorks = groq`
    _type,
    title,
    steps[]{
    imageleftRight,
        stepNumber,
        mainImage{
            ${imageFields}
        },
        icon{
            ${imageFields}
        },
        title,
        description
    }
`;

export const homeBlogSection = groq`
_type,
title,
asset{
    ${imageFields}
},
blogs[]{
    image{
        ${imageFields}
    },
    tag,
    title,
    description,
    button
}
`;
