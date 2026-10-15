import { renderHook } from '@testing-library/react';
import { TextColors } from '../../../constants';
import { type SpiritEyebrowTextProps } from '../types';
import { useEyebrowTextStyleProps } from '../useEyebrowTextStyleProps';

describe('useEyebrowTextStyleProps', () => {
  it('should return the eyebrow typography class without a color utility', () => {
    const { result } = renderHook(() => useEyebrowTextStyleProps({}));

    expect(result.current.classProps).toBe('typography-eyebrow');
  });

  it.each(Object.values(TextColors))('should return %s color class', (textColor) => {
    const props = { textColor } as SpiritEyebrowTextProps;
    const { result } = renderHook(() => useEyebrowTextStyleProps(props));

    expect(result.current.classProps).toBe(`typography-eyebrow text-${textColor}`);
  });
});
