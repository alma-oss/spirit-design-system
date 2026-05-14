import { renderHook } from '@testing-library/react';
import { type SpiritAlertProps } from '../../../types';
import { getColorSchemeClassName } from '../../../utils';
import { useAlertStyleProps } from '../useAlertStyleProps';

describe('useAlertStyleProps', () => {
  it('should return defaults', () => {
    const props = {};
    const { result } = renderHook(() => useAlertStyleProps(props));

    expect(result.current.classProps).toBe('Alert');
  });

  it.each([['success'], ['informative'], ['warning'], ['danger']])('should return color class %s', (color) => {
    const props = { color } as SpiritAlertProps;
    const { result } = renderHook(() => useAlertStyleProps(props));

    expect(result.current.classProps).toBe(
      `Alert Alert--${color} ${getColorSchemeClassName({ color, isSubtle: true })}`,
    );
  });

  it('should return centered', () => {
    const props = { isCentered: true } as SpiritAlertProps;
    const { result } = renderHook(() => useAlertStyleProps(props));

    expect(result.current.classProps).toBe('Alert Alert--center');
  });
});
