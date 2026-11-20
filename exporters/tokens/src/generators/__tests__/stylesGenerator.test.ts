import { createTokenIndex } from '../../core/tokenIndex';
import { createDesignToken } from '../../../tests/helpers/createDesignToken';
import { type DesignToken, TokenTypeEnum, FontSizeBaseMap } from '../../core/types';
import { exampleColorsTokens } from '../../../tests/fixtures/internal-model/exampleColorTokens';
import { exampleDimensionAndStringTokens } from '../../../tests/fixtures/internal-model/exampleDimensionAndStringTokens';
import { exampleGradientTokens } from '../../../tests/fixtures/internal-model/exampleGradientTokens';
import { examplePrefixToken } from '../../../tests/fixtures/internal-model/examplePrefixToken';
import { exampleShadowTokens } from '../../../tests/fixtures/internal-model/exampleShadowTokens';
import { findTokenPrefix } from '../../helpers/findTokenPrefix';
import { filterExcludedTokens } from '../../filters/excludedTokens';
import {
  generateCssVariableReferencesFromTokens,
  generateStylesFromTokens,
  tokenToStyleByType,
} from '../stylesGenerator';

const tokenIndex = createTokenIndex([]);
const fontSizeBaseMap: FontSizeBaseMap = new Map([
  ['mobile', 14],
  ['tablet', 16],
  ['desktop', 18],
]);

