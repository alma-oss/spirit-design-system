import { TokenGroup } from '@supernovaio/sdk-exporters';
import { exampleGroups } from '../../../tests/fixtures/exampleGroups';
import { examplePrefixToken } from '../../../tests/fixtures/examplePrefixToken';
import { findTokenPrefix } from '../../helpers/findTokenPrefix';
import { exampleColorsTokens } from '../../../tests/fixtures/exampleColorTokens';
import { sampleConfigurationDefault } from '../../../tests/fixtures/sampleConfiguration';
import { SCSS_INDENTATION } from '../../constants';
import { generateMixinFromTokens } from '../mixinGenerator';

const tokenGroups: Array<TokenGroup> = exampleGroups;
jest.mock('../../../config', () => ({
  exportConfiguration: sampleConfigurationDefault,
}));

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
        tokenGroups,
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
