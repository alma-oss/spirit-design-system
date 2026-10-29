import { existsSync } from 'fs';
import { join } from 'path';
import { fetchAllComponents } from '../../../../repositories/componentsRepository';
import { COMPONENT_CATEGORIES } from '../../constants/componentCategories';
import { COMPONENT_DESCRIPTIONS, getComponentDescription } from '../../constants/componentDescriptions';
import { fetchComponentsCatalog } from '../componentsCatalogRepository';

describe('componentsCatalogRepository', () => {
  it('should keep the authored card descriptions', () => {
    expect(getComponentDescription('Button')).toBe(COMPONENT_DESCRIPTIONS.Button);
    expect(getComponentDescription('Item')).toBe(COMPONENT_DESCRIPTIONS.Item);
  });

  it('should name the component in the fallback description for a component without authored copy', () => {
    expect(getComponentDescription('Box')).toBe('Spirit Box component');
    expect(getComponentDescription('UNSTABLE_Tile')).toBe('Spirit Tile component');
  });

  it('should keep the current category membership', () => {
    expect(COMPONENT_CATEGORIES.Forms).toContain('Field');
    expect(COMPONENT_CATEGORIES.Forms).toContain('TextField');
    expect(Object.values(COMPONENT_CATEGORIES).flat()).not.toContain('ActionText');
  });

  it('should describe every catalog entry and place an uncategorized component in Uncategorized', () => {
    const [button, actionText] = fetchComponentsCatalog(['Button', 'ActionText']);

    expect(button).toMatchObject({
      name: 'Button',
      category: 'Actions',
      description: COMPONENT_DESCRIPTIONS.Button,
    });
    expect(actionText.category).toBe('Uncategorized');
  });

  it('should keep the order of the requested components', () => {
    expect(fetchComponentsCatalog(['Tag', 'Alert', 'Button']).map(({ name }) => name)).toEqual([
      'Tag',
      'Alert',
      'Button',
    ]);
  });

  it('should ship an illustration file for every illustrated component', () => {
    const illustrations = fetchComponentsCatalog(fetchAllComponents())
      .map(({ illustration }) => illustration)
      .filter((illustration): illustration is string => Boolean(illustration));

    expect(illustrations.length).toBeGreaterThan(0);
    expect(illustrations.filter((illustration) => !existsSync(join(process.cwd(), 'public', illustration)))).toEqual(
      [],
    );
  });

  it('should take the illustration from the component name', () => {
    const [button, unstableCombobox] = fetchComponentsCatalog(['Button', 'UNSTABLE_Combobox']);

    expect(button.illustration).toBe('/component-illustrations/button.svg');
    expect(unstableCombobox.illustration).toBe('/component-illustrations/unstable-combobox.svg');
  });

  it('should leave a component without an illustration on the placeholder', () => {
    expect(fetchComponentsCatalog(['Dialog'])[0].illustration).toBeUndefined();
  });
});
