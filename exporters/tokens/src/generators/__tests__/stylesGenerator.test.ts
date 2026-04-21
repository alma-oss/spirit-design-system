import {
  DimensionToken,
  GradientToken,
  ShadowToken,
  StringToken,
  Token,
  TokenGroup,
  TokenType,
} from '@supernovaio/sdk-exporters';
import { exampleColorsTokens } from '../../../tests/fixtures/exampleColorTokens';
import { exampleDimensionAndStringTokens } from '../../../tests/fixtures/exampleDimensionAndStringTokens';
import { exampleGradientTokens } from '../../../tests/fixtures/exampleGradientTokens';
import { exampleGroups } from '../../../tests/fixtures/exampleGroups';
import { examplePrefixToken } from '../../../tests/fixtures/examplePrefixToken';
import { exampleShadowTokens } from '../../../tests/fixtures/exampleShadowTokens';
import { sampleConfigurationDefault } from '../../../tests/fixtures/sampleConfiguration';
import { findTokenPrefix } from '../../helpers/findTokenPrefix';
import { filterExcludedTokens } from '../../filters/excludedTokens';
import { generateStylesFromTokens, tokenToStyleByType } from '../stylesGenerator';
import { type FontSizeBaseMap } from '../../helpers/unitHelper';

const mappedTokens: Map<string, Token> = new Map([]);
const tokenGroups: Array<TokenGroup> = exampleGroups;
const fontSizeBaseMap: FontSizeBaseMap = new Map([
  ['mobile', 14],
  ['tablet', 16],
  ['desktop', 18],
]);
jest.mock('../../../config', () => ({
  exportConfiguration: sampleConfigurationDefault,
}));

