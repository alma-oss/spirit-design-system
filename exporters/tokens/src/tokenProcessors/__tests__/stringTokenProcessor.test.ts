import { exampleDimensionAndStringTokens } from '../../../tests/fixtures/internal-model/exampleDimensionAndStringTokens';
import { createDesignToken } from '../../../tests/helpers/createDesignToken';
import { TokenTypeEnum } from '../../core/types';
import { processStringToken } from '../stringTokenProcessor';

describe('stringTokenProcessor', () => {
  describe('processStringToken', () => {
    it('should process string token', () => {
      const token = exampleDimensionAndStringTokens.get('stringRef')!;
      const ctx = {
        hasParentPrefix: true,
        hasJsOutput: false,
      };

      const result = processStringToken(token, ctx);

      expect(result).toBe('$grid-columns: 12 !default;');
    });

    it('should process string token without parent prefix', () => {
      const token = exampleDimensionAndStringTokens.get('stringRef')!;
      const ctx = {
        hasParentPrefix: false,
        hasJsOutput: false,
      };

      const result = processStringToken(token, ctx);

      expect(result).toBe('$columns: 12 !default;');
    });

    it('should process string token with js output', () => {
      const token = exampleDimensionAndStringTokens.get('stringRef')!;
      const ctx = {
        hasParentPrefix: true,
        hasJsOutput: true,
      };

      const result = processStringToken(token, ctx);

      expect(result).toBe("export const gridColumns = '12';");
    });

    it('should handle special case values', () => {
      const token = createDesignToken(
        TokenTypeEnum.String,
        { type: 'string', value: '12' },
        { id: '1', name: 'grid-columns' },
      );
      const ctx = {
        hasParentPrefix: true,
        hasJsOutput: false,
      };

      const result = processStringToken(token, ctx);

      expect(result).toBe('$grid-columns: 12 !default;');
    });

    it('should return null for a value that is not a string', () => {
      const token = createDesignToken(TokenTypeEnum.String, { type: 'number', value: 12, unit: '' }, { id: '1' });

      expect(processStringToken(token, { hasParentPrefix: true, hasJsOutput: false })).toBeNull();
    });
  });
});
