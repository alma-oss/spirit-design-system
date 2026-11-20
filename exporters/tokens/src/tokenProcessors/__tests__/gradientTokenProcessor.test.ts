import { exampleGradientTokens } from '../../../tests/fixtures/internal-model/exampleGradientTokens';
import { createTokenIndex } from '../../core/tokenIndex';
import { processGradientToken } from '../gradientTokenProcessor';

const tokenIndex = createTokenIndex([]);

describe('gradientTokenProcessor', () => {
  describe('processGradientToken', () => {
    it('should process gradient token', () => {
      const token = exampleGradientTokens.get('gradientRef')!;
      const ctx = {
        hasParentPrefix: false,
        hasJsOutput: false,
        tokenPrefix: 'spirit-',
        tokenIndex,
      };

      const result = processGradientToken(token, ctx);

      expect(result).toContain('gradient');
      expect(result).toContain('linear-gradient');
    });

    it('should process gradient token with js output', () => {
      const token = exampleGradientTokens.get('gradientRef')!;
      const ctx = {
        hasParentPrefix: false,
        hasJsOutput: true,
        tokenPrefix: 'spirit-',
        tokenIndex,
      };

      const result = processGradientToken(token, ctx);

      expect(result).toContain('export const');
    });

    it('should add angle variable to gradient', () => {
      const token = exampleGradientTokens.get('gradientRef')!;
      const ctx = {
        hasParentPrefix: false,
        hasJsOutput: false,
        tokenPrefix: 'spirit-',
        tokenIndex,
      };

      const result = processGradientToken(token, ctx);

      expect(result).toContain('var(--gradient-angle');
    });

    it('should transform colors to variables', () => {
      const token = exampleGradientTokens.get('gradientRef')!;
      const ctx = {
        hasParentPrefix: false,
        hasJsOutput: false,
        tokenPrefix: 'spirit-',
        tokenIndex,
      };

      const result = processGradientToken(token, ctx);

      expect(result).toContain('var(--');
    });

    it('should handle gradient with parent prefix', () => {
      const token = exampleGradientTokens.get('gradientRef')!;
      const ctx = {
        hasParentPrefix: true,
        hasJsOutput: false,
        tokenPrefix: 'spirit-',
        tokenIndex,
      };

      const result = processGradientToken(token, ctx);

      expect(result).toBeTruthy();
      expect(result).toContain('gradient');
    });
  });
});
