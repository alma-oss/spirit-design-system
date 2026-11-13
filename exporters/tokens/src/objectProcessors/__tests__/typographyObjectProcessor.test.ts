import { Token, TokenGroup, TypographyToken, Unit } from '@supernovaio/sdk-exporters';
import { exampleGroups } from '../../../tests/fixtures/exampleGroups';
import { exampleTypographyTokens } from '../../../tests/fixtures/exampleTypographyTokens';
import { sampleConfigurationDefault } from '../../../tests/fixtures/sampleConfiguration';
import type { DeviceDimensionMap, StylesObjectType } from '../../generators/stylesObjectGenerator';
import { handleTypographyTokens } from '../typographyObjectProcessor';

const tokenGroups: Array<TokenGroup> = exampleGroups;
jest.mock('../../../config', () => ({
  exportConfiguration: sampleConfigurationDefault,
}));

describe('typographyObjectProcessor', () => {
  describe('handleTypographyTokens', () => {
    it('should handle typography token without device dimensions', () => {
      const token = exampleTypographyTokens.get('typographyRef1') as TypographyToken;
      const stylesObject: StylesObjectType = {};

      handleTypographyTokens(['Heading', 'XLarge', 'Bold'], token, tokenGroups, true, stylesObject, false);

      expect(stylesObject).toHaveProperty('$heading-xlarge-bold');
      expect(stylesObject['$heading-xlarge-bold']).toHaveProperty('mobile');
    });

    it('should handle typography token with device dimensions', () => {
      const token = exampleTypographyTokens.get('typographyRef1') as TypographyToken;
      const stylesObject: StylesObjectType = {};
      const deviceDimensions: DeviceDimensionMap = new Map();
      deviceDimensions.set('font-size', {
        mobile: { measure: 32, unit: Unit.pixels },
        desktop: { measure: 40, unit: Unit.pixels },
      });
      deviceDimensions.set('line-height', {
        mobile: { measure: 48, unit: Unit.pixels },
        desktop: { measure: 52, unit: Unit.pixels },
      });

      const tokenById = new Map<string, Token>();
      tokenById.set('font-size-id', {
        id: 'font-size-id',
        name: 'font-size',
        tokenType: 'dimension' as Token['tokenType'],
        origin: { name: 'font-size' },
      } as unknown as Token);
      tokenById.set('line-height-id', {
        id: 'line-height-id',
        name: 'line-height',
        tokenType: 'dimension' as Token['tokenType'],
        origin: { name: 'line-height' },
      } as unknown as Token);

      handleTypographyTokens(
        ['Heading', 'XLarge', 'Bold'],
        token,
        tokenGroups,
        true,
        stylesObject,
        false,
        deviceDimensions,
        undefined,
        tokenById,
      );

      expect(stylesObject).toStrictEqual({
        '$heading-xlarge-bold': {
          mobile:
            '(\nfont-family: "\'Inter\', sans-serif",\nfont-size: 32px,\nfont-style: normal,\nfont-weight: 700,\nline-height: 1.5,\n)',
          desktop:
            '(\nfont-family: "\'Inter\', sans-serif",\nfont-size: 40px,\nfont-style: normal,\nfont-weight: 700,\nline-height: 1.3,\n)',
        },
      });
    });

    it('should override only the dimension a device collection provides', () => {
      const token = exampleTypographyTokens.get('typographyRef1') as TypographyToken;
      const stylesObject: StylesObjectType = {};
      const deviceDimensions: DeviceDimensionMap = new Map([
        ['font-size-id', { mobile: { measure: 36, unit: Unit.pixels }, desktop: { measure: 40, unit: Unit.pixels } }],
      ]);

      handleTypographyTokens(
        ['Heading', 'XLarge', 'Bold'],
        token,
        tokenGroups,
        true,
        stylesObject,
        false,
        deviceDimensions,
      );

      expect(stylesObject).toStrictEqual({
        '$heading-xlarge-bold': {
          mobile:
            '(\nfont-family: "\'Inter\', sans-serif",\nfont-size: 36px,\nfont-style: normal,\nfont-weight: 700,\nline-height: 1.4444,\n)',
          desktop:
            '(\nfont-family: "\'Inter\', sans-serif",\nfont-size: 40px,\nfont-style: normal,\nfont-weight: 700,\nline-height: 1.3,\n)',
        },
      });
    });

    it('should keep a single-sized style on one breakpoint', () => {
      const token = {
        ...exampleTypographyTokens.get('typographyRef1'),
        value: {
          ...(exampleTypographyTokens.get('typographyRef1') as TypographyToken).value,
          fontSize: { unit: Unit.pixels, measure: 14, referencedTokenId: null },
          lineHeight: { unit: Unit.pixels, measure: 20, referencedTokenId: null },
        },
      } as TypographyToken;
      const stylesObject: StylesObjectType = {};

      handleTypographyTokens(['Caption'], token, tokenGroups, true, stylesObject, true, new Map());

      expect(stylesObject).toStrictEqual({
        caption: {
          mobile:
            "{\nfontFamily: \"'Inter', sans-serif\",\nfontSize: '14px',\nfontStyle: 'normal',\nfontWeight: 700,\nlineHeight: 1.4286,\n}",
        },
      });
    });

    it('should skip a token the model does not map to a typography', () => {
      const stylesObject: StylesObjectType = {};

      handleTypographyTokens(
        ['Grid', 'spacing'],
        { id: 'x', name: 'x', tokenType: 'string', value: { text: 'x' } } as unknown as Token,
        tokenGroups,
        true,
        stylesObject,
        false,
      );

      expect(stylesObject).toStrictEqual({});
    });

    it('should handle typography token with fontSizeBaseMap', () => {
      const token = exampleTypographyTokens.get('typographyRef1') as TypographyToken;
      const stylesObject: StylesObjectType = {};
      const fontSizeBaseMap = new Map([
        ['mobile', 14],
        ['tablet', 16],
        ['desktop', 18],
      ]);

      handleTypographyTokens(
        ['Heading', 'XLarge', 'Bold'],
        token,
        tokenGroups,
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
      const token = exampleTypographyTokens.get('typographyRef1') as TypographyToken;
      const stylesObject: StylesObjectType = {};

      handleTypographyTokens(['Heading', 'XLarge', 'Bold'], token, tokenGroups, true, stylesObject, true);

      expect(stylesObject).toHaveProperty('headingXlargeBold');
      expect(stylesObject).not.toHaveProperty('$heading-xlarge-bold');
    });

    it('should handle typography token with italic in name', () => {
      const token = exampleTypographyTokens.get('typographyRef1') as TypographyToken;
      const stylesObject: StylesObjectType = {};

      handleTypographyTokens(['Heading', 'XLarge', 'Bold-Italic'], token, tokenGroups, true, stylesObject, false);

      expect(stylesObject).toHaveProperty('$heading-xlarge-bold-italic');

      const typographyObj = stylesObject['$heading-xlarge-bold-italic'] as { [key: string]: unknown };
      const mobileValue = typographyObj.mobile as string;

      expect(mobileValue).toContain('italic');
    });

    it('should handle typography token with nested structure', () => {
      const token = exampleTypographyTokens.get('typographyRef1') as TypographyToken;
      const stylesObject: StylesObjectType = {};

      handleTypographyTokens(
        ['Typography', 'Heading', 'XLarge', 'Bold'],
        token,
        tokenGroups,
        true,
        stylesObject,
        false,
      );

      expect(Object.keys(stylesObject).length).toBeGreaterThan(0);

      const firstKey = Object.keys(stylesObject)[0];

      expect(typeof stylesObject[firstKey]).toBe('object');
    });
  });
});
