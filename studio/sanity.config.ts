import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {deskStructure} from './desk/deskStructure'
import {seoMetaFields} from 'sanity-plugin-seo'

export default defineConfig({
  name: 'default',
  title: 'yugal',

  // projectId: 'y226lc99',
  projectId: '8nsk7cqh',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
    seoMetaFields(),
  ],

  schema: {
    types: schemaTypes,
  },
})
