import { renderHook } from '@testing-library/react';
import { TextColors } from '../../../constants';
import { type SpiritCaptionTextProps } from '../types';
import { useCaptionTextStyleProps } from '../useCaptionTextStyleProps';

describe('useCaptionTextStyleProps', () => {
  it('should return typography caption class', () => {
    const { result } = renderHook(() => useCaptionTextStyleProps({}));

    expect(result.current.classProps).toBe('typography-caption');
  });

  it.each(Object.values(TextColors))('should return %s color class', (textColor) => {
    const props = { textColor } as SpiritCaptionTextProps;
    const { result } = renderHook(() => useCaptionTextStyleProps(props));

    expect(result.current.classProps).toBe(`typography-caption text-${textColor}`);
  });
});