describe('stylesGenerator', () => {
  describe('tokenToStyleByType', () => {
    const dataProvider = [
      {
        token: exampleDimensionAndStringTokens.get('dimensionRef') as DesignToken,
        description: 'dimension type token with parent prefix',
        hasParentPrefix: true,
        hasJsOutput: false,
        hasTokenPrefix: true,
        expectedStyles: '$grid-spacing-desktop: 1.7778rem !default;',
      },
      {
        token: exampleDimensionAndStringTokens.get('dimensionRef') as DesignToken,
        description: 'dimension type token without parent prefix',
        hasParentPrefix: false,
        hasJsOutput: false,
        hasTokenPrefix: true,
        expectedStyles: '$desktop: 1.7778rem !default;',
      },
      {
        token: exampleDimensionAndStringTokens.get('stringRef') as DesignToken,
        description: 'string type token with parent prefix',
        hasParentPrefix: true,
        hasJsOutput: false,
        hasTokenPrefix: true,
        expectedStyles: '$grid-columns: 12 !default;',
      },
      {
        token: exampleDimensionAndStringTokens.get('stringRef') as DesignToken,
        description: 'string type token without parent prefix',
        hasParentPrefix: false,
        hasJsOutput: false,
        hasTokenPrefix: false,
        expectedStyles: '$columns: 12 !default;',
      },
      {
        token: {
          ...(exampleDimensionAndStringTokens.get('dimensionRef') as DesignToken),
          type: TokenTypeEnum.Typography,
        },
        description: 'unsupported token type',
        hasParentPrefix: true,
        hasJsOutput: false,
        hasTokenPrefix: false,
        expectedStyles: null,
      },
      {
        token: exampleDimensionAndStringTokens.get('dimensionRef') as DesignToken,
        description: 'dimension type token with parent prefix and js output',
        hasParentPrefix: true,
        hasJsOutput: true,
        hasTokenPrefix: false,
        expectedStyles: "export const gridSpacingDesktop = '1.7778rem';",
      },
      {
        token: exampleDimensionAndStringTokens.get('dimensionRef') as DesignToken,
        description: 'dimension type token without parent prefix and js output',
        hasParentPrefix: false,
        hasJsOutput: true,
        hasTokenPrefix: false,
        expectedStyles: "export const desktop = '1.7778rem';",
      },
      {
        token: exampleDimensionAndStringTokens.get('stringRef') as DesignToken,
        description: 'string type token with parent prefix and js output',
        hasParentPrefix: true,
        hasJsOutput: true,
        hasTokenPrefix: false,
        expectedStyles: "export const gridColumns = '12';",
      },
      {
        token: exampleDimensionAndStringTokens.get('stringRef') as DesignToken,
        description: 'string type token without parent prefix and js output',
        hasParentPrefix: false,
        hasJsOutput: true,
        hasTokenPrefix: false,
        expectedStyles: "export const columns = '12';",
      },
      {
        token: exampleShadowTokens.get('shadowRef') as DesignToken,
        description: 'shadow type token without parent prefix',
        hasParentPrefix: false,
        hasJsOutput: false,
        hasTokenPrefix: true,
        expectedStyles:
          '$shadow-100: var(--spirit-shadow-100-offset-x-01, 0) var(--spirit-shadow-100-offset-y-01, 0.1429rem) ' +
          'var(--spirit-shadow-100-blur-radius-01, 0.5714rem) var(--spirit-shadow-100-spread-radius-01, 0) ' +
          'var(--spirit-color-shadows-shadow-100-color-01, #00000026) !default;',
      },
      {
        token: exampleShadowTokens.get('shadowRef') as DesignToken,
        description: 'shadow type token without parent prefix',
        hasParentPrefix: false,
        hasJsOutput: false,
        hasTokenPrefix: false,
        expectedStyles:
          '$shadow-100: var(--shadow-100-offset-x-01, 0) var(--shadow-100-offset-y-01, 0.1429rem) ' +
          'var(--shadow-100-blur-radius-01, 0.5714rem) var(--shadow-100-spread-radius-01, 0) ' +
          'var(--color-shadows-shadow-100-color-01, #00000026) !default;',
      },
      {
        token: exampleGradientTokens.get('gradientRef') as DesignToken,
        description: 'gradient type token without parent prefix',
        hasParentPrefix: false,
        hasJsOutput: false,
        hasTokenPrefix: true,
        expectedStyles:
          '$basic-overlay: linear-gradient(var(--gradient-angle, 90deg), var(--spirit-color-gradient-basic-overlay-color-01, #fff) 0%, var(--spirit-color-gradient-basic-overlay-color-02, #fff0) 100%) !default;',
      },
      {
        token: exampleGradientTokens.get('gradientRef') as DesignToken,
        description: 'gradient type token without parent prefix',
        hasParentPrefix: false,
        hasJsOutput: false,
        hasTokenPrefix: false,
        expectedStyles:
          '$basic-overlay: linear-gradient(var(--gradient-angle, 90deg), var(--color-gradient-basic-overlay-color-01, #fff) 0%, var(--color-gradient-basic-overlay-color-02, #fff0) 100%) !default;',
      },
    ];

    it.each(dataProvider)(
      'should correctly generate styles for $description',
      ({ token, expectedStyles, hasParentPrefix, hasTokenPrefix, hasJsOutput }) => {
        const prefixTokens = Array.from(examplePrefixToken.values());
        const tokenPrefix = hasTokenPrefix ? findTokenPrefix(prefixTokens) : '';
        const styles = tokenToStyleByType(
          token,
          tokenIndex,
          tokenPrefix,
          hasParentPrefix,
          hasJsOutput,
          fontSizeBaseMap,
        );

        expect(styles).toBe(expectedStyles);
      },
    );
  });

  describe('tokenToStyleByType with scalar aliases', () => {
    const alias = createDesignToken(
      TokenTypeEnum.Dimension,
      { type: 'reference', tokenId: 'base' },
      { id: 'alias', name: 'alias-space', metadata: { groupPath: ['Spacing'], namePath: ['Spacing'] } },
    );
    const aliasWithResolved = {
      ...alias,
      value: { type: 'reference', tokenId: 'missing', resolved: { type: 'number', value: 8, unit: 'px' } },
    } as DesignToken;

    it('should keep the value the adapter already resolved', () => {
      const styles = tokenToStyleByType(aliasWithResolved, createTokenIndex([]), '', false, false, fontSizeBaseMap);

      expect(styles).toContain('0.5714rem');
    });
  });

  describe('generateStylesFromTokens', () => {
    const dataProvider = [
      {
        tokens: exampleDimensionAndStringTokens,
        hasJsOutput: false,
        hasParentPrefix: true,
        hasTokenPrefix: false,
        description: 'should generate styles from tokens',
        expectedStyles: '$grid-columns: 12 !default;\n\n$grid-spacing-desktop: 1.7778rem !default;',
      },
      {
        tokens: exampleDimensionAndStringTokens,
        hasJsOutput: true,
        hasParentPrefix: true,
        hasTokenPrefix: false,
        description: 'should generate styles from tokens with js output',
        expectedStyles: "export const gridColumns = '12';\n\nexport const gridSpacingDesktop = '1.7778rem';",
      },
      {
        tokens: exampleColorsTokens,
        hasJsOutput: false,
        hasParentPrefix: false,
        hasTokenPrefix: false,
        description: 'should generate styles from tokens with colors',
        expectedStyles: '$active: #ca2026 !default;\n\n$primary: #fff !default;',
      },
      {
        tokens: exampleColorsTokens,
        hasJsOutput: true,
        hasParentPrefix: false,
        hasTokenPrefix: false,
        description: 'should generate styles from tokens with colors with js output',
        expectedStyles: "export const active = '#ca2026';\n\nexport const primary = '#fff';",
      },
      {
        tokens: exampleShadowTokens,
        hasJsOutput: false,
        hasParentPrefix: false,
        hasTokenPrefix: true,
        description: 'should generate styles from tokens with shadows',
        expectedStyles:
          '$shadow-100: var(--spirit-shadow-100-offset-x-01, 0) var(--spirit-shadow-100-offset-y-01, 0.1429rem) ' +
          'var(--spirit-shadow-100-blur-radius-01, 0.5714rem) var(--spirit-shadow-100-spread-radius-01, 0) ' +
          'var(--spirit-color-shadows-shadow-100-color-01, #00000026) !default;',
      },
      {
        tokens: exampleShadowTokens,
        hasJsOutput: false,
        hasParentPrefix: false,
        hasTokenPrefix: false,
        description: 'should generate styles from tokens with shadows',
        expectedStyles:
          '$shadow-100: var(--shadow-100-offset-x-01, 0) var(--shadow-100-offset-y-01, 0.1429rem) ' +
          'var(--shadow-100-blur-radius-01, 0.5714rem) var(--shadow-100-spread-radius-01, 0) ' +
          'var(--color-shadows-shadow-100-color-01, #00000026) !default;',
      },
      {
        tokens: exampleGradientTokens,
        hasJsOutput: false,
        hasParentPrefix: false,
        hasTokenPrefix: true,
        description: 'should generate styles from tokens with gradients',
        expectedStyles:
          '$basic-overlay: linear-gradient(var(--gradient-angle, 90deg), var(--spirit-color-gradient-basic-overlay-color-01, #fff) 0%, var(--spirit-color-gradient-basic-overlay-color-02, #fff0) 100%) !default;',
      },
      {
        tokens: exampleGradientTokens,
        hasJsOutput: false,
        hasParentPrefix: false,
        hasTokenPrefix: false,
        description: 'should generate styles from tokens with gradients',
        expectedStyles:
          '$basic-overlay: linear-gradient(var(--gradient-angle, 90deg), var(--color-gradient-basic-overlay-color-01, #fff) 0%, var(--color-gradient-basic-overlay-color-02, #fff0) 100%) !default;',
      },
    ];

    it.each(dataProvider)(
      '$description',
      ({ tokens, hasJsOutput, hasParentPrefix, hasTokenPrefix, expectedStyles }) => {
        const prefixTokens = Array.from(examplePrefixToken.values());
        const tokenPrefix = hasTokenPrefix ? findTokenPrefix(prefixTokens) : '';
        const filteredTokens = filterExcludedTokens(Array.from(tokens.values()));
        const styles = generateStylesFromTokens(
          filteredTokens,
          tokenIndex,
          tokenPrefix,
          hasParentPrefix,
          false,
          hasJsOutput,
          fontSizeBaseMap,
        );

        expect(styles).toBe(expectedStyles);
      },
    );
  });

  describe('generateCssVariableReferencesFromTokens', () => {
    const dataProvider = [
      {
        hasJsOutput: false,
        hasTokenPrefix: true,
        description: 'should generate references to css variables',
        expectedStyles: '$active: var(--spirit-color-active);\n\n$primary: var(--spirit-color-primary);',
      },
      {
        hasJsOutput: true,
        hasTokenPrefix: false,
        description: 'should generate references to css variables with js output',
        expectedStyles:
          "export const active = 'var(--color-active)';\n\nexport const primary = 'var(--color-primary)';",
      },
    ];

    it.each(dataProvider)('$description', ({ hasJsOutput, hasTokenPrefix, expectedStyles }) => {
      const prefixTokens = Array.from(examplePrefixToken.values());
      const tokenPrefix = hasTokenPrefix ? findTokenPrefix(prefixTokens) : '';
      const filteredTokens = filterExcludedTokens(Array.from(exampleColorsTokens.values()));
      const styles = generateCssVariableReferencesFromTokens(
        filteredTokens,
        tokenPrefix,
        'color-',
        false,
        false,
        hasJsOutput,
      );

      expect(styles).toBe(expectedStyles);
    });
  });
});
