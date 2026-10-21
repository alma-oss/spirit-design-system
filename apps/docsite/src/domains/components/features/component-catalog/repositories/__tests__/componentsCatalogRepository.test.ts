import { COMPONENT_PREVIEWS } from '../../../component-card/previews';
import { COMPONENT_CATEGORIES } from '../../constants/componentCategories';
import { COMPONENT_DESCRIPTIONS, getComponentDescription } from '../../constants/componentDescriptions';
import { COMPONENTS_WITHOUT_PREVIEW, COMPONENT_PREVIEW_MANIFEST } from '../../constants/componentPreviewManifest';
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

  it('should register a React preview for every manifest entry and no others', () => {
    expect(Object.keys(COMPONENT_PREVIEWS).sort()).toEqual(Object.keys(COMPONENT_PREVIEW_MANIFEST).sort());

    Object.entries(COMPONENT_PREVIEW_MANIFEST).forEach(([component, guides]) => {
      expect(typeof COMPONENT_PREVIEWS[component].Preview).toBe('function');
      expect(COMPONENT_PREVIEWS[component].guides).toBe(guides);
    });
  });

  it('should leave the components without a card preview unregistered', () => {
    COMPONENTS_WITHOUT_PREVIEW.forEach((component) => {
      expect(COMPONENT_PREVIEWS[component]).toBeUndefined();
    });
    fetchComponentsCatalog([...COMPONENTS_WITHOUT_PREVIEW]).forEach((entry) => {
      expect(entry.Preview).toBeUndefined();
    });
  });
});
