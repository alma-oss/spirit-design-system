import { renderHook } from '@testing-library/react';
import { type SpiritFlexProps } from '../../../types';
import { useFlexStyleProps } from '../useFlexStyleProps';

describe('useFlexStyleProps', () => {
  it.each([
    // props, expectedClasses
    [{}, 'Flex Flex--noWrap'],
    [{ isWrapping: true }, 'Flex Flex--wrap'],
    [{ isInline: true }, 'Flex Flex--noWrap Flex--inline'],
    [
      {
        isWrapping: { mobile: true, tablet: false, desktop: true },
      },
      'Flex Flex--wrap Flex--tablet--noWrap Flex--desktop--wrap',
    ],
    [{ direction: 'horizontal' }, 'Flex Flex--noWrap Flex--horizontal'],
    [{ direction: 'vertical' }, 'Flex Flex--noWrap Flex--vertical'],
    [
      {
        direction: { mobile: 'horizontal', tablet: 'vertical', desktop: 'horizontal' },
      },
      'Flex Flex--noWrap Flex--horizontal Flex--tablet--vertical Flex--desktop--horizontal',
    ],
    [{ alignmentX: 'left' }, 'Flex Flex--noWrap Flex--alignmentXLeft'],
    [
      {
        alignmentX: 'left',
        alignmentY: 'top',
      },
      'Flex Flex--noWrap Flex--alignmentXLeft Flex--alignmentYTop',
    ],
    [
      {
        alignmentX: { mobile: 'left', tablet: 'center', desktop: 'right' },
      },
      'Flex Flex--noWrap Flex--alignmentXLeft Flex--tablet--alignmentXCenter Flex--desktop--alignmentXRight',
    ],
    [
      {
        alignmentX: { mobile: 'left', tablet: 'center', desktop: 'right' },
        alignmentY: { mobile: 'top', tablet: 'center', desktop: 'bottom' },
      },
      'Flex Flex--noWrap Flex--alignmentXLeft Flex--tablet--alignmentXCenter Flex--desktop--alignmentXRight Flex--alignmentYTop Flex--tablet--alignmentYCenter Flex--desktop--alignmentYBottom',
    ],
    [
      {
        alignmentX: 'left',
        alignmentY: { mobile: 'top', tablet: 'center', desktop: 'bottom' },
      },
      'Flex Flex--noWrap Flex--alignmentXLeft Flex--alignmentYTop Flex--tablet--alignmentYCenter Flex--desktop--alignmentYBottom',
    ],
  ])('should return the correct classes for props %o', (props, expectedClasses) => {
    const { result } = renderHook(() => useFlexStyleProps(props as SpiritFlexProps));

    expect(result.current.classProps).toBe(expectedClasses);
  });

  it.each([
    // props, expectedStyleProps
    [{}, {}],
    [
      { spacing: 'space-100' },
      { '--flex-spacing-x': 'var(--spirit-space-100)', '--flex-spacing-y': 'var(--spirit-space-100)' },
    ],
    [
      { spacingX: 'space-100', spacingY: 'space-200' },
      { '--flex-spacing-x': 'var(--spirit-space-100)', '--flex-spacing-y': 'var(--spirit-space-200)' },
    ],
    [
      {
        spacing: { mobile: 'space-100', tablet: 'space-200' },
      },
      {
        '--flex-spacing-x': 'var(--spirit-space-100)',
        '--flex-spacing-x-tablet': 'var(--spirit-space-200)',
        '--flex-spacing-y': 'var(--spirit-space-100)',
        '--flex-spacing-y-tablet': 'var(--spirit-space-200)',
      },
    ],
    [
      {
        spacingX: { mobile: 'space-100', tablet: 'space-200' },
        spacingY: { mobile: 'space-300', tablet: 'space-400' },
      },
      {
        '--flex-spacing-x': 'var(--spirit-space-100)',
        '--flex-spacing-x-tablet': 'var(--spirit-space-200)',
        '--flex-spacing-y': 'var(--spirit-space-300)',
        '--flex-spacing-y-tablet': 'var(--spirit-space-400)',
      },
    ],
    [
      {
        spacing: { mobile: 'space-100', tablet: 'space-200', desktop: 'space-400' },
      },
      {
        '--flex-spacing-x': 'var(--spirit-space-100)',
        '--flex-spacing-x-tablet': 'var(--spirit-space-200)',
        '--flex-spacing-x-desktop': 'var(--spirit-space-400)',
        '--flex-spacing-y': 'var(--spirit-space-100)',
        '--flex-spacing-y-tablet': 'var(--spirit-space-200)',
        '--flex-spacing-y-desktop': 'var(--spirit-space-400)',
      },
    ],
    [
      {
        spacingX: { mobile: 'space-100', tablet: 'space-200', desktop: 'space-400' },
      },
      {
        '--flex-spacing-x': 'var(--spirit-space-100)',
        '--flex-spacing-x-tablet': 'var(--spirit-space-200)',
        '--flex-spacing-x-desktop': 'var(--spirit-space-400)',
      },
    ],
  ])('should return the correct style properties for props %o', (props, expectedStyleProps) => {
    const { result } = renderHook(() => useFlexStyleProps(props as SpiritFlexProps));

    expect(result.current.styleProps).toEqual(expectedStyleProps);
  });
});
