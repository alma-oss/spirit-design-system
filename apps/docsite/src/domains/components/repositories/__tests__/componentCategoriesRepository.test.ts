import { fetchComponentCategories, parseComponentCategories } from '../componentCategoriesRepository';
import { fetchAllComponents } from '../componentsRepository';

describe('fetchComponentCategories', () => {
  const fetchCategories = () => fetchComponentCategories(fetchAllComponents());

  it('should place every existing component in exactly one category', () => {
    expect(fetchCategories).not.toThrow();
  });

  it('should have components sorted alphabetically within each category', () => {
    for (const { components } of Object.values(fetchCategories())) {
      const sorted = [...components].sort();

      expect(components).toEqual(sorted);
    }
  });

  it('should have categories sorted alphabetically', () => {
    const categoryNames = Object.keys(fetchCategories());
    const sorted = [...categoryNames].sort();

    expect(categoryNames).toEqual(sorted);
  });
});

describe('parseComponentCategories', () => {
  const category = (name: string, components: string[]) => [
    `${name}:`,
    '  description: Single controls.',
    '  components:',
    ...components.map((component) => `    - ${component}`),
  ];

  it('should parse categories', () => {
    expect(parseComponentCategories(category('Actions', ['Button']).join('\n'), ['Button'])).toEqual({
      Actions: { description: 'Single controls.', components: ['Button'] },
    });
  });

  it('should join a folded description into one line', () => {
    const raw = ['Actions:', '  description: >-', '    Single', '    controls.', '  components:', '    - Button'];

    expect(parseComponentCategories(raw.join('\n'), ['Button']).Actions.description).toBe('Single controls.');
  });

  it('should reject a misspelled component', () => {
    expect(() => parseComponentCategories(category('Actions', ['Button', 'Buton']).join('\n'), ['Button'])).toThrow(
      'component-categories.yaml has unknown components: Buton.',
    );
  });

  it('should reject a component in more than one category, naming it once', () => {
    const raw = [...category('Actions', ['Button']), ...category('Forms', ['Button']), ...category('Text', ['Button'])];

    expect(() => parseComponentCategories(raw.join('\n'), ['Button'])).toThrow(
      'component-categories.yaml has components in more than one category: Button.',
    );
  });

  it('should reject a component without a category', () => {
    expect(() => parseComponentCategories(category('Actions', ['Button']).join('\n'), ['Button', 'Link'])).toThrow(
      'component-categories.yaml has components without a category: Link.',
    );
  });

  it('should reject a file that is not a map of categories', () => {
    expect(() => parseComponentCategories('- Button', ['Button'])).toThrow(
      'component-categories.yaml must be a map of categories.',
    );
  });

  it('should reject a category that is not a map', () => {
    expect(() => parseComponentCategories('Actions: [Button]', ['Button'])).toThrow(
      'Category "Actions" in component-categories.yaml must be a map with a description and components.',
    );
  });

  it('should reject a category without a description', () => {
    const raw = ['Actions:', '  components:', '    - Button'];

    expect(() => parseComponentCategories(raw.join('\n'), ['Button'])).toThrow(
      'Category "Actions" in component-categories.yaml must have a description.',
    );
  });

  it('should reject a category without a list of components', () => {
    const raw = ['Actions:', '  description: Single controls.', '  components: Button'];

    expect(() => parseComponentCategories(raw.join('\n'), ['Button'])).toThrow(
      'Category "Actions" in component-categories.yaml must list its components.',
    );
  });

  it('should reject a category with an empty list of components', () => {
    const raw = ['Actions:', '  description: Single controls.', '  components: []'];

    expect(() => parseComponentCategories(raw.join('\n'), [])).toThrow(
      'Category "Actions" in component-categories.yaml must list its components.',
    );
  });
});
