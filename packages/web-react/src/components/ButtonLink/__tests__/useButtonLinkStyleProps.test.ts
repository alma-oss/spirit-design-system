import { renderHook } from '@testing-library/react';
import { type SpiritButtonProps } from '../../../types';
import { useButtonLinkStyleProps } from '../useButtonLinkStyleProps';

describe('useButtonLinkStyleProps', () => {
  it.each([
    // color, size, isDisabled, isLoading, isSymmetrical, expectedClasses
    ['primary', 'medium', false, false, false, 'Button Button--primary Button--medium'],
    ['secondary', 'medium', false, false, false, 'Button Button--secondary Button--medium'],
    ['tertiary', 'medium', false, false, false, 'Button Button--tertiary Button--medium'],
    ['plain', 'medium', false, false, false, 'Button Button--plain Button--medium'],
    ['danger', 'medium', false, false, false, 'Button Button--danger Button--medium'],
    ['primary', 'medium', true, false, false, 'Button Button--primary Button--medium Button--disabled'],
    ['primary', 'medium', false, true, false, 'Button Button--primary Button--medium Button--disabled Button--loading'],
    ['primary', 'medium', false, false, true, 'Button Button--primary Button--medium Button--symmetrical'],
  ])('should return classes', (color, size, isDisabled, isLoading, isSymmetrical, expectedClasses) => {
    const props = { color, size, isDisabled, isLoading, isSymmetrical } as SpiritButtonProps;
    const { result } = renderHook(() => useButtonLinkStyleProps(props));

    expect(result.current.classProps).toBe(expectedClasses);
  });

  it('should return responsive symmetrical classes for mobile only', () => {
    const props = {
      color: 'primary',
      size: 'medium',
      isSymmetrical: { mobile: true },
    } as SpiritButtonProps;
    const { result } = renderHook(() => useButtonLinkStyleProps(props));

    expect(result.current.classProps).toBe('Button Button--primary Button--medium Button--symmetrical');
  });

  it('should return responsive symmetrical classes for multiple breakpoints', () => {
    const props = {
      color: 'primary',
      size: 'medium',
      isSymmetrical: { mobile: true, tablet: false, desktop: true },
    } as SpiritButtonProps;
    const { result } = renderHook(() => useButtonLinkStyleProps(props));

    expect(result.current.classProps).toBe(
      'Button Button--primary Button--medium Button--symmetrical Button--tablet--asymmetrical Button--desktop--symmetrical',
    );
  });

  it('should return responsive symmetrical classes for tablet and desktop only', () => {
    const props = {
      color: 'primary',
      size: 'medium',
      isSymmetrical: { tablet: true, desktop: true },
    } as SpiritButtonProps;
    const { result } = renderHook(() => useButtonLinkStyleProps(props));

    expect(result.current.classProps).toBe(
      'Button Button--primary Button--medium Button--tablet--symmetrical Button--desktop--symmetrical',
    );
  });

  it('should return no a/symmetrical classes when all breakpoints are false', () => {
    const props = {
      color: 'primary',
      size: 'medium',
      isSymmetrical: { mobile: false, tablet: false, desktop: false },
    } as SpiritButtonProps;
    const { result } = renderHook(() => useButtonLinkStyleProps(props));

    expect(result.current.classProps).toBe('Button Button--primary Button--medium');
  });
});
