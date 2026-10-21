import { fetchAllComponents } from '../../../../repositories/componentsRepository';
import * as previewModules from '../../../component-card/previews';
import { COMPONENT_CATEGORIES } from '../../constants/componentCategories';
import { COMPONENT_DESCRIPTIONS, getComponentDescription } from '../../constants/componentDescriptions';
import { PREVIEW_GUIDES } from '../../constants/previewGuides';
import type { PreviewComponent } from '../../types';
import { fetchComponentsCatalog } from '../componentsCatalogRepository';

// The unit test job does not build `@alma-oss/spirit-web-react`, so its `dist` entry point is missing there.
jest.mock(
  '@alma-oss/spirit-web-react',
  () =>
    new Proxy({ __esModule: true } as Record<string | symbol, unknown>, {
      get: (target, name) => (name in target ? target[name] : () => null),
    }),
  { virtual: true },
);

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

  it('should export a component and valid guides from every card preview', () => {
    Object.values(previewModules).forEach(({ default: Preview }) => {
      expect(typeof Preview).toBe('function');
      expect([undefined, ...Object.values(PREVIEW_GUIDES)]).toContain((Preview as PreviewComponent).guides);
    });
  });

  it('should name every card preview after an existing component', () => {
    const components = fetchAllComponents();

    Object.keys(previewModules).forEach((component) => {
      expect(components).toContain(component);
    });
  });

  it('should take the preview and its guides from the preview module', () => {
    const [accordion, button] = fetchComponentsCatalog(['Accordion', 'Button']);

    expect(accordion.Preview).toBe(previewModules.Accordion.default);
    expect(accordion.guides).toBe(PREVIEW_GUIDES.VERTICAL);
    expect(button.guides).toBeUndefined();
  });

  it('should leave a component without a preview module on the placeholder', () => {
    expect(fetchComponentsCatalog(['Dialog'])[0].Preview).toBeUndefined();
  });
});
