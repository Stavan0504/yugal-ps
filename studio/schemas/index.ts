import documentsTypes from './document'
import globalTypes from './global'
import page from './page'
import sectionsTypes from './sections'

export const schemaTypes = [page, ...globalTypes, ...sectionsTypes, ...documentsTypes]
