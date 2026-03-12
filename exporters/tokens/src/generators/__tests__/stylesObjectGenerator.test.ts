import { Token, TokenGroup, TypographyToken, TypographyTokenValue } from '@supernovaio/sdk-exporters';
import { exampleColorsTokens } from '../../../tests/fixtures/exampleColorTokens';
import {
  exampleDeviceUpdatedTokens,
  exampleDeviceTokenBreakpoint,
  exampleDeviceTokenMultiWord,
  exampleDeviceTokenBreakpointCustom,
} from '../../../tests/fixtures/exampleDeviceTokens';
import { exampleDimensionAndStringTokens } from '../../../tests/fixtures/exampleDimensionAndStringTokens';
import { exampleGroups } from '../../../tests/fixtures/exampleGroups';
import { exampleTypographyTokens } from '../../../tests/fixtures/exampleTypographyTokens';
import { sampleConfigurationDefault } from '../../../tests/fixtures/sampleConfiguration';
import { filterExcludedTokens } from '../../filters/excludedTokens';
import {
  createStylesObjectStructureFromTokenNameParts,
  generateStylesObjectFromTokens,
  StylesObjectType,
} from '../stylesObjectGenerator';
import {
  cloneTypographyValue,
  colorGroupsReducer,
  createGlobalColorsObject,
  createGlobalTypographyObject,
  handleTypographyTokens,
  parseGroupName,
  typographyGroupReducer,
} from '../../objectProcessors';

const tokenGroups: Array<TokenGroup> = exampleGroups;
jest.mock('../../../config', () => ({
  exportConfiguration: sampleConfigurationDefault,
}));

