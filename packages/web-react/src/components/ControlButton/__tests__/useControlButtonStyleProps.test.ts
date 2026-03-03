import { renderHook } from '@testing-library/react';
import { type SpiritControlButtonProps } from '../../../types';
import { useControlButtonStyleProps } from '../useControlButtonStyleProps';

describe('useControlButtonStyleProps', () => {
  it.each([
    // size, isDisabled, isSubtle, isSymmetrical, expectedClasses
    [
      'medium',
      false,
      false,
      false,
      'ControlButton ControlButton--medium dynamic-color-background-interactive accessibility-tap-target ControlButton--hasBackground dynamic-color-border',
    ],
    [
      'small',
      false,
      false,
      false,
      'ControlButton ControlButton--small dynamic-color-background-interactive accessibility-tap-target ControlButton--hasBackground dynamic-color-border',
    ],
    [
      'large',
      false,
      false,
      false,
      'ControlButton ControlButton--large dynamic-color-background-interactive accessibility-tap-target ControlButton--hasBackground dynamic-color-border',
    ],
    [
      'medium',
      true,
      false,
      false,
      'ControlButton ControlButton--medium dynamic-color-background-interactive accessibility-tap-target ControlButton--disabled ControlButton--hasBackground dynamic-color-border',
    ],
    [
      'medium',
      false,
      true,
      false,
      'ControlButton ControlButton--medium dynamic-color-background-interactive accessibility-tap-target',
    ],
    [
      'medium',
      false,
      false,
      true,
      'ControlButton ControlButton--medium dynamic-color-background-interactive accessibility-tap-target ControlButton--hasBackground dynamic-color-border ControlButton--symmetrical',
    ],
    [
      'medium',
      true,
      true,
      true,
      'ControlButton ControlButton--medium dynamic-color-background-interactive accessibility-tap-target ControlButton--disabled ControlButton--symmetrical',
    ],
  ])('should return classes', (size, isDisabled, isSubtle, isSymmetrical, expectedClasses) => {
    const props = { size, isDisabled, isSubtle, isSymmetrical } as SpiritControlButtonProps;
    const { result } = renderHook(() => useControlButtonStyleProps(props));

    expect(result.current.classProps).toBe(expectedClasses);
  });

  it('should return xsmall size class', () => {
    const props = {
      size: 'xsmall',
    } as SpiritControlButtonProps;
    const { result } = renderHook(() => useControlButtonStyleProps(props));

    expect(result.current.classProps).toContain('ControlButton--xsmall');
  });

  it('should return xlarge size class', () => {
    const props = {
      size: 'xlarge',
    } as SpiritControlButtonProps;
    const { result } = renderHook(() => useControlButtonStyleProps(props));

    expect(result.current.classProps).toContain('ControlButton--xlarge');
  });

  it('should return rest props', () => {
    const props = {
      size: 'medium',
      isDisabled: false,
      isSubtle: false,
      isSymmetrical: false,
      onClick: jest.fn(),
      'aria-label': 'Close',
      id: 'test-button',
    } as SpiritControlButtonProps;

    const { result } = renderHook(() => useControlButtonStyleProps(props));

    expect(result.current.props).toEqual({
      onClick: props.onClick,
      'aria-label': 'Close',
      id: 'test-button',
    });
  });

  it('should return responsive symmetrical classes for mobile only', () => {
    const props = {
      size: 'medium',
      isSymmetrical: { mobile: true },
    } as SpiritControlButtonProps;
    const { result } = renderHook(() => useControlButtonStyleProps(props));

    expect(result.current.classProps).toBe(
      'ControlButton ControlButton--medium dynamic-color-background-interactive accessibility-tap-target ControlButton--hasBackground dynamic-color-border ControlButton--symmetrical',
    );
  });

  it('should return responsive symmetrical classes for multiple breakpoints', () => {
    const props = {
      size: 'medium',
      isSymmetrical: { mobile: true, tablet: false, desktop: true },
    } as SpiritControlButtonProps;
    const { result } = renderHook(() => useControlButtonStyleProps(props));

    expect(result.current.classProps).toBe(
      'ControlButton ControlButton--medium dynamic-color-background-interactive accessibility-tap-target ControlButton--hasBackground dynamic-color-border ControlButton--symmetrical ControlButton--tablet--asymmetrical ControlButton--desktop--symmetrical',
    );
  });

  it('should return responsive symmetrical classes for tablet and desktop only', () => {
    const props = {
      size: 'medium',
      isSymmetrical: { tablet: true, desktop: true },
    } as SpiritControlButtonProps;
    const { result } = renderHook(() => useControlButtonStyleProps(props));

    expect(result.current.classProps).toBe(
      'ControlButton ControlButton--medium dynamic-color-background-interactive accessibility-tap-target ControlButton--hasBackground dynamic-color-border ControlButton--tablet--symmetrical ControlButton--desktop--symmetrical',
    );
  });

  it('should return no a/symmetrical classes when all breakpoints are false', () => {
    const props = {
      size: 'medium',
      isSymmetrical: { mobile: false, tablet: false, desktop: false },
    } as SpiritControlButtonProps;
    const { result } = renderHook(() => useControlButtonStyleProps(props));

    expect(result.current.classProps).toBe(
      'ControlButton ControlButton--medium dynamic-color-background-interactive accessibility-tap-target ControlButton--hasBackground dynamic-color-border',
    );
  });
});
