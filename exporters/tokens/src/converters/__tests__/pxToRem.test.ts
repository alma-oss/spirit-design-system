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

  it('should accept px-suffixed string values', () => {
    expect(pxToRem('16px', { baseFontSize: 16 })).toBe('1rem');
    expect(pxToRem('24px', { baseFontSize: 16 })).toBe('1.5rem');
  });

  it('should fall back to 0rem when valuePx is not a parsable number', () => {
    expect(pxToRem('abc', { baseFontSize: 16 })).toBe('0rem');
    expect(pxToRem(Number.NaN, { baseFontSize: 16 })).toBe('0rem');
    expect(pxToRem(Number.POSITIVE_INFINITY, { baseFontSize: 16 })).toBe('0rem');
  });

  it('should use default decimals when decimals option is invalid', () => {
    expect(pxToRem(1, { baseFontSize: 16, decimals: Number.NaN })).toBe('0.0625rem');
    expect(pxToRem(1, { baseFontSize: 16, decimals: Number.POSITIVE_INFINITY })).toBe('0.0625rem');
    expect(pxToRem(1, { baseFontSize: 16, decimals: Number.NEGATIVE_INFINITY })).toBe('0.0625rem');
    expect(pxToRem(1, { baseFontSize: 16, decimals: -1 })).toBe('0.0625rem');
    expect(pxToRem(1, { baseFontSize: 16, decimals: 101 })).toBe('0.0625rem');
    expect(pxToRem(1, { baseFontSize: 16, decimals: 2.5 })).toBe('0.0625rem');
  });
});
