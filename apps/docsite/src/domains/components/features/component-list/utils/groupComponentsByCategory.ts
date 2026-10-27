import type { ComponentCategories } from '../../component-catalog';

interface NamedComponent {
  name: string;
}

export interface ComponentCategory<T extends NamedComponent> {
  category: string;
  description: string;
  components: T[];
}

const byName = (a: NamedComponent, b: NamedComponent) => a.name.localeCompare(b.name);

export const groupComponentsByCategory = <T extends NamedComponent>(
  components: T[],
  componentCategories: ComponentCategories,
): ComponentCategory<T>[] =>
  Object.entries(componentCategories)
    .map(([category, { description, components: categoryComponents }]) => ({
      category,
      description,
      components: components.filter(({ name }) => categoryComponents.includes(name)).sort(byName),
    }))
    .filter(({ components: filtered }) => filtered.length > 0);
