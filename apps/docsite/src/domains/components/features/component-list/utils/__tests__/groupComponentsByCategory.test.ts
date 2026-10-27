import { groupComponentsByCategory } from '../groupComponentsByCategory';

const componentCategories = {
  Actions: { description: 'Actions description.', components: ['Button'] },
  Feedback: { description: 'Feedback description.', components: ['Alert'] },
  Forms: { description: 'Forms description.', components: ['Checkbox', 'Radio', 'TextField'] },
  Overlays: { description: 'Overlays description.', components: ['Dialog', 'Modal'] },
  Text: { description: 'Text description.', components: ['Heading'] },
};

const toEntries = (names: string[]) => names.map((name) => ({ name }));

describe('groupComponentsByCategory', () => {
  it('should group components into their respective categories', () => {
    const result = groupComponentsByCategory(toEntries(['Button', 'Alert', 'Dialog']), componentCategories);

    expect(result).toEqual([
      { category: 'Actions', description: componentCategories.Actions.description, components: toEntries(['Button']) },
      {
        category: 'Feedback',
        description: componentCategories.Feedback.description,
        components: toEntries(['Alert']),
      },
      {
        category: 'Overlays',
        description: componentCategories.Overlays.description,
        components: toEntries(['Dialog']),
      },
    ]);
  });

  it('should exclude categories with no matching components', () => {
    const result = groupComponentsByCategory(toEntries(['Button']), componentCategories);
    const categories = result.map(({ category }) => category);

    expect(categories).toEqual(['Actions']);
  });

  it('should sort components alphabetically within each category', () => {
    const result = groupComponentsByCategory(toEntries(['TextField', 'Checkbox', 'Radio']), componentCategories);
    const formsCategory = result.find(({ category }) => category === 'Forms');

    expect(formsCategory?.components).toEqual(toEntries(['Checkbox', 'Radio', 'TextField']));
  });

  it('should leave out components missing from the categories', () => {
    const result = groupComponentsByCategory(toEntries(['Button', 'Unknown']), componentCategories);

    expect(result).toEqual([
      { category: 'Actions', description: componentCategories.Actions.description, components: toEntries(['Button']) },
    ]);
  });

  it('should return an empty array for empty input', () => {
    const result = groupComponentsByCategory([], componentCategories);

    expect(result).toEqual([]);
  });

  it('should return categories in the order of the definitions', () => {
    const result = groupComponentsByCategory(toEntries(['Modal', 'Button', 'Heading']), componentCategories);
    const categories = result.map(({ category }) => category);

    expect(categories).toEqual(['Actions', 'Overlays', 'Text']);
  });

  it('should keep the other properties of the entries', () => {
    const [{ components }] = groupComponentsByCategory(
      [{ name: 'Button', illustration: '/button.svg' }],
      componentCategories,
    );

    expect(components).toEqual([{ name: 'Button', illustration: '/button.svg' }]);
  });
});
