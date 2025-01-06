export type Button = {
  label: string;
  link?: string;
};

export type ImageObject = {
  src?: string;
  altText?: string;
  height?: number;
  width?: number;
};

export type HeaderDataProps = {
  variant?: string;
  logo: ImageObject;
  label: string;
};

export type Asset = {
  src: string;
  altText?: string;
  width?: number;
  height?: number;
};

export interface Blog {
  image: Asset;
  tag: string;
  title: string;
  description: string;
  button: string;
}

type AppMetadata = {
  provider: string;
  providers: string[];
  role?: string;
};

type UserMetadata = {
  contact: string;
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
  tandc: boolean;
};

export interface SupabaseUser {
  id: string;
  aud: string;
  confirmation_sent_at: string | null;
  confirmed_at: string | null;
  created_at: string;
  email: string | null;
  email_confirmed_at: string | null;
  identities: null | any;
  is_anonymous: boolean;
  last_sign_in_at: string | null;
  phone: string;
  role: string;
  updated_at: string;
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
}

export type HeroSection = {
  headline: string;
  description: string;
  button1: Button;
  button2: Button;
  coupleImage: ImageObject;
  backgroundImage: ImageObject;
};

export type HomeHeroSectionType = {
  _id: string;
  _type: "homeHeroSection";
  headline: string;
  description: string;
  button1: Button;
  button2: Button;
  coupleImage: ImageObject;
  backgroundImage: ImageObject;
};

export type contentDetailType = {
  _type: "contentDetail";
  title: string;
  description: string;
  contentAlign: boolean;
  image?: ImageObject;
};

export type HomeContentBlockType = {
  _type: "homeContentBlock";
  contents: contentDetailType[];
};

export type Step = {
  stepNumber: number;
  title: string;
  description: string;
  icon: string;
  altText: string;
  asset: ImageObject;
};

export type StepsSectionProps = {
  headline: string;
  steps: Step[];
};

export type HomeStepsSectionsType = {
  _id: string;
  _type: "stepsSection";
  headline: string;
  steps: Step[];
};

export type ContactUsSectionProps = {
  headline: string;
  btntext: string;
};

export type HomeContactUsSectionType = {
  _id: string;
  _type: "homelastSection";
  headline: string;
  btntext: string;
};

export type BlogsectionTypes = {
  _id: string;
  _type: "homeBlogSection";
  title: string;
  asset?: Asset;
  blogs: Blog[];
};

export type workingStep = {
  icon: Asset;
  imageleftRight: string;
  mainImage: Asset;
  title: string;
  description: string;
};

export interface HowItWorksSection {
  _type: "homeHowItWorks";
  title: string;
  steps: workingStep[];
}
export interface ImageAsset {
  src: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface Review {
  image: ImageAsset;
  review: string;
  name: string;
  location: string;
}

export interface TestimonialSection {
  _type: "homeTestimonialSection";
  title: string;
  svgImage: ImageAsset;
  reviews: Review[];
  buttonText: string;
  bgImage: ImageAsset;
}

export interface ContactDetail {
  icon: ImageAsset;
  title: string;
  link: string;
  value: string;
}

export interface HomeContactUsSection {
  _type: "homeContactSection";
  title: string;
  subtitle: string;
  asset: ImageObject;
  description: string;
  images: { icon: ImageAsset }[];
  contactDetails: ContactDetail[];
}

export interface Feature {
  icon: ImageAsset;
  title: string;
  description: string;
}

export interface WhyChoosesection {
  _type: "homewhyChooseUs";
  title: string;
  whyText: string;
  asset: ImageAsset;
  subtitle: string;
  bgImage: ImageAsset;
  features: Feature[];
}

export type ContactMethods = {
  link: string;
  value: string;
};

export type Content = {
  contactTitle: string;
  description: string;
  title: string;
  heroimage: ImageObject;
  headQuarters: string;
  contactMethods: ContactMethods[];
};

export type HelpandSupport = {
  name: string;
  content: Content[];
};

export type HelpsandSupportTypes = {
  _id: string;
  _type: "helpssupport";
  name: string;
  content: Content[];
};
export type Link = {
  text: string;
  url: string;
};

export type Section = {
  links: Link[];
  title: string;
};

export type FooterData = {
  _type: "";
  footer: {
    logo: {
      src: string;
      width: number;
      height: number;
    };
    sections: Section[];
    copyright: string;
    disclaimer: string;
  };
};

export type ProfileTableProps = {
  id: string;
  age: number;
  completed_steps: number;
  first_name: string;
  email: string;
  contact_no: number;
  height: string;
  weight: number;
  date_of_birth: string;
  gender: string;
  marital_status: string;
  blood_group: string;
  health_information: string;
  education: string;
  birth_time: string;
  birth_place: string;
  occupation: string;
  annual_income: number;
  currency: string;
  father_name: string;
  father_contact_no: number;
  mother_name: string;
  mother_contact_no: number;
  diet_type: string;
  smoking: string;
  alcohol: string;
  full_pic: string;
  address_detail: string;
  passport_pic: string;
  additional_one: string;
  additional_two: string;
  city: string;
  zip_code: number;
  religion: string;
  mother_tongue: string;
  community: string;
  grew_up_in: string;
  sun_sign: string;
  describe_disability: string;
  sub_community: string;
  gothra: string;
  mangalik: string;
  about_candidate: string;
  visitors: string[];
  collage_location: string;
  collage_name: string;
  country: string;
  ethnic_origin: string;
  hobby_interest: [];
  isVerified: string;
  married_brothers: number;
  Unmarried_brothers: number;
  Unmarried_sisters: number;
  married_sister: number;
  parents_living_in: string;
  personal_values: string;
  state: string;
  working_with: string;
  partner_max_birth_year: number;
  partner_min_birth_year: number;
  partner_min_height: number;
  partner_max_height: number;
  partner_min_weight: number;
  partner_max_weight: number;
  partner_marital_status: string;
  partner_smoking: string;
  partner_alcohol: string;
};

export type SectionType =
  | HomeHeroSectionType
  | HomeContentBlockType
  | HomeStepsSectionsType
  | HomeContactUsSectionType
  | HowItWorksSection
  | TestimonialSection
  | HomeContactUsSection
  | WhyChoosesection
  | BlogsectionTypes
  | FooterData;

export interface PageBuilderType {
  _type: "section";
  content: SectionType[];
}

export type PageBuilderSection = {
  _id: string;
  _type: string;
  name: string;
  content: SectionType[];
};
