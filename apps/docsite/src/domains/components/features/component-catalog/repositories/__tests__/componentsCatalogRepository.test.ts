import { readdirSync } from 'fs';
import { join } from 'path';
import { fetchAllComponents } from '../../../../repositories/componentsRepository';
import { componentNameToSlug } from '../../../../utils/componentSlug';
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

  it('should describe every catalog entry', () => {
    const [button] = fetchComponentsCatalog(['Button']);

    expect(button).toMatchObject({
      name: 'Button',
      description: COMPONENT_DESCRIPTIONS.Button,
    });
  });

  it('should keep the order of the requested components', () => {
    expect(fetchComponentsCatalog(['Tag', 'Alert', 'Button']).map(({ name }) => name)).toEqual([
      'Tag',
      'Alert',
      'Button',
    ]);
  });

  it('should name every illustration file after an existing component', () => {
    const slugs = fetchAllComponents().map(componentNameToSlug);
    const files = readdirSync(join(process.cwd(), 'public', 'component-illustrations')).filter((file) =>
      file.endsWith('.svg'),
    );

    expect(files.length).toBeGreaterThan(0);
    expect(files.filter((file) => !slugs.includes(file.slice(0, -'.svg'.length)))).toEqual([]);
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
