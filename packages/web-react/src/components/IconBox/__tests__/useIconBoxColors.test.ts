import { accentColorNames } from '@alma-oss/spirit-design-tokens';
import { renderHook } from '@testing-library/react';
import { EmotionColors } from '../../../constants';
import type { IconBoxColorsType } from '../../../types';
import { useIconBoxColors } from '../useIconBoxColors';

describe('useIconBoxColors', () => {
  it('should return default colors when no color and isSubtle=true (default)', () => {
    const { result } = renderHook(() => useIconBoxColors());

    expect(result.current.colors.background).toBe('emotion-informative-subtle');
    expect(result.current.colors.border).toBe('emotion-informative-subtle');
    expect(result.current.colors.text).toBe('emotion-informative-basic');
  });

  it('should swap intensities when isSubtle is false', () => {
    const { result } = renderHook(() => useIconBoxColors(undefined, false));

    expect(result.current.colors.background).toBe('emotion-informative-basic');
    expect(result.current.colors.border).toBe('emotion-informative-basic');
    expect(result.current.colors.text).toBe('emotion-informative-subtle');
  });

  it('should use accent prefix when provided color is an accent color name', () => {
    const { result } = renderHook(() => useIconBoxColors('01'));

    expect(result.current.colors.background).toBe('accent-01-subtle');
    expect(result.current.colors.border).toBe('accent-01-subtle');
    expect(result.current.colors.text).toBe('accent-01-basic');
  });

  it('should use emotion prefix when provided color is not an accent color name', () => {
    const { result } = renderHook(() => useIconBoxColors(EmotionColors.INFORMATIVE));

    expect(result.current.colors.background).toBe('emotion-informative-subtle');
    expect(result.current.colors.border).toBe('emotion-informative-subtle');
    expect(result.current.colors.text).toBe('emotion-informative-basic');
  });

  it.each([...Object.values(EmotionColors)])('should return correct colors for %s emotion colors', (color) => {
    const { result } = renderHook(() => useIconBoxColors(color));

    expect(result.current.colors.background).toBe(`emotion-${color}-subtle`);
    expect(result.current.colors.border).toBe(`emotion-${color}-subtle`);
    expect(result.current.colors.text).toBe(`emotion-${color}-basic`);
  });

  it.each([...accentColorNames])('should return correct colors for %s accent colors', (color) => {
    const { result } = renderHook(() => useIconBoxColors(color as IconBoxColorsType));

    expect(result.current.colors.background).toBe(`accent-${color}-subtle`);
    expect(result.current.colors.border).toBe(`accent-${color}-subtle`);
    expect(result.current.colors.text).toBe(`accent-${color}-basic`);
  });
});
