import { renderHook } from '@testing-library/react';
import { Emphasis, SizesExtended, TextColors } from '../../../constants';
import { type HeadingProps } from '../../../types';
import { useHeadingStyleProps } from '../useHeadingStyleProps';
import headingSizeDataProvider from './headingSizeDataProvider';

describe('useHeadingStyleProps', () => {
  it.each(headingSizeDataProvider)('should return typography heading class', (size, emphasis, expectedClassName) => {
    const props = { emphasis, size } as HeadingProps;
    const { result } = renderHook(() => useHeadingStyleProps(props));

    expect(result.current.classProps).toBe(expectedClassName);
  });

  it.each(Object.values(TextColors))('should return %s color class', (textColor) => {
    const emphasis = Emphasis.BOLD;
    const size = SizesExtended.MEDIUM;
    const props = { emphasis, size, textColor } as HeadingProps;
    const { result } = renderHook(() => useHeadingStyleProps(props));

    expect(result.current.classProps).toBe(`typography-heading-${size}-${emphasis} text-${textColor}`);
  });
});
