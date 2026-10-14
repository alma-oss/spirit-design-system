import { COMPONENT_CATEGORIES } from '../componentCategories';

describe('componentCategories', () => {
  it('should have no duplicate components across categories', () => {
    const allCategorized = Object.values(COMPONENT_CATEGORIES).flat();
    const uniqueComponents = new Set(allCategorized);

    expect(allCategorized).toHaveLength(uniqueComponents.size);
  });

  it('should have no empty categories', () => {
    for (const [, components] of Object.entries(COMPONENT_CATEGORIES)) {
      expect(components.length).toBeGreaterThan(0);
    }
  });

  it('should have components sorted alphabetically within each category', () => {
    for (const [, components] of Object.entries(COMPONENT_CATEGORIES)) {
      const sorted = [...components].sort();

      expect(components).toEqual(sorted);
    }
  });

  it('should have categories sorted alphabetically', () => {
    const categories = Object.keys(COMPONENT_CATEGORIES);
    const sorted = [...categories].sort();

    expect(categories).toEqual(sorted);
  });
});
