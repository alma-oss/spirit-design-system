import { renderHook } from '@testing-library/react';
import { type SpiritButtonProps } from '../../../types';
import { useButtonStyleProps } from '../useButtonStyleProps';

describe('useButtonStyleProps', () => {
  it.each([
    // color, size, isBlock, isDisabled, isLoading, isSymmetrical, expectedClasses
    ['primary', 'medium', false, false, false, false, 'Button Button--primary Button--medium'],
    ['secondary', 'medium', false, false, false, false, 'Button Button--secondary Button--medium'],
    ['tertiary', 'medium', false, false, false, false, 'Button Button--tertiary Button--medium'],
    ['plain', 'medium', false, false, false, false, 'Button Button--plain Button--medium'],
    ['danger', 'medium', false, false, false, false, 'Button Button--danger Button--medium'],
    ['primary', 'medium', true, false, false, false, 'Button Button--primary Button--medium Button--block'],
    ['primary', 'medium', false, true, false, false, 'Button Button--primary Button--medium Button--disabled'],
    [
      'primary',
      'medium',
      false,
      false,
      true,
      false,
      'Button Button--primary Button--medium Button--disabled Button--loading',
    ],
    ['primary', 'medium', false, false, false, true, 'Button Button--primary Button--medium Button--symmetrical'],
  ])('should return classes', (color, size, isBlock, isDisabled, isLoading, isSymmetrical, expectedClasses) => {
    const props = { color, size, isBlock, isDisabled, isLoading, isSymmetrical } as SpiritButtonProps;
    const { result } = renderHook(() => useButtonStyleProps(props));

    expect(result.current.classProps).toBe(expectedClasses);
  });

  it('should warn when using unsupported sizes on body', () => {
    process.env.NODE_ENV = 'development';

    const consoleWarnMock = jest.spyOn(global.console, 'warn').mockImplementation();

    const props = { color: 'primary', size: 'medium', isBlock: true, isSymmetrical: true } as SpiritButtonProps;
    renderHook(() => useButtonStyleProps(props));

    expect(consoleWarnMock).toHaveBeenCalledWith('Warning: isBlock and isSymmetrical props are mutually exclusive');

    consoleWarnMock.mockRestore();
  });

  it('should return responsive symmetrical classes for mobile only', () => {
    const props = {
      color: 'primary',
      size: 'medium',
      isSymmetrical: { mobile: true },
    } as SpiritButtonProps;
    const { result } = renderHook(() => useButtonStyleProps(props));

    expect(result.current.classProps).toBe('Button Button--primary Button--medium Button--symmetrical');
  });

  it('should return responsive symmetrical classes for multiple breakpoints', () => {
    const props = {
      color: 'primary',
      size: 'medium',
      isSymmetrical: { mobile: true, tablet: false, desktop: true },
    } as SpiritButtonProps;
    const { result } = renderHook(() => useButtonStyleProps(props));

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
    const { result } = renderHook(() => useButtonStyleProps(props));

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
    const { result } = renderHook(() => useButtonStyleProps(props));

    expect(result.current.classProps).toBe('Button Button--primary Button--medium');
  });

  it('should warn when isBlock conflicts with responsive isSymmetrical', () => {
    process.env.NODE_ENV = 'development';

    const consoleWarnMock = jest.spyOn(global.console, 'warn').mockImplementation();

    const props = {
      color: 'primary',
      size: 'medium',
      isBlock: true,
      isSymmetrical: { mobile: true, tablet: false },
    } as SpiritButtonProps;
    renderHook(() => useButtonStyleProps(props));

    expect(consoleWarnMock).toHaveBeenCalledWith('Warning: isBlock and isSymmetrical props are mutually exclusive');

    consoleWarnMock.mockRestore();
  });

  it.each([
    // spacing, expectedStyle
    [undefined, {}],
    ['space-100', { '--button-spacing': 'var(--spirit-space-100)' }],
    [
      { mobile: 'space-100', tablet: 'space-200' },
      {
        '--button-spacing': 'var(--spirit-space-100)',
        '--button-spacing-tablet': 'var(--spirit-space-200)',
      },
    ],
    [
      { mobile: 'space-100', tablet: 'space-200', desktop: 'space-400' },
      {
        '--button-spacing': 'var(--spirit-space-100)',
        '--button-spacing-tablet': 'var(--spirit-space-200)',
        '--button-spacing-desktop': 'var(--spirit-space-400)',
      },
    ],
  ])('should return spacing CSS properties', (spacing, expectedStyle) => {
    const props = { color: 'primary', size: 'medium', spacing } as SpiritButtonProps;
    const { result } = renderHook(() => useButtonStyleProps(props));

    expect(result.current.styleProps).toEqual(expectedStyle);
  });
});
