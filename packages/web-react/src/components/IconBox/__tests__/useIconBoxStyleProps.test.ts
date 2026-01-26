import { renderHook } from '@testing-library/react';
import { type ElementType } from 'react';
import { BorderRadii } from '../../../constants';
import type { Responsive, SizeExtendedDictionaryType, SpiritIconBoxProps } from '../../../types';
import { useIconBoxStyleProps } from '../useIconBoxStyleProps';

const expectedIconBoxStyles = {
  padding: 'calc(var(--spirit-local-padding) - var(--spirit-local-border-width, 0px)) !important',
};

describe('useIconBoxStyleProps', () => {
  it('should return defaults when no props are passed', () => {
    const { result } = renderHook(() => useIconBoxStyleProps({}));

    expect(result.current.sizeProps).toEqual({ padding: 'space-600', iconSize: 24 });
    expect(result.current.shapesProps).toBe(BorderRadii['300']);
    expect(result.current.iconBoxStyles).toEqual(expectedIconBoxStyles);
  });

  it('should return correct sizeProps for size="small"', () => {
    const { result } = renderHook(() => useIconBoxStyleProps({ size: 'small' }));

    expect(result.current.sizeProps).toEqual({ padding: 'space-500', iconSize: 20 });
    expect(result.current.iconBoxStyles).toEqual(expectedIconBoxStyles);
  });

  it('should return correct borderRadiusProps for borderRadius="circle"', () => {
    const { result } = renderHook(() => useIconBoxStyleProps({ shape: 'circle' }));

    expect(result.current.shapesProps).toBe(BorderRadii.FULL);
  });

  it('should return padding style with CSS variables regardless of hasBorder', () => {
    const { result: resultWithoutBorder } = renderHook(() =>
      useIconBoxStyleProps({ hasBorder: false, size: 'xsmall' }),
    );
    const { result: resultWithBorder } = renderHook(() => useIconBoxStyleProps({ hasBorder: true, size: 'large' }));

    expect(resultWithoutBorder.current.iconBoxStyles).toEqual(expectedIconBoxStyles);
    expect(resultWithBorder.current.iconBoxStyles).toEqual(expectedIconBoxStyles);
  });

  it('should forward other props', () => {
    const { result } = renderHook(() =>
      useIconBoxStyleProps({
        size: 'medium',
        hasBorder: false,
        'aria-label': 'foo',
      } as unknown as SpiritIconBoxProps<ElementType>),
    );

    expect(result.current.props).toHaveProperty('aria-label', 'foo');
    expect(result.current.props).not.toHaveProperty('size');
  });

  describe('responsive sizes', () => {
    const responsiveSizeTestCases = [
      {
        description: 'all breakpoints',
        size: { mobile: 'small', tablet: 'medium', desktop: 'large' } as Responsive<SizeExtendedDictionaryType>,
        expectedPadding: {
          mobile: 'space-500',
          tablet: 'space-600',
          desktop: 'space-600',
        },
        expectedIconSize: {
          mobile: 20,
          tablet: 24,
          desktop: 28,
        },
      },
      {
        description: 'partial breakpoints (mobile and desktop)',
        size: { mobile: 'small', desktop: 'large' } as Responsive<SizeExtendedDictionaryType>,
        expectedPadding: {
          mobile: 'space-500',
          desktop: 'space-600',
        },
        expectedIconSize: {
          mobile: 20,
          desktop: 28,
        },
      },
      {
        description: 'mobile and tablet breakpoints',
        size: { mobile: 'small', tablet: 'large' } as Responsive<SizeExtendedDictionaryType>,
        expectedPadding: {
          mobile: 'space-500',
          tablet: 'space-600',
        },
        expectedIconSize: {
          mobile: 20,
          tablet: 28,
        },
      },
      {
        description: 'xsmall and xlarge sizes',
        size: { mobile: 'xsmall', tablet: 'medium', desktop: 'xlarge' } as Responsive<SizeExtendedDictionaryType>,
        expectedPadding: {
          mobile: 'space-500',
          tablet: 'space-600',
          desktop: 'space-700',
        },
        expectedIconSize: {
          mobile: 16,
          tablet: 24,
          desktop: 28,
        },
      },
    ];

    it.each(responsiveSizeTestCases)(
      'should return correct sizeProps for responsive size with $description',
      ({ size, expectedPadding, expectedIconSize }) => {
        const { result } = renderHook(() => useIconBoxStyleProps({ size }));

        expect(result.current.sizeProps).toEqual({
          padding: expectedPadding,
          iconSize: expectedIconSize,
        });
      },
    );

    it.each(responsiveSizeTestCases)(
      'should return correct iconBoxStyles for responsive size with $description (always uses CSS variables)',
      ({ size }) => {
        const { result: resultWithBorder } = renderHook(() => useIconBoxStyleProps({ size, hasBorder: true }));
        const { result: resultWithoutBorder } = renderHook(() => useIconBoxStyleProps({ size, hasBorder: false }));

        expect(resultWithBorder.current.iconBoxStyles).toEqual(expectedIconBoxStyles);
        expect(resultWithoutBorder.current.iconBoxStyles).toEqual(expectedIconBoxStyles);
      },
    );
  });
});
