import { findSingleBrandId } from '../findSingleBrandId';
import { type DesignToken, TokenTypeEnum } from '../types';

const token = (brandId?: string): DesignToken => ({
  id: 't',
  name: 't',
  type: TokenTypeEnum.String,
  value: { type: 'string', value: 't' },
  metadata: { groupPath: [], brandId },
  source: { adapter: 'test', originalId: 't' },
});

describe('findSingleBrandId', () => {
  it('should return the brand shared by all tokens', () => {
    expect(findSingleBrandId([token('a'), token('a')])).toBe('a');
  });

  it('should return undefined for several brands, no brand or no tokens', () => {
    expect(findSingleBrandId([token('a'), token('b')])).toBeUndefined();
    expect(findSingleBrandId([token()])).toBeUndefined();
    expect(findSingleBrandId([token('a'), token()])).toBeUndefined();
    expect(findSingleBrandId([])).toBeUndefined();
  });
});
