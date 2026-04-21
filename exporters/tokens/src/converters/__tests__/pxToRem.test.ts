import { pxToRem } from '../pxToRem';

describe('pxToRem', () => {
  it('should convert px to rem with default rounding and trims zeros', () => {
    expect(pxToRem(32, { baseFontSize: 16 })).toBe('2rem');
    expect(pxToRem(40, { baseFontSize: 16 })).toBe('2.5rem');
    expect(pxToRem(1, { baseFontSize: 16 })).toBe('0.0625rem');
    expect(pxToRem(8, { baseFontSize: 14 })).toBe('0.5714rem');
  });

  it('should support custom decimals', () => {
    expect(pxToRem(1, { baseFontSize: 16, decimals: 3 })).toBe('0.063rem');
    expect(pxToRem(10, { baseFontSize: 16, decimals: 3 })).toBe('0.625rem');
  });

  it('should fall back to px string when baseFontSize is missing/invalid', () => {
    expect(pxToRem(32, { baseFontSize: 0 })).toBe('32px');
    expect(pxToRem('32', { baseFontSize: -1 })).toBe('32px');
  });
});
