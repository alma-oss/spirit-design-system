import { renderHook } from '@testing-library/react';
import { type SpiritTagProps } from '../../../types';
import { useTagStyleProps } from '../useTagStyleProps';

describe('useTagStyleProps', () => {
  it('should return defaults', () => {
    const props = {};
    const { result } = renderHook(() => useTagStyleProps(props));

    expect(result.current.classProps).toBe('Tag');
  });

  it.each([['neutral'], ['success'], ['informative'], ['warning'], ['danger'], ['selected']])(
    'should return color class %s',
    (color) => {
      const props = { color } as SpiritTagProps;
      const { result } = renderHook(() => useTagStyleProps(props));

      expect(result.current.classProps).toBe(`Tag Tag--${color}`);
    },
  );

  it('should return small success subtle', () => {
    const props = {
      color: 'success',
      size: 'small',
      isSubtle: true,
    } as SpiritTagProps;
    const { result } = renderHook(() => useTagStyleProps(props));

    expect(result.current.classProps).toBe('Tag Tag--success Tag--small Tag--subtle');
  });

  it('should return disabled class', () => {
    const props = {
      color: 'neutral',
      isDisabled: true,
    } as SpiritTagProps;
    const { result } = renderHook(() => useTagStyleProps(props));

    expect(result.current.classProps).toBe('Tag Tag--neutral Tag--disabled');
  });
});
