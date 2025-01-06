import {Template} from 'sanity'
import {OLD_PAGE_ID_LIST} from '../helper/defaults'

export const getPageId = (new_id: string) => OLD_PAGE_ID_LIST[new_id] ?? new_id

export const InitialValueTemplates = {
  HEADER: getPageId('header'),
  SETTINGS: getPageId('settings'),
  PAGE: getPageId('page'),
}

export const templateBuilders: Template[] = [
  {
    id: InitialValueTemplates.SETTINGS,
    title: 'Settings',
    schemaType: 'settings',
    value: {
      type: 'settings',
    },
  },
  /* Contact */
  {
    id: 'contact',
    title: 'Contact',
    description: 'Contact for a User',
    schemaType: 'contact',
    parameters: [{name: 'userId', type: 'string'}],
    value: (params: {userId: string}) => ({
      user: {_type: 'reference', _ref: params.userId},
    }),
  },
  /* About */
  {
    id: 'aboutYou',
    title: 'About',
    description: 'About for a User',
    schemaType: 'aboutYou',
    parameters: [{name: 'userId', type: 'string'}],
    value: (params: {userId: string}) => ({
      user: {_type: 'reference', _ref: params.userId},
    }),
  },
  /* About Second */
  {
    id: 'aboutYouSecondForm',
    title: 'About Second',
    description: 'About Second for a User',
    schemaType: 'aboutYouSecondForm',
    parameters: [{name: 'userId', type: 'string'}],
    value: (params: {userId: string}) => ({
      user: {_type: 'reference', _ref: params.userId},
    }),
  },
  /* Academic */
  {
    id: 'academicForm',
    title: 'Academic',
    description: 'Academic for a User',
    schemaType: 'academicForm',
    parameters: [{name: 'userId', type: 'string'}],
    value: (params: {userId: string}) => ({
      user: {_type: 'reference', _ref: params.userId},
    }),
  },
  /* Astro */
  {
    id: 'astroForm',
    title: 'Astro',
    description: 'Astro for a User',
    schemaType: 'astroForm',
    parameters: [{name: 'userId', type: 'string'}],
    value: (params: {userId: string}) => ({
      user: {_type: 'reference', _ref: params.userId},
    }),
  },
  /* Career */
  {
    id: 'careerForm',
    title: 'Career',
    description: 'Career for a User',
    schemaType: 'careerForm',
    parameters: [{name: 'userId', type: 'string'}],
    value: (params: {userId: string}) => ({
      user: {_type: 'reference', _ref: params.userId},
    }),
  },
  /* Family */
  {
    id: 'familyForm',
    title: 'Family',
    description: 'Family for a User',
    schemaType: 'familyForm',
    parameters: [{name: 'userId', type: 'string'}],
    value: (params: {userId: string}) => ({
      user: {_type: 'reference', _ref: params.userId},
    }),
  },
  /* LifeStyle */
  {
    id: 'lifeStyleForm',
    title: 'LifeStyle',
    description: 'LifeStyle for a User',
    schemaType: 'lifeStyleForm',
    parameters: [{name: 'userId', type: 'string'}],
    value: (params: {userId: string}) => ({
      user: {_type: 'reference', _ref: params.userId},
    }),
  },
  /* Location */
  {
    id: 'locationForm',
    title: 'Location',
    description: 'Location for a User',
    schemaType: 'locationForm',
    parameters: [{name: 'userId', type: 'string'}],
    value: (params: {userId: string}) => ({
      user: {_type: 'reference', _ref: params.userId},
    }),
  },
  /* Partner Preference */
  {
    id: 'partnerPreferences',
    title: 'PartnerPreference',
    description: 'Partner Preference for a User',
    schemaType: 'partnerPreferences',
    parameters: [{name: 'userId', type: 'string'}],
    value: (params: {userId: string}) => ({
      user: {_type: 'reference', _ref: params.userId},
    }),
  },
  /* Religious */
  {
    id: 'religiousForm',
    title: 'Religious',
    description: 'Religious for a User',
    schemaType: 'religiousForm',
    parameters: [{name: 'userId', type: 'string'}],
    value: (params: {userId: string}) => ({
      user: {_type: 'reference', _ref: params.userId},
    }),
  },
]

export default [...templateBuilders?.map((template) => template)]
