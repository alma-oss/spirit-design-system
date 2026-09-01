import { renderHook } from '@testing-library/react';
import { Sizes, TextColors } from '../../../constants';
import { type SpiritDisplayHeadingProps } from '../types';
import { useDisplayHeadingStyleProps } from '../useDisplayHeadingStyleProps';

describe('useDisplayHeadingStyleProps', () => {
  it.each(Object.values(Sizes))('should return typography class for size %s', (size) => {
    const props = { size } as SpiritDisplayHeadingProps;
    const { result } = renderHook(() => useDisplayHeadingStyleProps(props));

    expect(result.current.classProps).toBe(`typography-display-${size}`);
  });

  it('should default to medium size', () => {
    const { result } = renderHook(() => useDisplayHeadingStyleProps({}));

    expect(result.current.classProps).toBe('typography-display-medium');
  });

  it.each(Object.values(TextColors))('should return %s color class', (textColor) => {
    const props = { size: Sizes.MEDIUM, textColor } as SpiritDisplayHeadingProps;
    const { result } = renderHook(() => useDisplayHeadingStyleProps(props));

    expect(result.current.classProps).toBe(`typography-display-medium text-${textColor}`);
  });

  it('should apply text-italic class', () => {
    const props = { isItalic: true, size: Sizes.MEDIUM } as SpiritDisplayHeadingProps;
    const { result } = renderHook(() => useDisplayHeadingStyleProps(props));

    expect(result.current.classProps).toBe('typography-display-medium text-italic');
  });

  it('should not pass typography props to the rest props', () => {
    const props = {
      isItalic: true,
      size: Sizes.MEDIUM,
      textColor: TextColors.PRIMARY,
    } as SpiritDisplayHeadingProps;
    const { result } = renderHook(() => useDisplayHeadingStyleProps(props));

    expect(result.current.props).not.toHaveProperty('isItalic');
    expect(result.current.props).not.toHaveProperty('size');
    expect(result.current.props).not.toHaveProperty('textColor');
  });
});
