import type { ComponentCategories } from '../../component-catalog';

export interface ComponentCategory {
  category: string;
  description?: string;
  components: string[];
}

export const UNCATEGORIZED_CATEGORY = 'Uncategorized';

export const groupComponentsByCategory = (
  components: string[],
  componentCategories: ComponentCategories,
): ComponentCategory[] => {
  const categorizedComponents = new Set<string>();
  const componentsSet = new Set(components);

  const categories: ComponentCategory[] = Object.entries(componentCategories)
    .map(([category, { description, components: categoryComponents }]) => {
      const matched = categoryComponents.filter((component) => componentsSet.has(component)).sort();
      matched.forEach((component) => categorizedComponents.add(component));

      return { category, description, components: matched };
    })
    .filter(({ components: filtered }) => filtered.length > 0);

  const uncategorized = components.filter((component) => !categorizedComponents.has(component)).sort();

  if (uncategorized.length > 0) {
    categories.push({ category: UNCATEGORIZED_CATEGORY, components: uncategorized });
  }

  return categories;
};
