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
    ['neutral', 'border-neutral-basic bg-neutral-basic text-neutral-subtle'],
    ['success', 'border-emotion-success-basic bg-emotion-success-basic text-emotion-success-subtle'],
    ['informative', 'border-emotion-informative-basic bg-emotion-informative-basic text-emotion-informative-subtle'],
    ['warning', 'border-emotion-warning-basic bg-emotion-warning-basic text-emotion-warning-subtle'],
    ['danger', 'border-emotion-danger-basic bg-emotion-danger-basic text-emotion-danger-subtle'],
    ['selected', 'border-selected-basic bg-selected-basic text-selected-subtle'],
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
      'Tag Tag--success Tag--small Tag--subtle border-emotion-success-subtle bg-emotion-success-subtle text-emotion-success-basic',
    );
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
