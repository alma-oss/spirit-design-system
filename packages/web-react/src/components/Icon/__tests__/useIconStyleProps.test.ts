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

  it('should return mobile size when boxSize is a number', () => {
    const props = { boxSize: 20, name: 'add' } as SpiritIconProps;
    const { result } = renderHook(() => useIconStyleProps(props));

    expect(result.current.iconStyleProps).toEqual({
      '--spirit-icon-size': '1.25rem',
    });
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
