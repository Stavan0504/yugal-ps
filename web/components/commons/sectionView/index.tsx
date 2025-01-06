import { PageBuilderType } from "@/lib/sanity/types";
import Section from "../section";

export interface SectionViewProps {
  block: PageBuilderType;
}
const SectionView: React.FC<SectionViewProps> = ({ block }) => {
  const { content } = block || {};

  return (
    Array.isArray(content) &&
    content?.map((item, index) => <Section data={item} key={index} />)
  );
};
export default SectionView;
