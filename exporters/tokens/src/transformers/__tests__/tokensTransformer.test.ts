import { type Token } from '@supernovaio/sdk-exporters';
import { transformToMap } from '../tokensTransformer';

// Mock token data for testing
const createMockToken = (id: string, name: string = 'Test Token'): Token => {
  return {
    id,
    name,
  } as Token;
};

describe('tokensTransformer', () => {
  describe('transformToMap', () => {
    it('should convert empty array to empty Map', () => {
      const result = transformToMap([]);

      expect(result).toBeInstanceOf(Map);
      expect(result.size).toBe(0);
    });

    it('should convert single token to Map with one entry', () => {
      const token = createMockToken('token-1', 'Color Primary');
      const result = transformToMap([token]);

      expect(result).toBeInstanceOf(Map);
      expect(result.size).toBe(1);
      expect(result.get('token-1')).toBe(token);
    });

    it('should convert multiple tokens to Map with correct key-value pairs', () => {
      const token1 = createMockToken('token-1', 'Color Primary');
      const token2 = createMockToken('token-2', 'Color Secondary');
      const token3 = createMockToken('token-3', 'Color Tertiary');
      const tokens = [token1, token2, token3];

      const result = transformToMap(tokens);

      expect(result).toBeInstanceOf(Map);
      expect(result.size).toBe(3);
      expect(result.get('token-1')).toBe(token1);
      expect(result.get('token-2')).toBe(token2);
      expect(result.get('token-3')).toBe(token3);
    });

    it('should handle tokens with duplicate IDs (last one wins)', () => {
      const token1 = createMockToken('duplicate-id', 'First Token');
      const token2 = createMockToken('duplicate-id', 'Second Token');
      const tokens = [token1, token2];

      const result = transformToMap(tokens);

      expect(result).toBeInstanceOf(Map);
      expect(result.size).toBe(1);
      expect(result.get('duplicate-id')).toBe(token2);
    });

    it('should preserve token objects without modification', () => {
      const token = createMockToken('token-1', 'Original Token');
      const result = transformToMap([token]);

      const retrievedToken = result.get('token-1');

      expect(retrievedToken).toBe(token);
      expect(retrievedToken).toEqual(token);
    });
  });
});
