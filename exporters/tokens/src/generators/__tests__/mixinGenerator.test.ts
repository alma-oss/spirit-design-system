import { examplePrefixToken } from '../../../tests/fixtures/internal-model/examplePrefixToken';
import { findTokenPrefix } from '../../helpers/findTokenPrefix';
import { exampleColorsTokens } from '../../../tests/fixtures/internal-model/exampleColorTokens';
import { SCSS_INDENTATION } from '../../constants';
import { generateMixinFromTokens } from '../mixinGenerator';

describe('mixinGenerator', () => {
  const dataProvider = [
    {
      tokens: exampleColorsTokens,
      hasParentPrefix: false,
      hasTokenPrefix: true,
      description: 'should generate mixin from tokens',
      expectedStyles: `${SCSS_INDENTATION}--spirit-color-active: #{$active};\n${SCSS_INDENTATION}--spirit-color-primary: #{$primary};`,
    },
    {
      tokens: exampleColorsTokens,
      hasParentPrefix: false,
      hasTokenPrefix: false,
      description: 'should generate mixin with parent prefix and no token prefix',
      expectedStyles: `${SCSS_INDENTATION}--color-active: #{$active};\n${SCSS_INDENTATION}--color-primary: #{$primary};`,
    },
  ];

  it.each(dataProvider)(
    'should correctly generate mixin for $description',
    ({ tokens, expectedStyles, hasParentPrefix, hasTokenPrefix }) => {
      const prefixTokens = Array.from(examplePrefixToken.values());
      const tokenPrefix = hasTokenPrefix ? findTokenPrefix(prefixTokens) : '';

      const styles = generateMixinFromTokens(
        Array.from(tokens.values()),
        tokenPrefix,
        hasParentPrefix,
        false,
        'color-css-variables',
        'color-',
      );

      expect(styles).toBe(`@mixin color-css-variables {\n${expectedStyles}\n}\n`);
    },
  );
});
