import { Token, TokenGroup, TokenType, Unit } from '@supernovaio/sdk-exporters';
import { exampleDimensionAndStringTokens } from '../../../tests/fixtures/exampleDimensionAndStringTokens';
import { exampleGroups } from '../../../tests/fixtures/exampleGroups';
import { sampleConfigurationDefault } from '../../../tests/fixtures/sampleConfiguration';
import type { StylesObjectType } from '../../generators/stylesObjectGenerator';
import { handleNonTypographyTokens } from '../nonTypographyObjectProcessor';

const tokenGroups: Array<TokenGroup> = exampleGroups;
jest.mock('../../../config', () => ({
  exportConfiguration: sampleConfigurationDefault,
}));

describe('nonTypographyObjectProcessor', () => {
  describe('handleNonTypographyTokens', () => {
    it('should handle dimension token without device alias', () => {
      const token = exampleDimensionAndStringTokens.get('dimensionRef') as Token;
      const stylesObject: StylesObjectType = {};

      handleNonTypographyTokens(['Grid', 'spacing', 'desktop'], token, tokenGroups, true, stylesObject, false);

      expect(stylesObject).toHaveProperty('$grids');

      // eslint-disable-next-line dot-notation -- $grids contains special character
      const gridsObj = stylesObject['$grids'] as { [key: string]: unknown };

      expect(gridsObj).toHaveProperty('spacing');

      const spacingObj = gridsObj.spacing as { [key: string]: unknown };

      expect(spacingObj).toHaveProperty('desktop');
      expect(spacingObj.desktop).toBe('$grid-spacing-desktop');
    });

    it('should handle dimension token with device alias', () => {
      const token: Token = {
        id: 'test-id',
        name: 'spacing',
        tokenType: TokenType.dimension,
        parentGroupId: '1',
        origin: { name: 'Grid/spacing' },
        value: {
          measure: 32,
          unit: Unit.pixels,
          referencedTokenId: null,
        },
        properties: [],
        propertyValues: { device: 'mobile' },
      } as unknown as Token;

      const stylesObject: StylesObjectType = {};

      handleNonTypographyTokens(['Grid', 'spacing'], token, tokenGroups, true, stylesObject, false);

      expect(stylesObject).toHaveProperty('$grids');

      // eslint-disable-next-line dot-notation -- $grids contains special character
      const gridsObj = stylesObject['$grids'] as { [key: string]: unknown };

      expect(gridsObj).toHaveProperty('spacing');

      const spacingObj = gridsObj.spacing as { [key: string]: unknown };

      expect(spacingObj).toHaveProperty('mobile');
      expect(spacingObj.mobile).toBe('$grid-spacing-spacing-mobile');
    });

    it('should handle string token', () => {
      const token = exampleDimensionAndStringTokens.get('stringRef') as Token;
      const stylesObject: StylesObjectType = {};

      handleNonTypographyTokens(['Grid', 'Columns'], token, tokenGroups, true, stylesObject, false);

      expect(stylesObject).toHaveProperty('$grids');

      // eslint-disable-next-line dot-notation -- $grids contains special character
      const gridsObj = stylesObject['$grids'] as { [key: string]: unknown };

      expect(gridsObj).toHaveProperty('columns');
      expect(gridsObj.columns).toBe('$grid-columns');
    });

    it('should handle token with JS output', () => {
      const token = exampleDimensionAndStringTokens.get('dimensionRef') as Token;
      const stylesObject: StylesObjectType = {};

      handleNonTypographyTokens(['Grid', 'spacing', 'desktop'], token, tokenGroups, true, stylesObject, true);

      expect(stylesObject).toHaveProperty('grids');
      expect(stylesObject).not.toHaveProperty('$grids');

      const gridsObj = stylesObject.grids as { [key: string]: unknown };

      expect(gridsObj).toHaveProperty('spacing');

      const spacingObj = gridsObj.spacing as { [key: string]: unknown };

      expect(spacingObj.desktop).toBe('gridSpacingDesktop');
    });

    it('should handle token with single part name', () => {
      const token: Token = {
        id: 'test-id',
        name: 'spacing',
        tokenType: TokenType.dimension,
        parentGroupId: '1',
        origin: { name: 'spacing' },
        value: {
          measure: 32,
          unit: Unit.pixels,
          referencedTokenId: null,
        },
        properties: [],
        propertyValues: {},
      } as unknown as Token;

      const stylesObject: StylesObjectType = {};

      handleNonTypographyTokens(['spacing'], token, tokenGroups, true, stylesObject, false);

      expect(Object.keys(stylesObject).length).toBeGreaterThan(0);
    });

    it('should handle token with nested structure', () => {
      const token: Token = {
        id: 'test-id',
        name: 'primary',
        tokenType: TokenType.color,
        parentGroupId: '1',
        origin: { name: 'Colors/Background/primary' },
        value: {
          r: 255,
          g: 255,
          b: 255,
          a: 1,
          referencedTokenId: null,
        },
        properties: [],
        propertyValues: {},
      } as unknown as Token;

      const stylesObject: StylesObjectType = {};

      handleNonTypographyTokens(['Colors', 'Background', 'primary'], token, tokenGroups, true, stylesObject, false);

      expect(Object.keys(stylesObject).length).toBeGreaterThan(0);

      const firstKey = Object.keys(stylesObject)[0];

      expect(typeof stylesObject[firstKey]).toBe('object');
    });

    it('should handle token without parent prefix', () => {
      const token = exampleDimensionAndStringTokens.get('dimensionRef') as Token;
      const stylesObject: StylesObjectType = {};

      handleNonTypographyTokens(['Grid', 'spacing', 'desktop'], token, tokenGroups, false, stylesObject, false);

      expect(stylesObject).toHaveProperty('$grids');

      // eslint-disable-next-line dot-notation -- $grids contains special character
      const gridsObj = stylesObject['$grids'] as { [key: string]: unknown };
      const spacingObj = gridsObj.spacing as { [key: string]: unknown };

      expect(spacingObj.desktop).toBe('$desktop');
    });
  });
});