describe('stylesGenerator', () => {
  describe('tokenToStyleByType', () => {
    const dataProvider = [
      {
        token: exampleDimensionAndStringTokens.get('dimensionRef') as DimensionToken,
        description: 'dimension type token with parent prefix',
        hasParentPrefix: true,
        hasJsOutput: false,
        hasTokenPrefix: true,
        expectedStyles: '$grid-spacing-desktop: 1.7778rem !default;',
      },
      {
        token: exampleDimensionAndStringTokens.get('dimensionRef') as DimensionToken,
        description: 'dimension type token without parent prefix',
        hasParentPrefix: false,
        hasJsOutput: false,
        hasTokenPrefix: true,
        expectedStyles: '$desktop: 1.7778rem !default;',
      },
      {
        token: exampleDimensionAndStringTokens.get('stringRef') as StringToken,
        description: 'string type token with parent prefix',
        hasParentPrefix: true,
        hasJsOutput: false,
        hasTokenPrefix: true,
        expectedStyles: '$grid-columns: 12 !default;',
      },
      {
        token: exampleDimensionAndStringTokens.get('stringRef') as StringToken,
        description: 'string type token without parent prefix',
        hasParentPrefix: false,
        hasJsOutput: false,
        hasTokenPrefix: false,
        expectedStyles: '$columns: 12 !default;',
      },
      {
        token: {
          id: '3',
          name: 'unsupportedToken',
          tokenType: TokenType.duration,
        } as Token,
        description: 'unsupported token type',
        hasParentPrefix: true,
        hasJsOutput: false,
        hasTokenPrefix: false,
        expectedStyles: null,
      },
      {
        token: exampleDimensionAndStringTokens.get('dimensionRef') as DimensionToken,
        description: 'dimension type token with parent prefix and js output',
        hasParentPrefix: true,
        hasJsOutput: true,
        hasTokenPrefix: false,
        expectedStyles: "export const gridSpacingDesktop = '1.7778rem';",
      },
      {
        token: exampleDimensionAndStringTokens.get('dimensionRef') as DimensionToken,
        description: 'dimension type token without parent prefix and js output',
        hasParentPrefix: false,
        hasJsOutput: true,
        hasTokenPrefix: false,
        expectedStyles: "export const desktop = '1.7778rem';",
      },
      {
        token: exampleDimensionAndStringTokens.get('stringRef') as StringToken,
        description: 'string type token with parent prefix and js output',
        hasParentPrefix: true,
        hasJsOutput: true,
        hasTokenPrefix: false,
        expectedStyles: "export const gridColumns = '12';",
      },
      {
        token: exampleDimensionAndStringTokens.get('stringRef') as StringToken,
        description: 'string type token without parent prefix and js output',
        hasParentPrefix: false,
        hasJsOutput: true,
        hasTokenPrefix: false,
        expectedStyles: "export const columns = '12';",
      },
      {
        token: exampleShadowTokens.get('shadowRef') as ShadowToken,
        description: 'shadow type token without parent prefix',
        hasParentPrefix: false,
        hasJsOutput: false,
        hasTokenPrefix: true,
        expectedStyles:
          '$shadow-100: 0 0.1429rem 0.5714rem 0 var(--spirit-color-shadows-shadow-100-color-01, #00000026) !default;',
      },
      {
        token: exampleShadowTokens.get('shadowRef') as ShadowToken,
        description: 'shadow type token without parent prefix',
        hasParentPrefix: false,
        hasJsOutput: false,
        hasTokenPrefix: false,
        expectedStyles:
          '$shadow-100: 0 0.1429rem 0.5714rem 0 var(--color-shadows-shadow-100-color-01, #00000026) !default;',
      },
      {
        token: exampleGradientTokens.get('gradientRef') as GradientToken,
        description: 'gradient type token without parent prefix',
        hasParentPrefix: false,
        hasJsOutput: false,
        hasTokenPrefix: true,
        expectedStyles:
          '$basic-overlay: linear-gradient(var(--gradient-angle, 90deg), var(--spirit-color-gradient-basic-overlay-color-01, #fff) 0%, var(--spirit-color-gradient-basic-overlay-color-02, #fff0) 100%) !default;',
      },
      {
        token: exampleGradientTokens.get('gradientRef') as GradientToken,
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
          mappedTokens,
          tokenGroups,
          tokenPrefix,
          false,
          hasParentPrefix,
          hasJsOutput,
          fontSizeBaseMap,
        );

        expect(styles).toBe(expectedStyles);
      },
    );
  });

  describe('generateStylesFromTokens', () => {
    const dataProvider = [
      {
        tokens: exampleDimensionAndStringTokens,
        hasJsOutput: false,
        hasMixin: false,
        hasParentPrefix: true,
        hasTokenPrefix: false,
        description: 'should generate styles from tokens',
        expectedStyles: '$grid-columns: 12 !default;\n\n$grid-spacing-desktop: 1.7778rem !default;',
      },
      {
        tokens: exampleDimensionAndStringTokens,
        hasJsOutput: true,
        hasMixin: false,
        hasParentPrefix: true,
        hasTokenPrefix: false,
        description: 'should generate styles from tokens with js output',
        expectedStyles: "export const gridColumns = '12';\n\nexport const gridSpacingDesktop = '1.7778rem';",
      },
      {
        tokens: exampleColorsTokens,
        hasJsOutput: false,
        hasMixin: true,
        hasParentPrefix: false,
        hasTokenPrefix: false,
        description: 'should generate styles from tokens with colors and mixin',
        expectedStyles: '$active: #ca2026 !default;\n\n$primary: #fff !default;',
      },
      {
        tokens: exampleColorsTokens,
        hasJsOutput: false,
        hasMixin: false,
        hasParentPrefix: false,
        hasTokenPrefix: true,
        description: 'should generate styles from tokens with colors and without mixin',
        expectedStyles: '$active: var(--spirit-color-active);\n\n$primary: var(--spirit-color-primary);',
      },
      {
        tokens: exampleColorsTokens,
        hasJsOutput: true,
        hasMixin: true,
        hasParentPrefix: false,
        hasTokenPrefix: false,
        description: 'should generate styles from tokens with colors with js output',
        expectedStyles: "export const active = '#ca2026';\n\nexport const primary = '#fff';",
      },
      {
        tokens: exampleShadowTokens,
        hasJsOutput: false,
        hasMixin: false,
        hasParentPrefix: false,
        hasTokenPrefix: true,
        description: 'should generate styles from tokens with shadows',
        expectedStyles:
          '$shadow-100: 0 0.1429rem 0.5714rem 0 var(--spirit-color-shadows-shadow-100-color-01, #00000026) !default;',
      },
      {
        tokens: exampleShadowTokens,
        hasJsOutput: false,
        hasMixin: false,
        hasParentPrefix: false,
        hasTokenPrefix: false,
        description: 'should generate styles from tokens with shadows',
        expectedStyles:
          '$shadow-100: 0 0.1429rem 0.5714rem 0 var(--color-shadows-shadow-100-color-01, #00000026) !default;',
      },
      {
        tokens: exampleGradientTokens,
        hasJsOutput: false,
        hasMixin: false,
        hasParentPrefix: false,
        hasTokenPrefix: true,
        description: 'should generate styles from tokens with gradients',
        expectedStyles:
          '$basic-overlay: linear-gradient(var(--gradient-angle, 90deg), var(--spirit-color-gradient-basic-overlay-color-01, #fff) 0%, var(--spirit-color-gradient-basic-overlay-color-02, #fff0) 100%) !default;',
      },
      {
        tokens: exampleGradientTokens,
        hasJsOutput: false,
        hasMixin: false,
        hasParentPrefix: false,
        hasTokenPrefix: false,
        description: 'should generate styles from tokens with gradients',
        expectedStyles:
          '$basic-overlay: linear-gradient(var(--gradient-angle, 90deg), var(--color-gradient-basic-overlay-color-01, #fff) 0%, var(--color-gradient-basic-overlay-color-02, #fff0) 100%) !default;',
      },
    ];

    it.each(dataProvider)(
      '$description',
      ({ tokens, hasJsOutput, hasMixin, hasParentPrefix, hasTokenPrefix, expectedStyles }) => {
        const prefixTokens = Array.from(examplePrefixToken.values());
        const tokenPrefix = hasTokenPrefix ? findTokenPrefix(prefixTokens) : '';
        const filteredTokens = filterExcludedTokens(Array.from(tokens.values()));
        const styles = generateStylesFromTokens(
          filteredTokens,
          mappedTokens,
          tokenGroups,
          tokenPrefix,
          hasMixin,
          hasParentPrefix,
          false,
          hasJsOutput,
          fontSizeBaseMap,
        );

        expect(styles).toBe(expectedStyles);
      },
    );
  });
});
