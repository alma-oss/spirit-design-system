import { renderTypographyLeaves } from '../../../tests/fixtures/renderTypographyLeaves';
import { exampleColorsTokens } from '../../../tests/fixtures/internal-model/exampleColorTokens';
import {
  exampleDeviceUpdatedTokens,
  exampleDeviceTokenBreakpoint,
  exampleDeviceTokenMultiWord,
  exampleDeviceTokenBreakpointCustom,
} from '../../../tests/fixtures/internal-model/exampleDeviceTokens';
import { exampleDimensionAndStringTokens } from '../../../tests/fixtures/internal-model/exampleDimensionAndStringTokens';
import { exampleTypographyTokens } from '../../../tests/fixtures/internal-model/exampleTypographyTokens';
import { createDesignToken } from '../../../tests/helpers/createDesignToken';
import { filterExcludedTokens } from '../../filters/excludedTokens';
import {
  createStylesObjectStructureFromTokenNameParts,
  generateStylesObjectFromTokens,
} from '../stylesObjectGenerator';

import {
  colorGroupsReducer,
  createGlobalColorsObject,
  createGlobalTypographyObject,
  handleTypographyTokens,
  parseGroupName,
  typographyGroupReducer,
} from '../../objectProcessors';
import { type DesignToken, TokenTypeEnum, type StylesObjectType } from '../../core/types';

const flatCaptionTypographyToken = createDesignToken(
  TokenTypeEnum.Typography,
  {
    type: 'composite',
    value: {
      fontFamily: { type: 'string', value: 'Inter' },
      fontWeight: { type: 'string', value: 'Regular' },
      fontSize: { type: 'number', value: 14, unit: 'px' },
      lineHeight: { type: 'number', value: 20, unit: 'px' },
    },
  },
  {
    id: 'typographyFlatCaption',
    name: 'Caption',
    metadata: { groupPath: ['Typography'], groupId: '3', originName: 'Caption' },
  },
);

