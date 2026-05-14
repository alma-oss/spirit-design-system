import { renderHook } from '@testing-library/react';
import { type SpiritTagProps } from '../../../types';
import { useTagStyleProps } from '../useTagStyleProps';

describe('useTagStyleProps', () => {
  it('should return defaults', () => {
    const props = {};
    const { result } = renderHook(() => useTagStyleProps(props));

    expect(result.current.classProps).toBe('Tag');
  });

  it.each([
    ['neutral', 'color-scheme-on-neutral-basic'],
    ['success', 'color-scheme-on-emotion-success-basic'],
    ['informative', 'color-scheme-on-emotion-informative-basic'],
    ['warning', 'color-scheme-on-emotion-warning-basic'],
    ['danger', 'color-scheme-on-emotion-danger-basic'],
    ['selected', 'color-scheme-on-selected-basic'],
  ])('should return color classes for %s', (color, colorSchemeClass) => {
    const props = { color } as SpiritTagProps;
    const { result } = renderHook(() => useTagStyleProps(props));

    expect(result.current.classProps).toBe(`Tag Tag--${color} ${colorSchemeClass}`);
  });

  it('should return small success subtle', () => {
    const props = {
      color: 'success',
      size: 'small',
      isSubtle: true,
    } as SpiritTagProps;
    const { result } = renderHook(() => useTagStyleProps(props));

    expect(result.current.classProps).toBe(
      'Tag Tag--success color-scheme-on-emotion-success-subtle Tag--small Tag--subtle',
    );
  });

  it('should return disabled class without color scheme', () => {
    const props = {
      color: 'neutral',
      isDisabled: true,
    } as SpiritTagProps;
    const { result } = renderHook(() => useTagStyleProps(props));

    expect(result.current.classProps).toBe('Tag Tag--neutral Tag--disabled');
  });
});
