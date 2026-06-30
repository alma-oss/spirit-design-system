import { renderHook } from '@testing-library/react';
import { Sizes, TextColors } from '../../../constants';
import { type SpiritActionTextProps } from '../types';
import { useActionTextStyleProps } from '../useActionTextStyleProps';

describe('useActionTextStyleProps', () => {
  it.each(Object.values(Sizes))('should return typography class for size %s', (size) => {
    const props = { size } as SpiritActionTextProps;
    const { result } = renderHook(() => useActionTextStyleProps(props));

    expect(result.current.classProps).toBe(`typography-action-${size}`);
  });

  it('should default to medium size', () => {
    const { result } = renderHook(() => useActionTextStyleProps({}));

    expect(result.current.classProps).toBe('typography-action-medium');
  });

  it.each(Object.values(TextColors))('should return %s color class', (textColor) => {
    const props = { size: Sizes.MEDIUM, textColor } as SpiritActionTextProps;
    const { result } = renderHook(() => useActionTextStyleProps(props));

    expect(result.current.classProps).toBe(`typography-action-medium text-${textColor}`);
  });
});
