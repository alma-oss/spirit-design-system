import { Unit } from '@supernovaio/sdk-exporters';
import { unitToCss } from '../units';

describe('unitToCss', () => {
  it.each([
    [Unit.percent, '%'],
    [Unit.pixels, 'px'],
    [Unit.rem, 'rem'],
    [Unit.raw, ''],
    [Unit.ms, 'ms'],
  ])('should convert %s to "%s"', (unit, expected) => {
    expect(unitToCss(unit)).toBe(expected);
  });

  it('should fall back to px for an unknown unit', () => {
    expect(unitToCss('Unknown' as unknown as Unit)).toBe('px');
  });
});
