import {structureListType} from './helper/structure-list-type'
// import {CogIcon} from '@sanity/icons'
import {RiPagesLine} from 'react-icons/ri'
import {StructureBuilder} from 'sanity/structure'
import {HiOutlineTerminal} from 'react-icons/hi'
import {AiOutlineGlobal} from 'react-icons/ai'

export const deskStructure = (S: StructureBuilder) => {
  return S.list()
    .title('Documents')
    .items([
      S.listItem()
        .title('settings')
        // .icon(CogIcon)
        .child(S.editor().id('settings').schemaType('settings').documentId('settings')),
      S.listItem()
        .title('Global')
        .icon(AiOutlineGlobal)
        .child(
          S.list()
            .title('Global')
            .items([
              structureListType({
                S,
                type: 'section',
                title: 'Section',
                icon: HiOutlineTerminal,
              }),
              structureListType({
                S,
                type: 'header',
                title: 'Header',
                icon: HiOutlineTerminal,
              }),
              structureListType({
                S,
                type: 'footer',
                title: 'Footer',
                icon: HiOutlineTerminal,
              }),
            ]),
        ),
      S.divider(),
      structureListType({
        S,
        type: 'page',
        title: 'Page',
        icon: RiPagesLine,
      }),
      S.divider(),
    ])
}
