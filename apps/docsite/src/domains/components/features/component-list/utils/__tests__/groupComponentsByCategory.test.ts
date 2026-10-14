import { groupComponentsByCategory, UNCATEGORIZED_CATEGORY } from '../groupComponentsByCategory';

describe('groupComponentsByCategory', () => {
  it('should group components into their respective categories', () => {
    const result = groupComponentsByCategory(['Button', 'Alert', 'Dialog']);

    expect(result).toEqual([
      { category: 'Actions', components: ['Button'] },
      { category: 'Feedback', components: ['Alert'] },
      { category: 'Overlays', components: ['Dialog'] },
    ]);
  });

  it('should exclude categories with no matching components', () => {
    const result = groupComponentsByCategory(['Button']);
    const categories = result.map(({ category }) => category);

    expect(categories).toEqual(['Actions']);
  });

  it('should sort components alphabetically within each category', () => {
    const result = groupComponentsByCategory(['TextField', 'Checkbox', 'Radio']);
    const formsCategory = result.find(({ category }) => category === 'Forms');

    expect(formsCategory?.components).toEqual(['Checkbox', 'Radio', 'TextField']);
  });

  it('should place unknown components in an Uncategorized group', () => {
    const result = groupComponentsByCategory(['NonExistent', 'AlsoUnknown']);
    const uncategorized = result.find(({ category }) => category === UNCATEGORIZED_CATEGORY);

    expect(uncategorized?.components).toEqual(['AlsoUnknown', 'NonExistent']);
  });

  it('should place Uncategorized group at the end', () => {
    const result = groupComponentsByCategory(['Button', 'Unknown']);
    const categories = result.map(({ category }) => category);

    expect(categories).toEqual(['Actions', UNCATEGORIZED_CATEGORY]);
  });

  it('should return an empty array for empty input', () => {
    const result = groupComponentsByCategory([]);

    expect(result).toEqual([]);
  });

  it('should return categories in the same order as COMPONENT_CATEGORIES', () => {
    const result = groupComponentsByCategory(['Modal', 'Button', 'Heading']);
    const categories = result.map(({ category }) => category);

    expect(categories).toEqual(['Actions', 'Overlays', 'Typography']);
  });
});
