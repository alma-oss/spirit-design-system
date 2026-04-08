import { Token } from '@supernovaio/sdk-exporters';
import { handleSpecialCase } from '../specialCaseHelper';
import {
  exampleInvariantTokens,
  exampleDimensionAndStringTokens,
} from '../../../tests/fixtures/exampleDimensionAndStringTokens';
import { getTokenAlias } from '../objectHelper';

describe('specialCaseHelper', () => {
  it('should handle special case', () => {
    const result = handleSpecialCase('breakpoint-mobile', 32);

    expect(result).toBe(0);
  });

  it('should not handle special case', () => {
    const result = handleSpecialCase('breakpoint-tablet', 32);

    expect(result).toBe(32);
  });
});

describe('handleInvariantTokens', () => {
  it('should return token alias for invariant case', () => {
    const token = exampleInvariantTokens.get('radiiRef') as Token;

    expect(getTokenAlias(token, false)).toBe('full');
  });

  it('should return token alias for non-invariant case', () => {
    const token = exampleDimensionAndStringTokens.get('dimensionRef') as Token;

    expect(getTokenAlias(token, false)).toBe('desktop');
  });
});
