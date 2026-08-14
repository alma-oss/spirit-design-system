import { renderHook } from '@testing-library/react';
import { Emphasis, FontWeight, SizesExtended, TextColors } from '../../../constants';
import { type SpiritTextProps } from '../../../types';
import { useTextStyleProps } from '../useTextStyleProps';
import textPropsDataProvider from './textPropsDataProvider';

describe('useTextStyleProps', () => {
  it.each(textPropsDataProvider)('should return typography class', (size, fontWeight, expectedClassName) => {
    const props = { size, fontWeight } as SpiritTextProps;
    const { result } = renderHook(() => useTextStyleProps(props));

    expect(result.current.classProps).toBe(expectedClassName);
  });

  it.each(Object.values(TextColors))('should return %s color class', (textColor) => {
    const fontWeight = FontWeight.REGULAR;
    const size = SizesExtended.MEDIUM;
    const props = { fontWeight, size, textColor } as SpiritTextProps;
    const { result } = renderHook(() => useTextStyleProps(props));

    expect(result.current.classProps).toBe(`typography-body-${size}-${fontWeight} text-${textColor}`);
  });

  it('should apply text-italic class together with bold font weight', () => {
    const props = { fontWeight: FontWeight.BOLD, isItalic: true, size: SizesExtended.MEDIUM } as SpiritTextProps;
    const { result } = renderHook(() => useTextStyleProps(props));

    expect(result.current.classProps).toBe('typography-body-medium-bold text-italic');
  });

  it('should use the default font weight when no weight prop is set', () => {
    const props = { size: SizesExtended.MEDIUM } as SpiritTextProps;
    const { result } = renderHook(() => useTextStyleProps(props));

    expect(result.current.classProps).toBe('typography-body-medium-regular');
  });

  it('should not pass typography props to the rest props', () => {
    const props = {
      emphasis: Emphasis.REGULAR,
      fontWeight: FontWeight.BOLD,
      isItalic: true,
      size: SizesExtended.MEDIUM,
    } as SpiritTextProps;
    const { result } = renderHook(() => useTextStyleProps(props));

    expect(result.current.props).not.toHaveProperty('emphasis');
    expect(result.current.props).not.toHaveProperty('fontWeight');
    expect(result.current.props).not.toHaveProperty('isItalic');
  });
});
