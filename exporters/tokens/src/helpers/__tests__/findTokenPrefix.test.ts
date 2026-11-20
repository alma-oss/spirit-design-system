import type { DesignToken } from '../../core/types';
import { examplePrefixToken } from '../../../tests/fixtures/internal-model/examplePrefixToken';
import { findTokenPrefix } from '../findTokenPrefix';

describe('findTokenPrefix', () => {
  it('should return token prefix', () => {
    const tokens = Array.from(examplePrefixToken.values());
    const expectedValue = 'spirit-';

    expect(findTokenPrefix(tokens)).toBe(expectedValue);
  });

  it('should read the prefix of a token that is an alias', () => {
    const [prefix] = Array.from(examplePrefixToken.values());
    const alias: DesignToken = {
      ...prefix,
      id: 'alias',
      value: { type: 'reference', tokenId: 'target', resolved: prefix.value },
    };

    expect(findTokenPrefix([alias])).toBe('spirit-');
  });

  it('should return empty string if token prefix is not found', () => {
    const tokens: DesignToken[] = [];
    const expectedValue = '';

    expect(findTokenPrefix(tokens)).toBe(expectedValue);
  });
});
