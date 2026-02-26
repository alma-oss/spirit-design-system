import { renderHook } from '@testing-library/react';
import { type SpiritDropdownProps } from '../../../types';
import { useDropdownStyleProps } from '../useDropdownStyleProps';

describe('useDropdownStyleProps', () => {
  it('should return defaults', () => {
    const { result } = renderHook(() => useDropdownStyleProps());

    expect(result.current.classProps.root).toBe('Dropdown');
    expect(result.current.classProps.popover).toBe('DropdownPopover');
  });

  it('should return placement class when placement is provided', () => {
    const { result } = renderHook(() => useDropdownStyleProps({ placement: 'bottom-start' }));

    expect(result.current.classProps.popover).toContain('placement-bottom-start');
  });

  it('should render as open', () => {
    const props = {
      isOpen: true,
    };
    const { result } = renderHook(() => useDropdownStyleProps(props));

    expect(result.current.classProps.popover).toBe('DropdownPopover is-open');
    expect(result.current.classProps.trigger).toBe('is-expanded');
  });

  it('should transfer additional props', () => {
    const props = {
      isOpen: false,
      transferProp: 'test',
    };
    const { result } = renderHook(() => useDropdownStyleProps(props));

    expect(result.current.classProps.popover).toBe('DropdownPopover');
    expect(result.current.props).toEqual({ transferProp: 'test' });
  });

  it.each([
    // alignmentX, alignmentY, expectedClasses
    [undefined, undefined, 'Dropdown'],
    ['left', undefined, 'Dropdown Dropdown--alignmentXLeft'],
    ['left', 'top', 'Dropdown Dropdown--alignmentXLeft Dropdown--alignmentYTop'],
    [
      { mobile: 'left', tablet: 'center', desktop: 'right' },
      undefined,
      'Dropdown Dropdown--alignmentXLeft Dropdown--tablet--alignmentXCenter Dropdown--desktop--alignmentXRight',
    ],
    [
      { mobile: 'left', tablet: 'center', desktop: 'right' },
      { mobile: 'top', tablet: 'center', desktop: 'bottom' },
      'Dropdown Dropdown--alignmentXLeft Dropdown--tablet--alignmentXCenter Dropdown--desktop--alignmentXRight Dropdown--alignmentYTop Dropdown--tablet--alignmentYCenter Dropdown--desktop--alignmentYBottom',
    ],
    [
      'left',
      { mobile: 'top', tablet: 'center', desktop: 'bottom' },
      'Dropdown Dropdown--alignmentXLeft Dropdown--alignmentYTop Dropdown--tablet--alignmentYCenter Dropdown--desktop--alignmentYBottom',
    ],
  ])('should return alignment CSS classes', (alignmentX, alignmentY, expectedClasses) => {
    const props: SpiritDropdownProps = { alignmentX, alignmentY } as SpiritDropdownProps;
    const { result } = renderHook(() => useDropdownStyleProps(props));

    expect(result.current.classProps.root).toBe(expectedClasses);
  });
});
