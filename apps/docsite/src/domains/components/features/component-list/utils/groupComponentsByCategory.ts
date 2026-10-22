import type { ComponentCategories, ComponentCategoryDefinition } from '../../component-catalog';

export type ComponentCategory = { category: string } & ComponentCategoryDefinition;

export const groupComponentsByCategory = (
  components: string[],
  componentCategories: ComponentCategories,
): ComponentCategory[] => {
  const componentsSet = new Set(components);

  return Object.entries(componentCategories)
    .map(([category, { description, components: categoryComponents }]) => ({
      category,
      description,
      components: categoryComponents.filter((component) => componentsSet.has(component)).sort(),
    }))
    .filter(({ components: filtered }) => filtered.length > 0);
};
