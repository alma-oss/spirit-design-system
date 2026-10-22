import { groupComponentsByCategory, UNCATEGORIZED_CATEGORY } from '../groupComponentsByCategory';

const componentCategories = {
  Actions: { description: 'Actions description.', components: ['Button'] },
  Feedback: { description: 'Feedback description.', components: ['Alert'] },
  Forms: { description: 'Forms description.', components: ['Checkbox', 'Radio', 'TextField'] },
  Overlays: { description: 'Overlays description.', components: ['Dialog', 'Modal'] },
  Text: { description: 'Text description.', components: ['Heading'] },
};

describe('groupComponentsByCategory', () => {
  it('should group components into their respective categories', () => {
    const result = groupComponentsByCategory(['Button', 'Alert', 'Dialog'], componentCategories);

    expect(result).toEqual([
      { category: 'Actions', description: componentCategories.Actions.description, components: ['Button'] },
      { category: 'Feedback', description: componentCategories.Feedback.description, components: ['Alert'] },
      { category: 'Overlays', description: componentCategories.Overlays.description, components: ['Dialog'] },
    ]);
  });

  it('should exclude categories with no matching components', () => {
    const result = groupComponentsByCategory(['Button'], componentCategories);
    const categories = result.map(({ category }) => category);

    expect(categories).toEqual(['Actions']);
  });

  it('should sort components alphabetically within each category', () => {
    const result = groupComponentsByCategory(['TextField', 'Checkbox', 'Radio'], componentCategories);
    const formsCategory = result.find(({ category }) => category === 'Forms');

    expect(formsCategory?.components).toEqual(['Checkbox', 'Radio', 'TextField']);
  });

  it('should place unknown components in an Uncategorized group', () => {
    const result = groupComponentsByCategory(['NonExistent', 'AlsoUnknown'], componentCategories);
    const uncategorized = result.find(({ category }) => category === UNCATEGORIZED_CATEGORY);

    expect(uncategorized?.components).toEqual(['AlsoUnknown', 'NonExistent']);
    expect(uncategorized?.description).toBeUndefined();
  });

  it('should place Uncategorized group at the end', () => {
    const result = groupComponentsByCategory(['Button', 'Unknown'], componentCategories);
    const categories = result.map(({ category }) => category);

    expect(categories).toEqual(['Actions', UNCATEGORIZED_CATEGORY]);
  });

  it('should return an empty array for empty input', () => {
    const result = groupComponentsByCategory([], componentCategories);

    expect(result).toEqual([]);
  });

  it('should return categories in the order of the definitions', () => {
    const result = groupComponentsByCategory(['Modal', 'Button', 'Heading'], componentCategories);
    const categories = result.map(({ category }) => category);

    expect(categories).toEqual(['Actions', 'Overlays', 'Text']);
  });
});
