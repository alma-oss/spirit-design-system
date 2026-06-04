import { renderHook } from '@testing-library/react';
import { type SpiritToastBarProps } from '../../../types';
import { useToastIcon } from '../useToastIcon';

describe('useToastIcon', () => {
  it('should return defaults', () => {
    const props = {};
    const { result } = renderHook(() => useToastIcon(props));

    expect(result.current).toBe('info');
  });

  it.each([
    // color, expected icon name
    ['danger', 'danger'],
    ['informative', 'info'],
    ['neutral', 'info'],
    ['success', 'success'],
    ['warning', 'warning'],
  ])('danger alert should return warning icon', (color, iconName) => {
    const props = { color } as Partial<SpiritToastBarProps>;
    const { result } = renderHook(() => useToastIcon(props));

    expect(result.current).toBe(iconName);
  });
});
