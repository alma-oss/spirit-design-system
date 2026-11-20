import { exampleDimensionAndStringTokens } from '../../../tests/fixtures/internal-model/exampleDimensionAndStringTokens';
import { createDesignToken } from '../../../tests/helpers/createDesignToken';
import { type StylesObjectType, TokenTypeEnum } from '../../core/types';
import { handleNonTypographyTokens } from '../nonTypographyObjectProcessor';

describe('nonTypographyObjectProcessor', () => {
  describe('handleNonTypographyTokens', () => {
    it('should handle dimension token without device alias', () => {
      const token = exampleDimensionAndStringTokens.get('dimensionRef')!;
      const stylesObject: StylesObjectType = {};

      handleNonTypographyTokens(['Grid', 'spacing', 'desktop'], token, true, stylesObject, false);

      expect(stylesObject).toHaveProperty('$grids');

      // eslint-disable-next-line dot-notation -- $grids contains special character
      const gridsObj = stylesObject['$grids'] as { [key: string]: unknown };

      expect(gridsObj).toHaveProperty('spacing');

      const spacingObj = gridsObj.spacing as { [key: string]: unknown };

      expect(spacingObj).toHaveProperty('desktop');
      expect(spacingObj.desktop).toBe('$grid-spacing-desktop');
    });

    it('should handle dimension token with device alias', () => {
      const token = createDesignToken(
        TokenTypeEnum.Dimension,
        { type: 'number', value: 32, unit: 'px' },
        {
          id: 'test-id',
          name: 'spacing',
          metadata: {
            originName: 'Grid/spacing',
            device: 'mobile',
            groupPath: ['Grid', 'spacing'],
            namePath: ['Grid', 'spacing'],
          },
        },
      );

      const stylesObject: StylesObjectType = {};

      handleNonTypographyTokens(['Grid', 'spacing'], token, true, stylesObject, false);

      expect(stylesObject).toHaveProperty('$grids');

      // eslint-disable-next-line dot-notation -- $grids contains special character
      const gridsObj = stylesObject['$grids'] as { [key: string]: unknown };

      expect(gridsObj).toHaveProperty('spacing');

      const spacingObj = gridsObj.spacing as { [key: string]: unknown };

      expect(spacingObj).toHaveProperty('mobile');
      expect(spacingObj.mobile).toBe('$grid-spacing-spacing-mobile');
    });

    it('should handle string token', () => {
      const token = exampleDimensionAndStringTokens.get('stringRef')!;
      const stylesObject: StylesObjectType = {};

      handleNonTypographyTokens(['Grid', 'Columns'], token, true, stylesObject, false);

      expect(stylesObject).toHaveProperty('$grids');

      // eslint-disable-next-line dot-notation -- $grids contains special character
      const gridsObj = stylesObject['$grids'] as { [key: string]: unknown };

      expect(gridsObj).toHaveProperty('columns');
      expect(gridsObj.columns).toBe('$grid-columns');
    });

    it('should handle token with JS output', () => {
      const token = exampleDimensionAndStringTokens.get('dimensionRef')!;
      const stylesObject: StylesObjectType = {};

      handleNonTypographyTokens(['Grid', 'spacing', 'desktop'], token, true, stylesObject, true);

      expect(stylesObject).toHaveProperty('grids');
      expect(stylesObject).not.toHaveProperty('$grids');

      const gridsObj = stylesObject.grids as { [key: string]: unknown };

      expect(gridsObj).toHaveProperty('spacing');

      const spacingObj = gridsObj.spacing as { [key: string]: unknown };

      expect(spacingObj.desktop).toBe('gridSpacingDesktop');
    });

    it('should handle token with single part name', () => {
      const token = createDesignToken(
        TokenTypeEnum.Dimension,
        { type: 'number', value: 32, unit: 'px' },
        { id: 'test-id', name: 'spacing', metadata: { originName: 'spacing' } },
      );

      const stylesObject: StylesObjectType = {};

      handleNonTypographyTokens(['spacing'], token, true, stylesObject, false);

      expect(Object.keys(stylesObject).length).toBeGreaterThan(0);
    });

    it('should handle token with nested structure', () => {
      const token = createDesignToken(
        TokenTypeEnum.Color,
        { type: 'color', format: 'hex', value: '#ffffffff' },
        { id: 'test-id', name: 'primary', metadata: { originName: 'Colors/Background/primary' } },
      );

      const stylesObject: StylesObjectType = {};

      handleNonTypographyTokens(['Colors', 'Background', 'primary'], token, true, stylesObject, false);

      expect(Object.keys(stylesObject).length).toBeGreaterThan(0);

      const firstKey = Object.keys(stylesObject)[0];

      expect(typeof stylesObject[firstKey]).toBe('object');
    });

    it('should handle token without parent prefix', () => {
      const token = exampleDimensionAndStringTokens.get('dimensionRef')!;
      const stylesObject: StylesObjectType = {};

      handleNonTypographyTokens(['Grid', 'spacing', 'desktop'], token, false, stylesObject, false);

      expect(stylesObject).toHaveProperty('$grids');

      // eslint-disable-next-line dot-notation -- $grids contains special character
      const gridsObj = stylesObject['$grids'] as { [key: string]: unknown };
      const spacingObj = gridsObj.spacing as { [key: string]: unknown };

      expect(spacingObj.desktop).toBe('$desktop');
    });
  });
});
