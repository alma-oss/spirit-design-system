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

  it.each([
    // spacing, expectedStyle
    [undefined, {}],
    ['space-100', { '--control-button-spacing': 'var(--spirit-space-100)' }],
    [
      { mobile: 'space-100', tablet: 'space-200' },
      {
        '--control-button-spacing': 'var(--spirit-space-100)',
        '--control-button-spacing-tablet': 'var(--spirit-space-200)',
      },
    ],
    [
      { mobile: 'space-100', tablet: 'space-200', desktop: 'space-400' },
      {
        '--control-button-spacing': 'var(--spirit-space-100)',
        '--control-button-spacing-tablet': 'var(--spirit-space-200)',
        '--control-button-spacing-desktop': 'var(--spirit-space-400)',
      },
    ],
  ])('should return spacing CSS properties', (spacing, expectedStyle) => {
    const props = { size: 'medium', spacing } as SpiritControlButtonProps;
    const { result } = renderHook(() => useControlButtonStyleProps(props));

    expect(result.current.styleProps).toEqual(expectedStyle);
  });
});
