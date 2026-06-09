import { renderHook } from '@testing-library/react';
import { type IconColorType, type SpiritIconProps } from '../../../types';
import { useIconStyleProps } from '../useIconStyleProps';
import { iconColors } from '../utils';

describe('useIconStyleProps', () => {
  it('should return responsive sizes', () => {
    const props = { boxSize: { mobile: 20, tablet: 40, desktop: 60 }, name: 'add' } as SpiritIconProps;
    const { result } = renderHook(() => useIconStyleProps(props));

    expect(result.current.iconStyleProps).toEqual({
      '--spirit-icon-size': '1.25rem',
      '--spirit-icon-size-tablet': '2.5rem',
      '--spirit-icon-size-desktop': '3.75rem',
    });
  });

  it('should return only tablet', () => {
    const props = { boxSize: { tablet: 40 }, name: 'add' } as SpiritIconProps;
    const { result } = renderHook(() => useIconStyleProps(props));

    expect(result.current.iconStyleProps).toEqual({
      '--spirit-icon-size-tablet': '2.5rem',
    });
  });

  it('should return icon size style when boxSize is a number', () => {
    const props = { boxSize: 20, name: 'add' } as SpiritIconProps;
    const { result } = renderHook(() => useIconStyleProps(props));

    expect(result.current.iconStyleProps).toEqual({
      '--spirit-icon-size': '1.25rem',
    });
  });

  it('should return icon size style with composition fallback', () => {
    const props = { boxSize: 20, name: 'add' } as SpiritIconProps;
    const { result } = renderHook(() => useIconStyleProps(props, true));

    expect(result.current.iconStyleProps).toEqual({
      '--spirit-icon-size': 'var(--spirit-icon-composition-size, 1.25rem)',
    });
  });

  it('should return responsive sizes with composition fallback on mobile size only', () => {
    const props = { boxSize: { mobile: 20, tablet: 40, desktop: 60 }, name: 'add' } as SpiritIconProps;
    const { result } = renderHook(() => useIconStyleProps(props, true));

    expect(result.current.iconStyleProps).toEqual({
      '--spirit-icon-size': 'var(--spirit-icon-composition-size, 1.25rem)',
      '--spirit-icon-size-tablet': '2.5rem',
      '--spirit-icon-size-desktop': '3.75rem',
    });
  });

  it('should keep undefined responsive size entries', () => {
    const props = { boxSize: { mobile: undefined, tablet: 40 }, name: 'add' } as SpiritIconProps;
    const { result } = renderHook(() => useIconStyleProps(props, true));

    expect(result.current.iconStyleProps).toEqual({
      '--spirit-icon-size': undefined,
      '--spirit-icon-size-tablet': '2.5rem',
    });
  });

  it('should return empty style props when boxSize is not defined', () => {
    const props = { name: 'add' } as SpiritIconProps;
    const { result } = renderHook(() => useIconStyleProps(props));

    expect(result.current.iconStyleProps).toEqual({});
  });

  it('should omit style props and name from rest props', () => {
    const props = {
      'aria-hidden': 'true',
      boxSize: 20,
      color: 'primary',
      focusable: 'false',
      name: 'add',
    } as SpiritIconProps;
    const { result } = renderHook(() => useIconStyleProps(props));

    expect(result.current.props).toEqual({
      'aria-hidden': 'true',
      focusable: 'false',
    });
  });

  it('should have color classname when color is defined for regular icon', () => {
    const props: SpiritIconProps = {
      name: 'file',
      color: 'primary',
    };
    const { result } = renderHook(() => useIconStyleProps(props));

    expect(result.current.classProps).toContain('Icon--primary');
  });

  it('should have selected color classname when selected color is defined for regular icon', () => {
    const props: SpiritIconProps = {
      name: 'file',
      color: 'selected',
    };
    const { result } = renderHook(() => useIconStyleProps(props));

    expect(result.current.classProps).toContain('Icon--selected');
  });

  it.each(Object.values(iconColors))('should have dualtone color classname %s', (color: IconColorType) => {
    const props: SpiritIconProps = {
      name: 'shield-dualtone',
      color,
    };
    const { result } = renderHook(() => useIconStyleProps(props));

    expect(result.current.classProps).toContain(`Icon--${color}`);
  });

  it("should have default classname when `color` isn't defined for dualtone icon", () => {
    const props: SpiritIconProps = {
      name: 'shield-dualtone',
      color: undefined,
    };
    const { result } = renderHook(() => useIconStyleProps(props));

    expect(result.current.classProps).toContain('Icon--primary');
  });

  it("should not have default classname when `color` isn't defined for icon", () => {
    const props: SpiritIconProps = {
      name: 'file',
    };
    const { result } = renderHook(() => useIconStyleProps(props));

    expect(result.current.classProps).not.toContain('Icon--primary');
  });
});
