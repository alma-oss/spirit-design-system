import { renderHook } from '@testing-library/react';
import { type SpiritItemProps } from '../../../types';
import { useItemStyleProps } from '../useItemStyleProps';

describe('useItemStyleProps', () => {
  it('should return defaults', () => {
    const props = {};
    const { result } = renderHook(() => useItemStyleProps(props));

    expect(result.current.classProps).toEqual({
      content: 'Item__content',
      slot: 'Item__slot',
      root: 'Item',
    });
  });

  it('should return selected item', () => {
    const props = { isSelected: true } as SpiritItemProps;
    const { result } = renderHook(() => useItemStyleProps(props));

    expect(result.current.classProps.root).toBe('Item color-scheme-on-selected-subtle');
  });

  it('should return item with non-default vertical alignment', () => {
    const props = { alignmentY: 'bottom' } as SpiritItemProps;
    const { result } = renderHook(() => useItemStyleProps(props));

    expect(result.current.classProps.root).toBe('Item Item--alignmentYBottom');
  });

  it('should return item with responsive vertical alignment', () => {
    const props = { alignmentY: { mobile: 'top', tablet: 'center', desktop: 'bottom' } } as SpiritItemProps;
    const { result } = renderHook(() => useItemStyleProps(props));

    expect(result.current.classProps.root).toBe(
      'Item Item--alignmentYTop Item--tablet--alignmentYCenter Item--desktop--alignmentYBottom',
    );
  });

  it('should return disabled item', () => {
    const props = { isDisabled: true } as SpiritItemProps;
    const { result } = renderHook(() => useItemStyleProps(props));

    expect(result.current.classProps.root).toBe('Item disabled');
  });

  it('should return disabled selected item', () => {
    const props = { isDisabled: true, isSelected: true } as SpiritItemProps;
    const { result } = renderHook(() => useItemStyleProps(props));

    expect(result.current.classProps.root).toBe('Item disabled color-scheme-on-selected-subtle');
  });

  it('should not pass style props to returned props', () => {
    const props = { alignmentY: 'top', isDisabled: true, isSelected: true, id: 'item' } as SpiritItemProps;
    const { result } = renderHook(() => useItemStyleProps(props));

    expect(result.current.props).toEqual({ id: 'item' });
  });
});
