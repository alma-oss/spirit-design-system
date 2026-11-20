import { exampleTypographyTokens } from '../../../tests/fixtures/internal-model/exampleTypographyTokens';
import { renderTypographyLeaves } from '../../../tests/fixtures/renderTypographyLeaves';
import { createDesignToken } from '../../../tests/helpers/createDesignToken';
import { createTokenIndex } from '../../core/tokenIndex';
import {
  type CompositeValue,
  type DesignToken,
  type DeviceDimensionMap,
  type StylesObjectType,
  TokenTypeEnum,
} from '../../core/types';
import { handleTypographyTokens } from '../typographyObjectProcessor';

describe('typographyObjectProcessor', () => {
  describe('handleTypographyTokens', () => {
    it('should handle typography token without device dimensions', () => {
      const token = exampleTypographyTokens.get('typographyRef1')!;
      const stylesObject: StylesObjectType = {};

      handleTypographyTokens(['Heading', 'XLarge', 'Bold'], token, true, stylesObject, false);

      expect(stylesObject).toHaveProperty('$heading-xlarge-bold');
      expect(stylesObject['$heading-xlarge-bold']).toHaveProperty('mobile');
    });

    it('should handle typography token with device dimensions', () => {
      const token = exampleTypographyTokens.get('typographyRef1')!;
      const stylesObject: StylesObjectType = {};
      const deviceDimensions: DeviceDimensionMap = new Map();
      deviceDimensions.set('font-size', {
        mobile: { measure: 32, unit: 'px' },
        desktop: { measure: 40, unit: 'px' },
      });
      deviceDimensions.set('line-height', {
        mobile: { measure: 48, unit: 'px' },
        desktop: { measure: 52, unit: 'px' },
      });

      const dimensionToken = (id: string, name: string): DesignToken => ({
        id,
        name,
        type: TokenTypeEnum.Dimension,
        value: { type: 'number', value: 0, unit: 'px' },
        metadata: { groupPath: [], originName: name },
        source: { adapter: 'test', originalId: id },
      });
      const tokenIndex = createTokenIndex([
        dimensionToken('font-size-id', 'font-size'),
        dimensionToken('line-height-id', 'line-height'),
      ]);

      handleTypographyTokens(
        ['Heading', 'XLarge', 'Bold'],
        token,
        true,
        stylesObject,
        false,
        deviceDimensions,
        undefined,
        tokenIndex,
      );

      expect(renderTypographyLeaves(stylesObject, false)).toStrictEqual({
        '$heading-xlarge-bold': {
          mobile:
            '(\nfont-family: "\'Inter\', sans-serif",\nfont-size: 32px,\nfont-style: normal,\nfont-weight: 700,\nline-height: 1.5,\n)',
          desktop:
            '(\nfont-family: "\'Inter\', sans-serif",\nfont-size: 40px,\nfont-style: normal,\nfont-weight: 700,\nline-height: 1.3,\n)',
        },
      });
    });

    it('should override only the dimension a device collection provides', () => {
      const token = exampleTypographyTokens.get('typographyRef1')!;
      const stylesObject: StylesObjectType = {};
      const deviceDimensions: DeviceDimensionMap = new Map([
        ['font-size-id', { mobile: { measure: 36, unit: 'px' }, desktop: { measure: 40, unit: 'px' } }],
      ]);

      handleTypographyTokens(['Heading', 'XLarge', 'Bold'], token, true, stylesObject, false, deviceDimensions);

      expect(renderTypographyLeaves(stylesObject, false)).toStrictEqual({
        '$heading-xlarge-bold': {
          mobile:
            '(\nfont-family: "\'Inter\', sans-serif",\nfont-size: 36px,\nfont-style: normal,\nfont-weight: 700,\nline-height: 1.4444,\n)',
          desktop:
            '(\nfont-family: "\'Inter\', sans-serif",\nfont-size: 40px,\nfont-style: normal,\nfont-weight: 700,\nline-height: 1.3,\n)',
        },
      });
    });

    it('should keep a single-sized style on one breakpoint', () => {
      const base = exampleTypographyTokens.get('typographyRef1')!;
      const token: DesignToken = {
        ...base,
        value: {
          type: 'composite',
          value: {
            ...(base.value as CompositeValue).value,
            fontSize: { type: 'number', value: 14, unit: 'px' },
            lineHeight: { type: 'number', value: 20, unit: 'px' },
          },
        },
      };
      const stylesObject: StylesObjectType = {};

      handleTypographyTokens(['Caption'], token, true, stylesObject, true, new Map());

      expect(renderTypographyLeaves(stylesObject, true)).toStrictEqual({
        caption: {
          mobile:
            "{\nfontFamily: \"'Inter', sans-serif\",\nfontSize: '14px',\nfontStyle: 'normal',\nfontWeight: 700,\nlineHeight: 1.4286,\n}",
        },
      });
    });

    it('should skip a token that is not a typography', () => {
      const stylesObject: StylesObjectType = {};

      handleTypographyTokens(
        ['Grid', 'spacing'],
        createDesignToken(TokenTypeEnum.String, { type: 'string', value: 'x' }, { id: 'x' }),
        true,
        stylesObject,
        false,
      );

      expect(renderTypographyLeaves(stylesObject, false)).toStrictEqual({});
    });

    it('should handle typography token with fontSizeBaseMap', () => {
      const token = exampleTypographyTokens.get('typographyRef1')!;
      const stylesObject: StylesObjectType = {};
      const fontSizeBaseMap = new Map([
        ['mobile', 14],
        ['tablet', 16],
        ['desktop', 18],
      ]);

      handleTypographyTokens(
        ['Heading', 'XLarge', 'Bold'],
        token,
        true,
        stylesObject,
        false,
        undefined,
        fontSizeBaseMap,
      );

      expect(stylesObject).toHaveProperty('$heading-xlarge-bold');

      const typographyObj = stylesObject['$heading-xlarge-bold'] as { [key: string]: unknown };

      expect(Object.keys(typographyObj).length).toBeGreaterThan(0);
    });

    it('should handle typography token with JS output', () => {
      const token = exampleTypographyTokens.get('typographyRef1')!;
      const stylesObject: StylesObjectType = {};

      handleTypographyTokens(['Heading', 'XLarge', 'Bold'], token, true, stylesObject, true);

      expect(stylesObject).toHaveProperty('headingXlargeBold');
      expect(stylesObject).not.toHaveProperty('$heading-xlarge-bold');
    });

    it('should handle typography token with italic in name', () => {
      const token = exampleTypographyTokens.get('typographyRef1')!;
      const stylesObject: StylesObjectType = {};

      handleTypographyTokens(['Heading', 'XLarge', 'Bold-Italic'], token, true, stylesObject, false);

      expect(stylesObject).toHaveProperty('$heading-xlarge-bold-italic');

      const typographyObj = stylesObject['$heading-xlarge-bold-italic'] as { [key: string]: unknown };
      const mobileValue = renderTypographyLeaves(typographyObj.mobile, false) as string;

      expect(mobileValue).toContain('italic');
    });

    it('should handle typography token with nested structure', () => {
      const token = exampleTypographyTokens.get('typographyRef1')!;
      const stylesObject: StylesObjectType = {};

      handleTypographyTokens(['Typography', 'Heading', 'XLarge', 'Bold'], token, true, stylesObject, false);

      expect(Object.keys(stylesObject).length).toBeGreaterThan(0);

      const firstKey = Object.keys(stylesObject)[0];

      expect(typeof stylesObject[firstKey]).toBe('object');
    });
  });
});