describe('stylesObjectGenerator', () => {
  describe('generateStylesObjectFromTokens', () => {
    const dataProvider = [
      {
        tokens: exampleDimensionAndStringTokens,
        expectedStyles: { $grids: { columns: '$grid-columns', spacing: { desktop: '$grid-spacing-desktop' } } },
        description: 'should generate object from tokens',
        hasJsOutput: false,
      },
      {
        tokens: exampleColorsTokens,
        expectedStyles: {
          '$action-colors': { button: { primary: { active: '$action-button-primary-active' } } },
          '$background-colors': { primary: '$background-primary' },
          $colors: { action: '$action-colors', background: '$background-colors' },
        },
        description: 'should generate object from tokens with colors',
        hasJsOutput: false,
      },
      {
        tokens: exampleDimensionAndStringTokens,
        expectedStyles: { grids: { columns: 'gridColumns', spacing: { desktop: 'gridSpacingDesktop' } } },
        description: 'should generate object from tokens with js output',
        hasJsOutput: true,
      },
      {
        tokens: exampleColorsTokens,
        expectedStyles: {
          actionColors: {
            button: {
              primary: {
                active: 'actionButtonPrimaryActive',
              },
            },
          },
          backgroundColors: {
            primary: 'backgroundPrimary',
          },
          colors: {
            action: 'actionColors',
            background: 'backgroundColors',
          },
        },
        description: 'should generate object from tokens with colors with js output',
        hasJsOutput: true,
      },
      {
        tokens: exampleTypographyTokens,
        expectedStyles: {
          '$heading-xlarge-bold': {
            mobile:
              '(\nfont-family: "\'Inter\', sans-serif",\nfont-size: 40px,\nfont-style: normal,\nfont-weight: 700,\nline-height: 1.30,\n)',
          },
          $styles: {
            'heading-xlarge-bold': '$heading-xlarge-bold',
            moveToTheEnd: 'true',
          },
        },
        description: 'should generate object from typography tokens',
        hasJsOutput: false,
      },
      {
        tokens: exampleTypographyTokens,
        expectedStyles: {
          styles: {
            headingXlargeBold: 'headingXlargeBold',
            moveToTheEnd: 'true',
          },
          headingXlargeBold: {
            mobile:
              "{\nfontFamily: \"'Inter', sans-serif\",\nfontSize: '40px',\nfontStyle: 'normal',\nfontWeight: 700,\nlineHeight: 1.30,\n}",
          },
        },
        description: 'should generate object from typography tokens with js output',
        hasJsOutput: true,
      },
      {
        tokens: exampleDeviceUpdatedTokens,
        expectedStyles: { $grids: { spacing: { mobile: '$grid-spacing-mobile' } } },
        description: 'should generate device object from tokens',
        hasJsOutput: false,
      },
      {
        tokens: exampleDeviceUpdatedTokens,
        expectedStyles: { grids: { spacing: { mobile: 'gridSpacingMobile' } } },
        description: 'should generate device object from tokens with js output',
        hasJsOutput: true,
      },
      {
        tokens: exampleDeviceTokenBreakpoint,
        expectedStyles: { $breakpoints: { mobile: '$breakpoint-mobile' } },
        description: 'should generate device breakpoint object from tokens',
        hasJsOutput: false,
      },
      {
        tokens: exampleDeviceTokenBreakpoint,
        expectedStyles: { breakpoints: { mobile: 'breakpointMobile' } },
        description: 'should generate device breakpoint object from tokens with js output',
        hasJsOutput: true,
      },
      {
        tokens: exampleDeviceTokenMultiWord,
        expectedStyles: { '$breakpoint-tests': { mobile: '$breakpoint-test-mobile' } },
        description: 'should generate device root multi-word object from tokens',
        hasJsOutput: false,
      },
      {
        tokens: exampleDeviceTokenMultiWord,
        expectedStyles: { breakpointTests: { mobile: 'breakpointTestMobile' } },
        description: 'should generate device root multi-word object from tokens with js object',
        hasJsOutput: true,
      },
      {
        tokens: exampleDeviceTokenBreakpointCustom,
        expectedStyles: { $breakpoints: { 'mobile-custom': '$breakpoint-mobile-custom' } },
        description: 'should generate custom device object from tokens',
        hasJsOutput: false,
      },
      {
        tokens: exampleDeviceTokenBreakpointCustom,
        expectedStyles: { breakpoints: { mobileCustom: 'breakpointMobileCustom' } },
        description: 'should generate custom device object from tokens with js output',
        hasJsOutput: true,
      },
    ];

    it.each(dataProvider)('$description', ({ tokens, expectedStyles, hasJsOutput }) => {
      const filteredTokens = filterExcludedTokens(Array.from(tokens.values()));
      const styles = generateStylesObjectFromTokens(
        filteredTokens,
        tokenGroups,
        true,
        hasJsOutput,
        false,
        undefined,
        undefined,
        undefined,
      );

      expect(styles).toStrictEqual(expectedStyles);
    });
  });

  describe('createStylesObjectStructureFromTokenNameParts', () => {
    const dataProvider = [
      {
        token: exampleDimensionAndStringTokens.get('dimensionRef') as Token,
        expectedObject: { $grids: { columns: '$grid-columns', spacing: { desktop: '$grid-spacing-desktop' } } },
        description: 'should create object structure from dimension token name parts',
        stylesObjectRef: { $grids: { columns: '$grid-columns' } } as StylesObjectType,
        hasJsOutput: false,
      },
      {
        token: exampleDimensionAndStringTokens.get('dimensionRef') as Token,
        expectedObject: { grids: { columns: 'gridColumns', spacing: { desktop: 'gridSpacingDesktop' } } },
        description: 'should create object structure from dimension token name parts with js output',
        stylesObjectRef: { grids: { columns: 'gridColumns' } } as StylesObjectType,
        hasJsOutput: true,
      },
      {
        token: exampleColorsTokens.get('backgroundColorRef') as Token,
        expectedObject: {
          actionColors: { button: { primary: { active: 'actionButtonPrimaryActive' } } },
          backgroundColors: {
            primary: 'backgroundPrimary',
          },
        },
        description: 'should create object structure from color token with js output',
        stylesObjectRef: {
          actionColors: { button: { primary: { active: 'actionButtonPrimaryActive' } } },
        } as StylesObjectType,
        hasJsOutput: true,
      },
      {
        token: exampleTypographyTokens.get('typographyRef1') as Token,
        expectedObject: {
          '$heading-xlarge-bold': {
            mobile:
              '(\nfont-family: "\'Inter\', sans-serif",\nfont-size: 40px,\nfont-style: normal,\nfont-weight: 700,\nline-height: 1.30,\n)',
          },
        },
        description: 'should create object structure from typography token',
        stylesObjectRef: {
          '$heading-xlarge-bold': {
            mobile:
              '(\nfont-family: "\'Inter\', sans-serif",\nfont-size: 2rem,\nfont-style: normal,\nfont-weight: 500,\nline-height: 1.00,\n)',
          },
        } as StylesObjectType,
        hasJsOutput: false,
      },
      {
        token: exampleTypographyTokens.get('typographyRef1') as Token,
        expectedObject: {
          headingXlargeBold: {
            mobile:
              "{\nfontFamily: \"'Inter', sans-serif\",\nfontSize: '40px',\nfontStyle: 'normal',\nfontWeight: 700,\nlineHeight: 1.30,\n}",
          },
        },
        description: 'should create object structure from typography token with js output',
        stylesObjectRef: {
          headingXlargeBold: {
            mobile:
              "{\nfontFamily: \"'Inter', sans-serif\",\nfontSize: '2rem',\nfontStyle: 'normal',\nfontWeight: 500,\nlineHeight: 1.00,\n}",
          },
        } as StylesObjectType,
        hasJsOutput: true,
      },
    ];

    it.each(dataProvider)('$description', ({ token, expectedObject, stylesObjectRef, hasJsOutput }) => {
      const cssObject = createStylesObjectStructureFromTokenNameParts(
        token,
        tokenGroups,
        true,
        stylesObjectRef,
        hasJsOutput,
        undefined,
        undefined,
        undefined,
      );

      expect(cssObject).toStrictEqual(expectedObject);
    });
  });

  describe('handleTypographyTokens', () => {
    const dataProvider = [
      {
        tokens: exampleTypographyTokens.get('typographyRef1') as TypographyToken,
        tokenNameParts: ['Heading', 'XLarge', 'Bold'],
        expectedStyles: {
          '$heading-xlarge-bold': {
            mobile:
              '(\nfont-family: "\'Inter\', sans-serif",\nfont-size: 40px,\nfont-style: normal,\nfont-weight: 700,\nline-height: 1.30,\n)',
          },
          exampleRef: 'exampleRef',
        },
        description: 'should generate object from typography tokens',
        hasJsOutput: false,
      },
      {
        tokens: exampleTypographyTokens.get('typographyRef1') as TypographyToken,
        tokenNameParts: ['Heading', 'XLarge', 'Bold'],
        expectedStyles: {
          exampleRef: 'exampleRef',
          headingXlargeBold: {
            mobile:
              "{\nfontFamily: \"'Inter', sans-serif\",\nfontSize: '40px',\nfontStyle: 'normal',\nfontWeight: 700,\nlineHeight: 1.30,\n}",
          },
        },
        description: 'should generate object from typography tokens with js output',
        hasJsOutput: true,
      },
      {
        tokens: exampleTypographyTokens.get('typographyRef1') as TypographyToken,
        tokenNameParts: ['Heading', 'XLarge', 'Bold'],
        expectedStyles: {
          exampleRef: 'exampleRef',
          headingXlargeBold: {
            mobile:
              "{\nfontFamily: \"'Inter', sans-serif\",\nfontSize: '2.86rem',\nfontStyle: 'normal',\nfontWeight: 700,\nlineHeight: 1.30,\n}",
            tablet:
              "{\nfontFamily: \"'Inter', sans-serif\",\nfontSize: '2.5rem',\nfontStyle: 'normal',\nfontWeight: 700,\nlineHeight: 1.30,\n}",
            desktop:
              "{\nfontFamily: \"'Inter', sans-serif\",\nfontSize: '2.22rem',\nfontStyle: 'normal',\nfontWeight: 700,\nlineHeight: 1.30,\n}",
          },
        },
        description: 'should generate per-breakpoint rem values when font-size-base differs',
        hasJsOutput: true,
        fontSizeBaseMap: new Map([
          ['mobile', 14],
          ['tablet', 16],
          ['desktop', 18],
        ]),
      },
    ];

    it.each(dataProvider)(
      '$description',
      ({ tokens, tokenNameParts, expectedStyles, hasJsOutput, fontSizeBaseMap }) => {
        const stylesObjectRef = { exampleRef: 'exampleRef' };
        handleTypographyTokens(
          tokenNameParts,
          tokens,
          tokenGroups,
          true,
          stylesObjectRef,
          hasJsOutput,
          undefined,
          fontSizeBaseMap,
        );
        expect(stylesObjectRef).toStrictEqual(expectedStyles);
      },
    );
  });

  describe('createGlobalColorsObject', () => {
    it('should create global colors object', () => {
      const colorKeys = ['$action-colors', '$background-colors'];
      const colorsObject = createGlobalColorsObject(colorKeys, false);

      expect(colorsObject).toStrictEqual({ action: '$action-colors', background: '$background-colors' });
    });

    it('should create global colors object with js output', () => {
      const colorKeys = ['actionColors', 'backgroundColors'];
      const colorsObject = createGlobalColorsObject(colorKeys, true);

      expect(colorsObject).toStrictEqual({ action: 'actionColors', background: 'backgroundColors' });
    });
  });

  describe('createGlobalTypographyObject', () => {
    it('should create global typography object', () => {
      const typographyKeys = ['$heading-xlarge-bold', '$body-large-regular'];
      const typographyObject = createGlobalTypographyObject(typographyKeys);

      expect(typographyObject).toStrictEqual({
        'body-large-regular': '$body-large-regular',
        'heading-xlarge-bold': '$heading-xlarge-bold',
      });
    });
  });

  describe('parseGroupName', () => {
    it('should parse group name', () => {
      expect(parseGroupName('$background-colors', false)).toBe('background');
    });

    it('should parse group name with js output', () => {
      expect(parseGroupName('backgroundColors', true)).toBe('background');
    });
  });

  describe('colorGroupsReducer', () => {
    it('should reduce color groups', () => {
      const accumulatedColorKeys = { action: '$action-colors' };
      const currentColorKey = '$background-colors';
      const result = colorGroupsReducer(accumulatedColorKeys, currentColorKey);

      expect(result).toStrictEqual({ action: '$action-colors', background: '$background-colors' });
    });
  });

  describe('typographyGroupReducer', () => {
    it('should reduce typography groups', () => {
      const accumulatedTypographyKeys = { 'heading-xlarge-bold': '$heading-xlarge-bold' };
      const currentTypographyKey = '$body-large-regular';
      const result = typographyGroupReducer(accumulatedTypographyKeys, currentTypographyKey);

      expect(result).toStrictEqual({
        'body-large-regular': '$body-large-regular',
        'heading-xlarge-bold': '$heading-xlarge-bold',
      });
    });
  });
});

describe('cloneTypographyValue', () => {
  it('should deeply clone typography value', () => {
    const originalValue = {
      fontFamily: { text: 'Inter' },
      fontWeight: { text: 'Bold' },
      fontSize: { unit: 'Pixels', measure: 16 },
      letterSpacing: { unit: 'Pixels', measure: 0 },
      paragraphIndent: { unit: 'Pixels', measure: 0 },
      paragraphSpacing: { unit: 'Pixels', measure: 0 },
      referencedTokenId: null,
    } as TypographyTokenValue;

    const clonedValue = cloneTypographyValue(originalValue);

    expect(clonedValue).toStrictEqual(originalValue);
    expect(clonedValue.fontFamily).not.toBe(originalValue.fontFamily);
    expect(clonedValue.fontSize).not.toBe(originalValue.fontSize);
  });
});
