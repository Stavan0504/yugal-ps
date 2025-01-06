import { create } from "zustand";
import {
  AboutYouForm,
  AboutYouSecondForm,
  AcademicForm,
  AstroForm,
  CareerForm,
  ContactForm,
  FamilyForm,
  LifeStyleForm,
  LocationForm,
  PartnerPreferencesForm,
  ReligiousForm,
} from "./types/forms";

interface Store {
  contactForm: ContactForm | null;
  setContactForm: (newList: ContactForm) => void;
  aboutForm: AboutYouForm | null;
  setAboutForm: (newList: AboutYouForm) => void;
  aboutYouSecondForm: AboutYouSecondForm | null;
  setAboutFormSecond: (newList: AboutYouSecondForm) => void;
  religiousForm: ReligiousForm | null;
  setReligiousForm: (newList: ReligiousForm) => void;
  astroform: AstroForm | null;
  setAstroForm: (newList: AstroForm) => void;
  academicForm: AcademicForm | null;
  setAcademicForm: (newList: AcademicForm) => void;
  careerForm: CareerForm | null;
  setCareerForm: (newList: CareerForm) => void;
  locationForm: LocationForm | null;
  setLocationForm: (newList: LocationForm) => void;
  familyForm: FamilyForm | null;
  setFamilyForm: (newList: FamilyForm) => void;
  lifeStyleForm: LifeStyleForm | null;
  setLifeStyleForm: (newList: LifeStyleForm) => void;
  partnerPreferencesForm: PartnerPreferencesForm | null;
  setPartnerPreferencesForm: (newList: PartnerPreferencesForm) => void;
  initialFiles: File[];
  setInitialFiles: (newList: File[]) => void;
}

export const useFormStore = create<Store>((set) => ({
  contactForm: null,
  setContactForm: (newList) => set({ contactForm: newList }),
  aboutForm: null,
  setAboutForm: (newList) => set({ aboutForm: newList }),
  aboutYouSecondForm: null,
  setAboutFormSecond: (newList) => set({ aboutYouSecondForm: newList }),
  religiousForm: null,
  setReligiousForm: (newList) => set({ religiousForm: newList }),
  astroform: null,
  setAstroForm: (newList) => set({ astroform: newList }),
  academicForm: null,
  setAcademicForm: (newList) => set({ academicForm: newList }),
  careerForm: null,
  setCareerForm: (newList) => set({ careerForm: newList }),
  locationForm: null,
  setLocationForm: (newList) => set({ locationForm: newList }),
  familyForm: null,
  setFamilyForm: (newList) => set({ familyForm: newList }),
  lifeStyleForm: null,
  setLifeStyleForm: (newList) => set({ lifeStyleForm: newList }),
  partnerPreferencesForm: null,
  setPartnerPreferencesForm: (newList) =>
    set({ partnerPreferencesForm: newList }),
  initialFiles: [],
  setInitialFiles: (newList) => set({ initialFiles: newList }),
}));
