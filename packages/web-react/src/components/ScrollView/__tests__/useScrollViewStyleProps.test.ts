import { renderHook } from '@testing-library/react';
import { useScrollViewStyleProps } from '../useScrollViewStyleProps';

describe('useScrollViewStyleProps', () => {
  it('should return defaults', () => {
    const { result } = renderHook(() =>
      useScrollViewStyleProps({
        direction: 'vertical',
        isScrollbarDisabled: true,
        isScrolledAtEnd: true,
        isScrolledAtStart: true,
        overflowDecorators: 'shadows',
      }),
    );

    expect(result.current.classProps).toBeDefined();
    expect(result.current.classProps.root).toBe(
      'ScrollView ScrollView--vertical ScrollView--scrollbarDisabled is-scrolled-at-end is-scrolled-at-start',
    );
    expect(result.current.classProps.viewport).toBe('ScrollView__viewport');
    expect(result.current.classProps.content).toBe('ScrollView__content');
    expect(result.current.classProps.overflowDecorators).toBe(
      'ScrollView__overflowDecorators ScrollView__overflowDecorators--shadows',
    );
    expect(result.current.classProps.controls).toBe('ScrollView__controls');
  });

  it('should return horizontal both variants of overflow decorators', () => {
    const { result } = renderHook(() =>
      useScrollViewStyleProps({
        direction: 'horizontal',
        isScrollbarDisabled: false,
        isScrolledAtEnd: false,
        isScrolledAtStart: false,
        overflowDecorators: 'both',
      }),
    );

    expect(result.current.classProps).toBeDefined();
    expect(result.current.classProps.root).toBe('ScrollView ScrollView--horizontal');
    expect(result.current.classProps.viewport).toBe('ScrollView__viewport');
    expect(result.current.classProps.content).toBe('ScrollView__content');
    expect(result.current.classProps.overflowDecorators).toBe(
      'ScrollView__overflowDecorators ScrollView__overflowDecorators--shadows ScrollView__overflowDecorators--borders',
    );
  });
});