const flatEyebrowTypographyToken = createDesignToken(
  TokenTypeEnum.Typography,
  {
    type: 'composite',
    value: {
      fontFamily: { type: 'string', value: 'Inter' },
      fontWeight: { type: 'string', value: 'Bold' },
      fontSize: { type: 'number', value: 12, unit: 'px' },
      lineHeight: { type: 'number', value: 16, unit: 'px' },
    },
  },
  {
    id: 'typographyFlatEyebrow',
    name: 'Eyebrow',
    metadata: { groupPath: ['Typography'], groupId: '3', originName: 'Eyebrow' },
  },
);

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
              '(\nfont-family: "\'Inter\', sans-serif",\nfont-size: 40px,\nfont-style: normal,\nfont-weight: 700,\nline-height: 1.3,\n)',
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
              "{\nfontFamily: \"'Inter', sans-serif\",\nfontSize: '40px',\nfontStyle: 'normal',\nfontWeight: 700,\nlineHeight: 1.3,\n}",
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
        true,
        hasJsOutput,
        false,
        undefined,
        undefined,
        undefined,
      );

      expect(renderTypographyLeaves(styles, hasJsOutput)).toStrictEqual(expectedStyles);
    });

    it('should generate flat typography tokens and include them in styles', () => {
      const styles = generateStylesObjectFromTokens(
        [flatCaptionTypographyToken],
        true,
        false,
        false,
        undefined,
        undefined,
        undefined,
      );

      expect(renderTypographyLeaves(styles, false)).toStrictEqual({
        $caption: {
          mobile:
            '(\nfont-family: "\'Inter\', sans-serif",\nfont-size: 14px,\nfont-style: normal,\nfont-weight: 400,\nline-height: 1.4286,\n)',
        },
        $styles: {
          caption: '$caption',
          moveToTheEnd: 'true',
        },
      });
    });

    it('should generate flat typography tokens and include them in styles (JS output)', () => {
      const styles = generateStylesObjectFromTokens(
        [flatCaptionTypographyToken],
        true,
        true,
        false,
        undefined,
        undefined,
        undefined,
      );

      expect(renderTypographyLeaves(styles, true)).toStrictEqual({
        caption: {
          mobile:
            "{\nfontFamily: \"'Inter', sans-serif\",\nfontSize: '14px',\nfontStyle: 'normal',\nfontWeight: 400,\nlineHeight: 1.4286,\n}",
        },
        styles: {
          caption: 'caption',
          moveToTheEnd: 'true',
        },
      });
    });

    it('should generate flat eyebrow typography token and include it in styles', () => {
      const styles = generateStylesObjectFromTokens(
        [flatEyebrowTypographyToken],
        true,
        false,
        false,
        undefined,
        undefined,
        undefined,
      );

      expect(renderTypographyLeaves(styles, false)).toStrictEqual({
        $eyebrow: {
          mobile:
            '(\nfont-family: "\'Inter\', sans-serif",\nfont-size: 12px,\nfont-style: normal,\nfont-weight: 700,\nline-height: 1.3333,\n)',
        },
        $styles: {
          eyebrow: '$eyebrow',
          moveToTheEnd: 'true',
        },
      });
    });
  });

  describe('createStylesObjectStructureFromTokenNameParts without an origin name', () => {
    it('should build the path from the group path and the token name', () => {
      const token = createDesignToken(
        TokenTypeEnum.Dimension,
        { type: 'number', value: 16, unit: 'px' },
        { name: 'small', metadata: { groupPath: ['Spacing'], namePath: ['Spacing'] } },
      );

      const styles = createStylesObjectStructureFromTokenNameParts(token, true, {}, false);

      expect(styles).toStrictEqual({ $spaces: { small: '$spacing-small' } });
    });

    it('should build the path from the name path, which leaves out a root group', () => {
      const token = createDesignToken(
        TokenTypeEnum.Dimension,
        { type: 'number', value: 16, unit: 'px' },
        { name: 'small', metadata: { groupPath: ['Spacing'], namePath: [], device: 'Mobile' } },
      );

      const styles = createStylesObjectStructureFromTokenNameParts(token, true, {}, false);

      expect(styles).toStrictEqual({ $smalls: { mobile: '$small-mobile' } });
    });

    it('should leave the object untouched for a token with a single name part and no device', () => {
      const token = createDesignToken(
        TokenTypeEnum.Dimension,
        { type: 'number', value: 16, unit: 'px' },
        { name: 'small', metadata: { originName: 'small', groupPath: [] } },
      );

      expect(createStylesObjectStructureFromTokenNameParts(token, true, {}, false)).toStrictEqual({});
    });
  });

  describe('createStylesObjectStructureFromTokenNameParts', () => {
    const dataProvider = [
      {
        token: exampleDimensionAndStringTokens.get('dimensionRef') as DesignToken,
        expectedObject: { $grids: { columns: '$grid-columns', spacing: { desktop: '$grid-spacing-desktop' } } },
        description: 'should create object structure from dimension token name parts',
        stylesObjectRef: { $grids: { columns: '$grid-columns' } } as StylesObjectType,
        hasJsOutput: false,
      },
      {
        token: exampleDimensionAndStringTokens.get('dimensionRef') as DesignToken,
        expectedObject: { grids: { columns: 'gridColumns', spacing: { desktop: 'gridSpacingDesktop' } } },
        description: 'should create object structure from dimension token name parts with js output',
        stylesObjectRef: { grids: { columns: 'gridColumns' } } as StylesObjectType,
        hasJsOutput: true,
      },
      {
        token: exampleColorsTokens.get('backgroundColorRef') as DesignToken,
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
        token: exampleTypographyTokens.get('typographyRef1') as DesignToken,
        expectedObject: {
          '$heading-xlarge-bold': {
            mobile:
              '(\nfont-family: "\'Inter\', sans-serif",\nfont-size: 40px,\nfont-style: normal,\nfont-weight: 700,\nline-height: 1.3,\n)',
          },
        },
        description: 'should create object structure from typography token',
        stylesObjectRef: {
          '$heading-xlarge-bold': {
            mobile:
              '(\nfont-family: "\'Inter\', sans-serif",\nfont-size: 2rem,\nfont-style: normal,\nfont-weight: 500,\nline-height: 1,\n)',
          },
        } as StylesObjectType,
        hasJsOutput: false,
      },
      {
        token: exampleTypographyTokens.get('typographyRef1') as DesignToken,
        expectedObject: {
          headingXlargeBold: {
            mobile:
              "{\nfontFamily: \"'Inter', sans-serif\",\nfontSize: '40px',\nfontStyle: 'normal',\nfontWeight: 700,\nlineHeight: 1.3,\n}",
          },
        },
        description: 'should create object structure from typography token with js output',
        stylesObjectRef: {
          headingXlargeBold: {
            mobile:
              "{\nfontFamily: \"'Inter', sans-serif\",\nfontSize: '2rem',\nfontStyle: 'normal',\nfontWeight: 500,\nlineHeight: 1,\n}",
          },
        } as StylesObjectType,
        hasJsOutput: true,
      },
    ];

    it.each(dataProvider)('$description', ({ token, expectedObject, stylesObjectRef, hasJsOutput }) => {
      const cssObject = createStylesObjectStructureFromTokenNameParts(
        token,
        true,
        stylesObjectRef,
        hasJsOutput,
        undefined,
        undefined,
        undefined,
      );

      expect(renderTypographyLeaves(cssObject, hasJsOutput)).toStrictEqual(expectedObject);
    });
  });

  describe('handleTypographyTokens', () => {
    const dataProvider = [
      {
        tokens: exampleTypographyTokens.get('typographyRef1') as DesignToken,
        tokenNameParts: ['Heading', 'XLarge', 'Bold'],
        expectedStyles: {
          '$heading-xlarge-bold': {
            mobile:
              '(\nfont-family: "\'Inter\', sans-serif",\nfont-size: 40px,\nfont-style: normal,\nfont-weight: 700,\nline-height: 1.3,\n)',
          },
          exampleRef: 'exampleRef',
        },
        description: 'should generate object from typography tokens',
        hasJsOutput: false,
      },
      {
        tokens: exampleTypographyTokens.get('typographyRef1') as DesignToken,
        tokenNameParts: ['Heading', 'XLarge', 'Bold'],
        expectedStyles: {
          exampleRef: 'exampleRef',
          headingXlargeBold: {
            mobile:
              "{\nfontFamily: \"'Inter', sans-serif\",\nfontSize: '40px',\nfontStyle: 'normal',\nfontWeight: 700,\nlineHeight: 1.3,\n}",
          },
        },
        description: 'should generate object from typography tokens with js output',
        hasJsOutput: true,
      },
      {
        tokens: exampleTypographyTokens.get('typographyRef1') as DesignToken,
        tokenNameParts: ['Heading', 'XLarge', 'Bold'],
        expectedStyles: {
          exampleRef: 'exampleRef',
          headingXlargeBold: {
            mobile:
              "{\nfontFamily: \"'Inter', sans-serif\",\nfontSize: '2.8571rem',\nfontStyle: 'normal',\nfontWeight: 700,\nlineHeight: 1.3,\n}",
            tablet:
              "{\nfontFamily: \"'Inter', sans-serif\",\nfontSize: '2.5rem',\nfontStyle: 'normal',\nfontWeight: 700,\nlineHeight: 1.3,\n}",
            desktop:
              "{\nfontFamily: \"'Inter', sans-serif\",\nfontSize: '2.2222rem',\nfontStyle: 'normal',\nfontWeight: 700,\nlineHeight: 1.3,\n}",
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
        handleTypographyTokens(tokenNameParts, tokens, true, stylesObjectRef, hasJsOutput, undefined, fontSizeBaseMap);

        expect(renderTypographyLeaves(stylesObjectRef, hasJsOutput)).toStrictEqual(expectedStyles);
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
