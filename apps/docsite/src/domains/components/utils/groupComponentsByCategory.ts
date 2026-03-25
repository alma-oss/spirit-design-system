import { COMPONENT_CATEGORIES } from '@local/domains/components/constants/componentCategories';

export interface ComponentCategory {
  category: string;
  components: string[];
}

export const UNCATEGORIZED_CATEGORY = 'Uncategorized';

export const groupComponentsByCategory = (components: string[]): ComponentCategory[] => {
  const categorizedComponents = new Set<string>();
  const componentsSet = new Set(components);

  const categories = Object.entries(COMPONENT_CATEGORIES)
    .map(([category, categoryComponents]) => {
      const matched = categoryComponents.filter((component) => componentsSet.has(component)).sort();
      matched.forEach((component) => categorizedComponents.add(component));

      return { category, components: matched };
    })
    .filter(({ components: filtered }) => filtered.length > 0);

  const uncategorized = components.filter((component) => !categorizedComponents.has(component)).sort();

  if (uncategorized.length > 0) {
    categories.push({ category: UNCATEGORIZED_CATEGORY, components: uncategorized });
  }

  return categories;
};
