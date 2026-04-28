import { FALLBACK_BASE_FONT_SIZE_PX } from '../../constants';
import { DEFAULT_BASE_FONT_SIZE_PX, pxToRem } from '../pxToRem';

describe('pxToRem', () => {
  it('should convert px values to rem values', () => {
    expect(pxToRem(32)).toBe(`${32 / DEFAULT_BASE_FONT_SIZE_PX}rem`);
    expect(pxToRem(32, { baseFontSize: 16 })).toBe('2rem');
    expect(pxToRem(32, { baseFontSize: '16px' })).toBe('2rem');
    expect(pxToRem(40, { baseFontSize: 16 })).toBe('2.5rem');
    expect(pxToRem(1, { baseFontSize: 16 })).toBe('0.0625rem');
    expect(pxToRem(8, { baseFontSize: 14 })).toBe('0.5714rem');
  });

  it('should respect decimal precision', () => {
    expect(pxToRem(1, { baseFontSize: 16, decimals: 3 })).toBe('0.063rem');
    expect(pxToRem(10, { baseFontSize: 16, decimals: 3 })).toBe('0.625rem');
  });

  it('should use fallback base font size when baseFontSize is invalid', () => {
    expect(pxToRem(32, { baseFontSize: 0 })).toBe(`${32 / FALLBACK_BASE_FONT_SIZE_PX}rem`);
    expect(pxToRem('32', { baseFontSize: -1 })).toBe(`${32 / FALLBACK_BASE_FONT_SIZE_PX}rem`);
  });
});
