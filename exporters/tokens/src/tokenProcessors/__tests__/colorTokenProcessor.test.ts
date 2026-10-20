import { ColorToken, TokenGroup } from '@supernovaio/sdk-exporters';
import { exampleColorsTokens } from '../../../tests/fixtures/exampleColorTokens';
import { exampleGroups } from '../../../tests/fixtures/exampleGroups';
import { sampleConfigurationDefault } from '../../../tests/fixtures/sampleConfiguration';
import { processColorToken } from '../colorTokenProcessor';

jest.mock('../../../config', () => ({
  exportConfiguration: sampleConfigurationDefault,
}));

const tokenGroups: Array<TokenGroup> = exampleGroups;
const mappedTokens: Map<string, unknown> = new Map();

describe('colorTokenProcessor', () => {
  describe('processColorToken', () => {
    it('should process color token', () => {
      const token = exampleColorsTokens.get('backgroundColorRef') as ColorToken;
      const ctx = {
        tokenGroups,
        hasParentPrefix: true,
        hasJsOutput: false,
        mappedTokens,
      };

      const result = processColorToken(token, ctx);

      expect(result).toContain('background-primary');
      expect(result).not.toContain('var(--');
    });

    it('should process color token with js output', () => {
      const token = exampleColorsTokens.get('backgroundColorRef') as ColorToken;
      const ctx = {
        tokenGroups,
        hasParentPrefix: true,
        hasJsOutput: true,
        mappedTokens,
      };

      const result = processColorToken(token, ctx);

      expect(result).toContain('export const');
      expect(result).not.toContain('var(--');
    });
  });
});
