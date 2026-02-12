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
    ['neutral', 'bg-neutral-basic text-neutral-subtle'],
    ['success', 'bg-emotion-success-basic text-emotion-success-subtle'],
    ['informative', 'bg-emotion-informative-basic text-emotion-informative-subtle'],
    ['warning', 'bg-emotion-warning-basic text-emotion-warning-subtle'],
    ['danger', 'bg-emotion-danger-basic text-emotion-danger-subtle'],
    ['selected', 'bg-selected-basic text-selected-subtle'],
  ])('should return color class %s', (color, colorClasses) => {
    const props = { color } as SpiritTagProps;
    const { result } = renderHook(() => useTagStyleProps(props));

    expect(result.current.classProps).toBe(`Tag Tag--${color} ${colorClasses}`);
  });

  it('should return small success subtle', () => {
    const props = {
      color: 'success',
      size: 'small',
      isSubtle: true,
    } as SpiritTagProps;
    const { result } = renderHook(() => useTagStyleProps(props));

    expect(result.current.classProps).toBe(
      'Tag Tag--success Tag--small Tag--subtle bg-emotion-success-subtle text-emotion-success-basic',
    );
  });

  it('should return disabled class', () => {
    const props = {
      color: 'neutral',
      isDisabled: true,
    } as SpiritTagProps;
    const { result } = renderHook(() => useTagStyleProps(props));

    expect(result.current.classProps).toBe('Tag Tag--neutral Tag--disabled bg-neutral-basic text-neutral-subtle');
  });
});
