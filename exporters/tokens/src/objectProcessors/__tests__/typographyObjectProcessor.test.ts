import { Token, TokenGroup, TypographyToken, TypographyTokenValue, Unit } from '@supernovaio/sdk-exporters';
import { exampleGroups } from '../../../tests/fixtures/exampleGroups';
import { exampleTypographyTokens } from '../../../tests/fixtures/exampleTypographyTokens';
import { sampleConfigurationDefault } from '../../../tests/fixtures/sampleConfiguration';
import type { DeviceDimensionMap, StylesObjectType } from '../../generators/stylesObjectGenerator';
import { cloneTypographyValue, handleTypographyTokens } from '../typographyObjectProcessor';

const tokenGroups: Array<TokenGroup> = exampleGroups;
jest.mock('../../../config', () => ({
  exportConfiguration: sampleConfigurationDefault,
}));

describe('typographyObjectProcessor', () => {
  describe('cloneTypographyValue', () => {
    it('should deeply clone typography value', () => {
      const originalValue = {
        fontFamily: { text: 'Inter' },
        fontWeight: { text: 'Bold' },
        fontSize: { unit: 'Pixels' as Unit, measure: 16, referencedTokenId: null },
        letterSpacing: { unit: 'Pixels' as Unit, measure: 0, referencedTokenId: null },
        paragraphIndent: { unit: 'Pixels' as Unit, measure: 0, referencedTokenId: null },
        paragraphSpacing: { unit: 'Pixels' as Unit, measure: 0, referencedTokenId: null },
        referencedTokenId: null,
      } as TypographyTokenValue;

      const clonedValue = cloneTypographyValue(originalValue);

      expect(clonedValue).toStrictEqual(originalValue);
      expect(clonedValue.fontFamily).not.toBe(originalValue.fontFamily);
      expect(clonedValue.fontSize).not.toBe(originalValue.fontSize);
    });

    it('should clone typography value with all optional properties', () => {
      const originalValue = {
        fontFamily: { text: 'Inter' },
        fontWeight: { text: 'Bold' },
        fontSize: { unit: 'Pixels' as Unit, measure: 16, referencedTokenId: null },
        lineHeight: { unit: 'Pixels' as Unit, measure: 24, referencedTokenId: null },
        textDecoration: { value: 'None' },
        textCase: { value: 'Original' },
        letterSpacing: { unit: 'Pixels' as Unit, measure: 0, referencedTokenId: null },
        paragraphIndent: { unit: 'Pixels' as Unit, measure: 0, referencedTokenId: null },
        paragraphSpacing: { unit: 'Pixels' as Unit, measure: 0, referencedTokenId: null },
        referencedTokenId: null,
      } as TypographyTokenValue;

      const clonedValue = cloneTypographyValue(originalValue);

      expect(clonedValue).toStrictEqual(originalValue);
      expect(clonedValue.lineHeight).not.toBe(originalValue.lineHeight);
      expect(clonedValue.textDecoration).not.toBe(originalValue.textDecoration);
    });

    it('should clone typography value without optional properties', () => {
      const originalValue = {
        fontSize: { unit: 'Pixels' as Unit, measure: 16, referencedTokenId: null },
        referencedTokenId: null,
      } as TypographyTokenValue;

      const clonedValue = cloneTypographyValue(originalValue);

      expect(clonedValue.referencedTokenId).toBeNull();
      expect(clonedValue.fontSize).toEqual(originalValue.fontSize);
      expect(clonedValue.fontSize).not.toBe(originalValue.fontSize);
    });
  });

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
      deviceDimensions.set('font-size-id', {
        mobile: { measure: 32, unit: Unit.pixels },
        desktop: { measure: 40, unit: Unit.pixels },
      });
      deviceDimensions.set('line-height-id', {
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

      expect(stylesObject).toHaveProperty('$heading-xlarge-bold');

      const typographyObj = stylesObject['$heading-xlarge-bold'] as { [key: string]: unknown };

      expect(typographyObj).toHaveProperty('mobile');
      // Desktop might not be present if device dimensions don't include it
      expect(Object.keys(typographyObj).length).toBeGreaterThan(0);
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
