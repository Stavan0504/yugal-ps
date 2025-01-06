import { groq } from "next-sanity";
import {
  helpssupport,
  homeBlogSection,
  homeContactSection,
  homeContentBlock,
  homeHeroSectionFields,
  homeHowItWorks,
  homelastSection,
  homeTestimonialSection,
  homewhyChooseUs,
  stepsSection,
} from "./sectionFields";
import { headerFields } from "./headerQueries";
import { footerFields } from "./footerQueries";

const pageBuilder = groq`
  pageBuilder[]->{
 _type,
    _id,
    name,
    content[]{
      (_type=="homeHeroSection")=>{
       ${homeHeroSectionFields}
      },
      (_type=="homeContentBlock")=>{
       ${homeContentBlock}
      },
      (_type=="stepsSection")=>{
       ${stepsSection}
      },
      (_type=="homelastSection")=>{
       ${homelastSection}
      },
      (_type=="helpssupport")=>{
        ${helpssupport}
      },
      (_type=="homeTestimonialSection")=>{
        ${homeTestimonialSection}
      },
      (_type=="homewhyChooseUs")=>{
        ${homewhyChooseUs}
      },
      (_type=="homeContactSection")=>{
        ${homeContactSection}
      },
      (_type=="homeHowItWorks")=>{
        ${homeHowItWorks}
      },
      (_type=="homeBlogSection")=>{
        ${homeBlogSection}
      }
    }
}
`;

const headerQuery = groq`
header->{
  ${headerFields}
}`;

const footerQuery = groq`
footer->{
  ${footerFields}
}`;

export const layoutProps = /* groq */ `*[_type == "settings"][0]{
  _id,
  _type,
  favicon,
  ${headerQuery},
  ${footerQuery},
  }`;

const groqQuery = groq`
*[_type == "page" && slug.current==$slug][0]{
_type,
_id,
variant,
"slug":slug.current,
"layoutProps":${layoutProps},
${pageBuilder}

}`;

export const query = {
  groqQuery,
  layoutProps,
};
