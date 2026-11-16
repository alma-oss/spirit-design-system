import { roundToDecimals } from '../numberHelper';

describe('numberHelper', () => {
  describe('roundToDecimals', () => {
    it.each([
      [1.4454, 2, 1.45],
      [1.005, 2, 1.01],
      [2.5, 0, 3],
      [0.3333333, 4, 0.3333],
    ])('should round %s to %s decimals as %s', (value, decimals, expected) => {
      expect(roundToDecimals(value, decimals)).toBe(expected);
    });

    it('should normalize negative zero to zero', () => {
      expect(Object.is(roundToDecimals(-0.00001, 2), 0)).toBe(true);
    });
  });
});
