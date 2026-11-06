import { createTokenIndex } from '../tokenIndex';
import { resolveValue } from '../resolveValue';
import { type ColorValue, type DesignToken, type TokenValue, TokenTypeEnum } from '../types';

const color = (value: string): ColorValue => ({ type: 'color', format: 'hex', value });

const createToken = (id: string, value: TokenValue): DesignToken => ({
  id,
  name: id,
  type: TokenTypeEnum.Color,
  value,
  metadata: { groupPath: [] },
  source: { adapter: 'test', originalId: id },
});

describe('resolveValue', () => {
  it('returns a concrete value as it is', () => {
    const value = color('#ff0000ff');

    expect(resolveValue(value, createTokenIndex([]))).toBe(value);
  });

  it('does not walk into composite values', () => {
    const value: TokenValue = { type: 'composite', value: { color: { type: 'reference', tokenId: 'unknown' } } };

    expect(resolveValue(value, createTokenIndex([]))).toBe(value);
  });

  it('reads the referenced token value from the index when the adapter did not resolve it', () => {
    const index = createTokenIndex([createToken('red', color('#ff0000ff'))]);

    expect(resolveValue({ type: 'reference', tokenId: 'red' }, index)).toEqual(color('#ff0000ff'));
  });

  it('follows a chain of references to other color tokens', () => {
    const index = createTokenIndex([
      createToken('brand', { type: 'reference', tokenId: 'red' }),
      createToken('red', color('#ff0000ff')),
    ]);

    expect(resolveValue({ type: 'reference', tokenId: 'brand' }, index)).toEqual(color('#ff0000ff'));
  });

  it('prefers the value the adapter already resolved over the referenced token value', () => {
    const index = createTokenIndex([createToken('red', color('#ff0000ff'))]);
    const reference: TokenValue = { type: 'reference', tokenId: 'red', resolved: color('#00ff00ff') };

    expect(resolveValue(reference, index)).toEqual(color('#00ff00ff'));
  });

  it('still requires the referenced token to exist when the adapter resolved the value', () => {
    const reference: TokenValue = { type: 'reference', tokenId: 'missing', resolved: color('#00ff00ff') };

    expect(() => resolveValue(reference, createTokenIndex([]))).toThrow(
      'Trying to retrieve unknown referenced token missing',
    );
  });

  it('throws for a reference to an unknown token', () => {
    expect(() => resolveValue({ type: 'reference', tokenId: 'missing' }, createTokenIndex([]))).toThrow(
      'Trying to retrieve unknown referenced token missing',
    );
  });

  it('throws for circular references', () => {
    const index = createTokenIndex([
      createToken('a', { type: 'reference', tokenId: 'b' }),
      createToken('b', { type: 'reference', tokenId: 'a' }),
    ]);

    expect(() => resolveValue({ type: 'reference', tokenId: 'a' }, index)).toThrow('Circular reference');
  });

  it('throws when a known token cannot be read in the internal model', () => {
    const index = { has: () => true, get: () => undefined };

    expect(() => resolveValue({ type: 'reference', tokenId: 'unmapped' }, index)).toThrow(
      'Referenced token unmapped has no value in the internal model',
    );
  });
});
