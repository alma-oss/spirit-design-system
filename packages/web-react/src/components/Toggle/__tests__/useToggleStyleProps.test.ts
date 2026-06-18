import { renderHook } from '@testing-library/react';
import { type SpiritToggleProps } from '../../../types';
import { useToggleStyleProps } from '../useToggleStyleProps';

describe('useToggleStyleProps', () => {
  it('should return defaults', () => {
    const props = { id: 'toggle', label: 'text' };
    const { result } = renderHook(() => useToggleStyleProps(props));

    expect(result.current.classProps).toEqual({
      input: 'Toggle',
    });
    expect(result.current.direction).toBe('horizontal-reversed');
    expect(result.current.alignmentX).toBe('space-between');
  });

  it('should return input with indicators', () => {
    const props = { id: 'toggle', label: 'text', hasIndicators: true } as SpiritToggleProps;
    const { result } = renderHook(() => useToggleStyleProps(props));

    expect(result.current.classProps.input).toBe('Toggle Toggle--indicators');
  });

  it('should return field with inputPosition start', () => {
    const props = { inputPosition: 'start' } as SpiritToggleProps;
    const { result } = renderHook(() => useToggleStyleProps(props));

    expect(result.current.direction).toBe('horizontal');
    expect(result.current.alignmentX).toBe('stretch');
  });

  it('should return field with inputPosition end', () => {
    const props = { inputPosition: 'end' } as SpiritToggleProps;
    const { result } = renderHook(() => useToggleStyleProps(props));

    expect(result.current.direction).toBe('horizontal-reversed');
    expect(result.current.alignmentX).toBe('space-between');
  });

  it('should return field with responsive inputPosition', () => {
    const props = { inputPosition: { mobile: 'end', tablet: 'start', desktop: 'end' } } as SpiritToggleProps;
    const { result } = renderHook(() => useToggleStyleProps(props));

    expect(result.current.direction).toEqual({
      mobile: 'horizontal-reversed',
      tablet: 'horizontal',
      desktop: 'horizontal-reversed',
    });
    expect(result.current.alignmentX).toEqual({
      mobile: 'space-between',
      tablet: 'stretch',
      desktop: 'space-between',
    });
  });
});
