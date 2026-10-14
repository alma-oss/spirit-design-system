import { COMPONENT_PREVIEWS } from '../../previews';
import { getComponentCatalogEntry } from '../componentCatalog';
import { COMPONENT_CATEGORIES } from '../componentCategories';
import { COMPONENT_DESCRIPTIONS, getComponentDescription, LOREM_IPSUM_DESCRIPTIONS } from '../componentDescriptions';
import { COMPONENTS_WITHOUT_PREVIEW, COMPONENT_PREVIEW_MANIFEST } from '../componentPreviewManifest';

describe('componentCatalog', () => {
  it('should keep the authored card descriptions', () => {
    expect(getComponentDescription('Button')).toBe(COMPONENT_DESCRIPTIONS.Button);
    expect(getComponentDescription('Item')).toBe(COMPONENT_DESCRIPTIONS.Item);
  });

  it('should keep the existing fallback description for a component without authored copy', () => {
    expect(LOREM_IPSUM_DESCRIPTIONS).toContain(getComponentDescription('Box'));
    expect(getComponentDescription('Box').length).toBeGreaterThan(0);
  });

  it('should keep the current category membership', () => {
    expect(COMPONENT_CATEGORIES.Forms).toContain('Field');
    expect(COMPONENT_CATEGORIES.Forms).toContain('TextField');
    expect(Object.values(COMPONENT_CATEGORIES).flat()).not.toContain('ActionText');
  });

  it('should describe every catalog entry and place an uncategorized component in Uncategorized', () => {
    expect(getComponentCatalogEntry('Button')).toMatchObject({
      name: 'Button',
      category: 'Actions',
      description: COMPONENT_DESCRIPTIONS.Button,
    });
    expect(getComponentCatalogEntry('ActionText').category).toBe('Uncategorized');
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
      expect(getComponentCatalogEntry(component).Preview).toBeUndefined();
    });
  });
});
