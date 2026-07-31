import { isPlainObject } from '../isPlainObject';

describe('isPlainObject', () => {
  it.each([
    [{}, true],
    [{ key: 'value' }, true],
    [[], false],
    [['item'], false],
    [null, false],
    ['string', false],
    [42, false],
    [true, false],
    [undefined, false],
    [() => undefined, false],
  ])('should return %s for value %p', (value, expected) => {
    expect(isPlainObject(value)).toBe(expected);
  });
});
