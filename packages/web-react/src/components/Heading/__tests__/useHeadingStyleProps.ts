import { renderHook } from '@testing-library/react';
import { Emphasis, FontWeight, SizesExtended, TextColors } from '../../../constants';
import { type HeadingProps } from '../../../types';
import { useHeadingStyleProps } from '../useHeadingStyleProps';
import headingSizeDataProvider from './headingSizeDataProvider';

describe('useHeadingStyleProps', () => {
  it.each(headingSizeDataProvider)('should return typography heading class', (size, fontWeight, expectedClassName) => {
    const props = { fontWeight, size } as HeadingProps;
    const { result } = renderHook(() => useHeadingStyleProps(props));

    expect(result.current.classProps).toBe(expectedClassName);
  });

  it.each(Object.values(TextColors))('should return %s color class', (textColor) => {
    const fontWeight = FontWeight.BOLD;
    const size = SizesExtended.MEDIUM;
    const props = { fontWeight, size, textColor } as HeadingProps;
    const { result } = renderHook(() => useHeadingStyleProps(props));

    expect(result.current.classProps).toBe(`typography-heading-${size}-${fontWeight} text-${textColor}`);
  });

  it('should apply text-italic class together with bold font weight', () => {
    const props = { fontWeight: FontWeight.BOLD, isItalic: true, size: SizesExtended.MEDIUM } as HeadingProps;
    const { result } = renderHook(() => useHeadingStyleProps(props));

    expect(result.current.classProps).toBe('typography-heading-medium-bold text-italic');
  });

  it('should use the default font weight when no weight prop is set', () => {
    const props = { size: SizesExtended.MEDIUM } as HeadingProps;
    const { result } = renderHook(() => useHeadingStyleProps(props));

    expect(result.current.classProps).toBe('typography-heading-medium-bold');
  });

  it('should not pass typography props to the rest props', () => {
    const props = {
      emphasis: Emphasis.REGULAR,
      fontWeight: FontWeight.BOLD,
      isItalic: true,
      size: SizesExtended.MEDIUM,
    } as HeadingProps;
    const { result } = renderHook(() => useHeadingStyleProps(props));

    expect(result.current.props).not.toHaveProperty('emphasis');
    expect(result.current.props).not.toHaveProperty('fontWeight');
    expect(result.current.props).not.toHaveProperty('isItalic');
  });
});
