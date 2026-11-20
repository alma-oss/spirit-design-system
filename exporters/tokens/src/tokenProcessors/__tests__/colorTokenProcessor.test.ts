import { exampleColorsTokens } from '../../../tests/fixtures/internal-model/exampleColorTokens';
import { createTokenIndex } from '../../core/tokenIndex';
import { processColorToken } from '../colorTokenProcessor';

const tokenIndex = createTokenIndex([]);

describe('colorTokenProcessor', () => {
  describe('processColorToken', () => {
    it('should process color token', () => {
      const token = exampleColorsTokens.get('backgroundColorRef')!;
      const ctx = {
        hasParentPrefix: true,
        hasJsOutput: false,
        tokenIndex,
      };

      const result = processColorToken(token, ctx);

      expect(result).toContain('background-primary');
      expect(result).not.toContain('var(--');
    });

    it('should process color token with js output', () => {
      const token = exampleColorsTokens.get('backgroundColorRef')!;
      const ctx = {
        hasParentPrefix: true,
        hasJsOutput: true,
        tokenIndex,
      };

      const result = processColorToken(token, ctx);

      expect(result).toContain('export const');
      expect(result).not.toContain('var(--');
    });
  });
});
