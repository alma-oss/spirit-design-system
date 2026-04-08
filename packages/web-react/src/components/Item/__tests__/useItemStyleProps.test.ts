import { renderHook } from '@testing-library/react';
import { type SpiritItemProps } from '../../../types';
import { useItemStyleProps } from '../useItemStyleProps';

describe('useItemStyleProps', () => {
  it('should return defaults', () => {
    const props = {};
    const { result } = renderHook(() => useItemStyleProps(props));

    expect(result.current.classProps).toEqual({
      helperText: 'Item__helperText',
      icon: {
        root: 'Item__icon',
        start: 'Item__icon--start',
        end: 'Item__icon--end',
      },
      label: 'Item__label',
      root: 'Item',
    });
  });

  it('should return selected item with background when selectionDecorator is both', () => {
    const props = { isSelected: true, selectionDecorator: 'both' as const } as SpiritItemProps;
    const { result } = renderHook(() => useItemStyleProps(props));

    expect(result.current.classProps.root).toBe('Item Item--selected');
  });

  it('should return disabled item', () => {
    const props = { isDisabled: true } as SpiritItemProps;
    const { result } = renderHook(() => useItemStyleProps(props));

    expect(result.current.classProps.root).toBe('Item Item--disabled');
  });

  it('should not pass selectionDecorator to returned props', () => {
    const props = { selectionDecorator: 'background' as const } as SpiritItemProps;
    const { result } = renderHook(() => useItemStyleProps(props));

    expect(result.current.props).not.toHaveProperty('selectionDecorator');
  });

  it('should apply selected class only when selectionDecorator is background or both', () => {
    const { result: iconResult } = renderHook(() =>
      useItemStyleProps({ isSelected: true, selectionDecorator: 'icon' } as SpiritItemProps),
    );

    expect(iconResult.current.classProps.root).toBe('Item');

    const { result: bothResult } = renderHook(() =>
      useItemStyleProps({ isSelected: true, selectionDecorator: 'both' } as SpiritItemProps),
    );

    expect(bothResult.current.classProps.root).toBe('Item Item--selected');
  });
});
