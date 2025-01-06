import { IconType } from 'react-icons'
import { HiOutlineTerminal } from 'react-icons/hi'
import { StructureBuilder } from 'sanity/structure'


export interface StructureListTypeProps {
  S: StructureBuilder
  title: string
  icon: IconType
  type: string
}

export const structureListType = ({
  S,
  title,
  type,
  icon = HiOutlineTerminal,
}: StructureListTypeProps) => {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(S.documentTypeList(type).schemaType(type).title(title))
}
