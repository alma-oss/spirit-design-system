import { createTokenIndex } from '../tokenIndex';
import { resolveValueDeep } from '../resolveValue';
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

describe('resolveValueDeep', () => {
  const reference = (tokenId: string): TokenValue => ({ type: 'reference', tokenId });
  const composite = (value: Record<string, TokenValue>): TokenValue => ({ type: 'composite', value });

  it('should return a concrete value as it is', () => {
    const value = color('#ff0000ff');

    expect(resolveValueDeep(value, createTokenIndex([]))).toBe(value);
  });

  it('should read the referenced token value from the index when the adapter did not resolve it', () => {
    const index = createTokenIndex([createToken('red', color('#ff0000ff'))]);

    expect(resolveValueDeep(reference('red'), index)).toEqual(color('#ff0000ff'));
  });

  it('should follow a chain of references to other color tokens', () => {
    const index = createTokenIndex([createToken('brand', reference('red')), createToken('red', color('#ff0000ff'))]);

    expect(resolveValueDeep(reference('brand'), index)).toEqual(color('#ff0000ff'));
  });

  it('should prefer the value the adapter already resolved over the referenced token value', () => {
    const index = createTokenIndex([createToken('red', color('#ff0000ff'))]);
    const value: TokenValue = { type: 'reference', tokenId: 'red', resolved: color('#00ff00ff') };

    expect(resolveValueDeep(value, index)).toEqual(color('#00ff00ff'));
  });

  it('should still require the referenced token to exist when the adapter resolved the value', () => {
    const value: TokenValue = { type: 'reference', tokenId: 'missing', resolved: color('#00ff00ff') };

    expect(() => resolveValueDeep(value, createTokenIndex([]))).toThrow(
      'Trying to retrieve unknown referenced token missing',
    );
  });

  it('should throw for a reference to an unknown token', () => {
    expect(() => resolveValueDeep(reference('missing'), createTokenIndex([]))).toThrow(
      'Trying to retrieve unknown referenced token missing',
    );
  });

  it('should throw for circular references', () => {
    const index = createTokenIndex([createToken('a', reference('b')), createToken('b', reference('a'))]);

    expect(() => resolveValueDeep(reference('a'), index)).toThrow('Circular reference');
  });

  it('should throw when a known token cannot be read in the internal model', () => {
    const index = { has: () => true, get: () => undefined };

    expect(() => resolveValueDeep(reference('unmapped'), index)).toThrow(
      'Referenced token unmapped has no value in the internal model',
    );
  });

  it('should resolve the references in members of a composite value, however deep', () => {
    const index = createTokenIndex([createToken('red', color('#ff0000ff'))]);
    const value = composite({ layer: composite({ color: reference('red') }), width: { type: 'number', value: 1 } });

    expect(resolveValueDeep(value, index)).toEqual(
      composite({ layer: composite({ color: color('#ff0000ff') }), width: { type: 'number', value: 1 } }),
    );
  });

  it('should resolve a member that is a reference to a composite value, and the references inside of it', () => {
    const index = createTokenIndex([
      createToken('layer', composite({ color: reference('red') })),
      createToken('red', color('#ff0000ff')),
    ]);

    expect(resolveValueDeep(composite({ 0: reference('layer') }), index)).toEqual(
      composite({ 0: composite({ color: color('#ff0000ff') }) }),
    );
  });

  it('should resolve the same token referenced by more members', () => {
    const index = createTokenIndex([createToken('red', color('#ff0000ff'))]);

    expect(resolveValueDeep(composite({ a: reference('red'), b: reference('red') }), index)).toEqual(
      composite({ a: color('#ff0000ff'), b: color('#ff0000ff') }),
    );
  });

  it('should not change the value it was given', () => {
    const index = createTokenIndex([createToken('red', color('#ff0000ff'))]);
    const value = composite({ color: reference('red') });

    resolveValueDeep(value, index);

    expect(value).toEqual(composite({ color: reference('red') }));
  });

  it('should throw for a reference to an unknown token inside a composite value', () => {
    expect(() => resolveValueDeep(composite({ color: reference('missing') }), createTokenIndex([]))).toThrow(
      'Trying to retrieve unknown referenced token missing',
    );
  });

  it('should throw for a composite value that contains itself through a reference', () => {
    const index = createTokenIndex([createToken('shadow', composite({ layer: reference('shadow') }))]);

    expect(() => resolveValueDeep(reference('shadow'), index)).toThrow('Circular reference detected at token shadow');
  });
});
