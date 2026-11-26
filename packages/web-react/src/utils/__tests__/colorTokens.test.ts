import { ColorPrefixes } from '../../constants';
import {
  createColorTokenName,
  createScopedColorTokenName,
  generateColorsObject,
  getColorCategory,
} from '../colorTokens';

describe('color token utilities', () => {
  it('returns matching category for a prefixed color', () => {
    expect(getColorCategory('success')).toBe(ColorPrefixes.EMOTION);
  });

  it('returns matching category for an accent color', () => {
    expect(getColorCategory('01')).toBe(ColorPrefixes.ACCENT);
  });

  it('returns undefined category for an unprefixed color', () => {
    expect(getColorCategory('selected')).toBeUndefined();
  });

  it('creates a token name with prefix', () => {
    expect(createColorTokenName('success', 'basic', ColorPrefixes.EMOTION)).toBe('emotion-success-basic');
  });

  it('creates a scoped token name for prefixed colors', () => {
    expect(
      createScopedColorTokenName({
        color: 'success',
        intensity: 'subtle',
      }),
    ).toBe('emotion-success-subtle');
  });

  it('creates a scoped token name for accent colors', () => {
    expect(
      createScopedColorTokenName({
        color: '01',
        intensity: 'basic',
      }),
    ).toBe('accent-01-basic');
  });

  it('creates a scoped token name for unprefixed colors', () => {
    expect(
      createScopedColorTokenName({
        color: 'selected',
        intensity: 'basic',
      }),
    ).toBe('selected-basic');
  });

  it('returns a correctly formatted object from color names and default intensities', () => {
    const result = generateColorsObject(['01', '02'], 'accent');

    expect(result).toStrictEqual({
      ACCENT_01_BASIC: 'accent-01-basic',
      ACCENT_01_SUBTLE: 'accent-01-subtle',
      ACCENT_02_BASIC: 'accent-02-basic',
      ACCENT_02_SUBTLE: 'accent-02-subtle',
    });
  });

  it('returns an empty object for no color names', () => {
    expect(generateColorsObject([], 'accent')).toStrictEqual({});
  });
});
