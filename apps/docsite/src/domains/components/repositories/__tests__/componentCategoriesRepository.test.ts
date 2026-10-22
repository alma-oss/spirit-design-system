import { fetchComponentsSchema, parseComponentsSchema } from '../componentCategoriesRepository';
import { fetchAllComponents } from '../componentsRepository';

describe('fetchComponentsSchema', () => {
  const { components, categories } = fetchComponentsSchema();
  const allCategorized = Object.values(categories).flatMap(({ components: categoryComponents }) => categoryComponents);

  it('should have components sorted alphabetically', () => {
    expect(components).toEqual([...components].sort());
  });

  it('should list every component once', () => {
    expect(components).toHaveLength(new Set(components).size);
  });

  it('should list exactly the existing components in docs/components.schema.yaml', () => {
    expect(components).toEqual([...fetchAllComponents()].sort());
  });

  it('should place every component in a category in docs/components.schema.yaml (see the placement rule in its header)', () => {
    const categorized = new Set(allCategorized);

    expect(components.filter((component) => !categorized.has(component))).toEqual([]);
  });

  it('should have no duplicate components across categories', () => {
    const uniqueComponents = new Set(allCategorized);

    expect(allCategorized).toHaveLength(uniqueComponents.size);
  });

  it('should have no empty categories', () => {
    for (const { components: categoryComponents } of Object.values(categories)) {
      expect(categoryComponents.length).toBeGreaterThan(0);
    }
  });

  it('should have components sorted alphabetically within each category', () => {
    for (const { components: categoryComponents } of Object.values(categories)) {
      const sorted = [...categoryComponents].sort();

      expect(categoryComponents).toEqual(sorted);
    }
  });

  it('should have categories sorted alphabetically', () => {
    const categoryNames = Object.keys(categories);
    const sorted = [...categoryNames].sort();

    expect(categoryNames).toEqual(sorted);
  });
});

describe('parseComponentsSchema', () => {
  const schema = (categoryComponents: string[]) =>
    [
      'components:',
      '  - &Button Button',
      'categories:',
      '  Actions:',
      '    description: Single controls.',
      '    components:',
      ...categoryComponents.map((component) => `      - ${component}`),
    ].join('\n');

  it('should resolve category components from their anchors', () => {
    expect(parseComponentsSchema(schema(['*Button']))).toEqual({
      components: ['Button'],
      categories: { Actions: { description: 'Single controls.', components: ['Button'] } },
    });
  });

  it('should reject a misspelled alias', () => {
    expect(() => parseComponentsSchema(schema(['*Buton']))).toThrow('Unresolved alias');
  });

  it('should reject a category component missing from the components list', () => {
    expect(() => parseComponentsSchema(schema(['Buton']))).toThrow(
      'Category "Actions" in components.schema.yaml lists components missing from `components`: Buton.',
    );
  });

  it('should reject a file without a components list and a categories map', () => {
    expect(() => parseComponentsSchema('- Button')).toThrow('must have a `components` list and a `categories` map');
  });

  it('should reject a category without a description', () => {
    const raw = [
      'components:',
      '  - &Button Button',
      'categories:',
      '  Actions:',
      '    components:',
      '      - *Button',
    ].join('\n');

    expect(() => parseComponentsSchema(raw)).toThrow(
      'Category "Actions" in components.schema.yaml must have a description.',
    );
  });

  it('should reject a category without a list of components', () => {
    const raw = [
      'components:',
      '  - &Button Button',
      'categories:',
      '  Actions:',
      '    description: Single controls.',
      '    components: Button',
    ].join('\n');

    expect(() => parseComponentsSchema(raw)).toThrow(
      'Category "Actions" in components.schema.yaml must list its components.',
    );
  });
});
