import { pxToRem } from '../units';

describe('pxToRem', () => {
  it('converts, rounds, and trims zeros', () => {
    expect(pxToRem(32, { baseFontSize: 16 })).toBe('2rem');
    expect(pxToRem(40, { baseFontSize: 16 })).toBe('2.5rem');
    expect(pxToRem(1, { baseFontSize: 16 })).toBe('0.0625rem');
    expect(pxToRem(32, { baseFontSize: 0 })).toBe('32px');
  });
});
