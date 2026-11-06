import { createTokenIndex } from '../tokenIndex';
import { type DesignToken, TokenTypeEnum } from '../types';

const token: DesignToken = {
  id: 'token-1',
  name: 'token-1',
  type: TokenTypeEnum.String,
  value: { type: 'string', value: 'text' },
  metadata: { groupPath: [] },
  source: { adapter: 'test', originalId: 'token-1' },
};

describe('createTokenIndex', () => {
  it('should address tokens by id', () => {
    const index = createTokenIndex([token]);

    expect(index.has('token-1')).toBe(true);
    expect(index.get('token-1')).toBe(token);
  });

  it('should not know other ids', () => {
    const index = createTokenIndex([token]);

    expect(index.has('other')).toBe(false);
    expect(index.get('other')).toBeUndefined();
  });
});
