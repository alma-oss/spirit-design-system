import { type Token } from '@supernovaio/sdk-exporters';
import { exampleColorsTokens } from '../../../../tests/fixtures/exampleColorTokens';
import { exampleDimensionAndStringTokens } from '../../../../tests/fixtures/exampleDimensionAndStringTokens';
import { exampleGroups } from '../../../../tests/fixtures/exampleGroups';
import { createSupernovaTokenIndex } from '../tokenIndex';

describe('createSupernovaTokenIndex', () => {
  const nativeTokens = new Map<string, Token>([...exampleColorsTokens, ...exampleDimensionAndStringTokens]);
  const index = createSupernovaTokenIndex(nativeTokens, exampleGroups);

  it('maps a native token to the internal model on access', () => {
    expect(index.get('actionColorRef')).toMatchObject({
      id: 'actionColorRef',
      value: { type: 'color', value: '#ca2026ff' },
    });
  });

  it('maps a token only once', () => {
    expect(index.get('actionColorRef')).toBe(index.get('actionColorRef'));
  });

  it('knows every native token, even one the mapper does not support', () => {
    const unsupported = { id: 'duration', tokenType: 'Duration' } as unknown as Token;
    const unsupportedIndex = createSupernovaTokenIndex(new Map([['duration', unsupported]]), exampleGroups);

    expect(unsupportedIndex.has('duration')).toBe(true);
    expect(unsupportedIndex.get('duration')).toBeUndefined();
  });

  it('does not know unknown ids', () => {
    expect(index.has('missing')).toBe(false);
    expect(index.get('missing')).toBeUndefined();
  });
});
