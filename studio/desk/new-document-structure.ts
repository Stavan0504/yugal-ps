import { templateBuilders } from "./initialValueTemplates";

const initialValueTemplates = templateBuilders.map((template) => ({
  id: template.id,
  type: "initialValueTemplateItem",
  templateId: template.schemaType,
  title: template.title,
}));

export default [...initialValueTemplates];
