// About You Form
export interface AboutYouForm {
  gender: string;
  about_candidate: string;
  height: string;
  heightInch: number;
  weight: number;
  date_of_birth: Date;
  user?: {
    _type?: string;
    _ref?: string;
  };
}

// Academic Form
export interface AcademicForm {
  education: string;
  subject: string;
  passout_year: string;
  university_collage: string;
  collage_name: string;
  collage_location: string;
  custom_subject: string;
  academic_details: [];
}

// Astro Form
export interface AstroForm {
  mangalik: string;
  nakshatra: string;
  birth_time: string;
  birth_place: string;
  believe_in_kundli: string;
  user?: {
    _type?: string;
    _ref?: string;
  };
}

// Career Form
export interface CareerForm {
  working_with: string;
  occupation: string;
  employer_name: string;
  working_type: string;
  work_location: string;
  annual_income: number;
  currency: string;
}

// Contact Form
export interface ContactForm {
  profile_for: string;
  candidate_name: string;
  candidate_email: string;
  candidiate_mobile: string;
  password: string;
  retypePassword: string;
  terms: boolean;
  offers: boolean;
}

// Family Form
export interface FamilyForm {
  father_name: string;
  father_contact_no: number;
  father_status: string;
  father_annual_income: number;
  father_income_currency: string;
  mother_name: string;
  mother_contact_no: number;
  mother_status: string;
  mother_annual_income: number;
  mother_income_currency: string;
  family_type: string;
  family_value: string;
  about_family: string;
  married_brothers: number;
  Unmarried_brothers: number;
  married_sister: number;
  Unmarried_sisters: number;
}

// Life Style Form
export interface LifeStyleForm {
  diet_type: string;
  smoking: string;
  alcohol: string;
  passport_pic: string;
  full_pic: string;
  additional_one: string;
  additional_two: string;
}

// Location Form
export interface LocationForm {
  country: string;
  state: string;
  city: string;
  address_detail: string;
  zip_code: number;
  residency_status: string;
  grew_up_in: string;
  ethnic_origin: string;
  parents_living_in: string;
  user?: {
    _type?: string;
    _ref?: string;
  };
}

// Partner Preference Form
export interface PartnerPreferencesForm {
  min_weight: string;
  max_weight: string;
  min_birth_year: string;
  max_birth_year: string;
  min_height: string;
  max_height: string;
  marital_status: string;
  smoking: string;
  alcohol: string;
}

// Religion Form
export interface AboutYouSecondForm {
  marital_status: string;
  have_children: string;
  no_of_children: string;
  health_information: string;
  any_disability: string;
  blood_group: string;
  describe_disability: string;
  hobby_intrest: [];
  user?: {
    _type?: string;
    _ref?: string;
  };
}
export interface ReligiousForm {
  religion: string;
  mother_tongue: string;
  community: string;
  sub_community: string;
  gothra: string;
}
