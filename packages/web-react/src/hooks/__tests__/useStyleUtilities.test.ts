import { renderHook } from '@testing-library/react';
import { TextAlignments, TextHyphens, TextStyleProps, TextWordBreaks } from '../../constants';
import { type StyleProps } from '../../types';
import { useStyleUtilities } from '../useStyleUtilities';

describe('useStyleUtilities hook', () => {
  it('should process theme prop using kebab-case values', () => {
    const mockProps = {
      theme: 'theme-light-default',
    };
    const mockPrefix = 'test-prefix';

    const { result } = renderHook(() => useStyleUtilities(mockProps as StyleProps, mockPrefix));

    expect(result.current.styleUtilities).toEqual(['test-prefix-theme-light-default']);
    expect(result.current.props).toEqual({});
  });

  it('should process style utilities correctly', () => {
    const mockProps = {
      margin: 'space-100',
      marginX: {
        mobile: 'space-200',
        tablet: 'auto',
        desktop: 'space-300',
      },
      hideOn: 'tablet',
      hideFrom: 'desktop',
    };
    const mockPrefix = 'test-prefix';

    const { result } = renderHook(() => useStyleUtilities(mockProps as StyleProps, mockPrefix));

    expect(result.current.styleUtilities).toEqual([
      'test-prefix-m-100',
      'test-prefix-mx-200',
      'test-prefix-mx-tablet-auto',
      'test-prefix-mx-desktop-300',
      'test-prefix-d-only-tablet-none',
      'test-prefix-d-desktop-none',
    ]);
    expect(result.current.props).toEqual({});
  });

  it('should process style utilities correctly without prefix', () => {
    const mockProps = {
      margin: 'space-100',
      marginX: {
        mobile: 'space-200',
        tablet: 'auto',
        desktop: 'space-300',
      },
      hideOn: ['mobile', 'desktop'],
    };

    const { result } = renderHook(() => useStyleUtilities(mockProps as StyleProps, ''));

    expect(result.current.styleUtilities).toEqual([
      'm-100',
      'mx-200',
      'mx-tablet-auto',
      'mx-desktop-300',
      'd-only-mobile-none',
      'd-only-desktop-none',
    ]);
    expect(result.current.props).toEqual({});
  });

  it('should process style utilities correctly with responsive values', () => {
    const mockProps = {
      margin: { mobile: 'space-100', tablet: 'space-200', desktop: 'space-300' },
      marginX: { mobile: 'space-200', tablet: 'space-200', desktop: 'space-300' },
      hideFrom: 'tablet',
    };
    const mockPrefix = 'test-prefix';

    const { result } = renderHook(() => useStyleUtilities(mockProps as StyleProps, mockPrefix));

    expect(result.current.styleUtilities).toEqual([
      'test-prefix-m-100',
      'test-prefix-m-tablet-200',
      'test-prefix-m-desktop-300',
      'test-prefix-mx-200',
      'test-prefix-mx-tablet-200',
      'test-prefix-mx-desktop-300',
      'test-prefix-d-tablet-none',
    ]);
    expect(result.current.props).toEqual({});
  });

  it('should process style utilities correctly with responsive values without prefix', () => {
    const mockProps = {
      margin: { mobile: 'space-100', tablet: 'space-200', desktop: 'space-300' },
      marginX: { mobile: 'space-200', tablet: 'space-200', desktop: 'space-300' },
    };

    const { result } = renderHook(() => useStyleUtilities(mockProps as StyleProps));

    expect(result.current.styleUtilities).toEqual([
      'm-100',
      'm-tablet-200',
      'm-desktop-300',
      'mx-200',
      'mx-tablet-200',
      'mx-desktop-300',
    ]);
    expect(result.current.props).toEqual({});
  });

  it('should process style utilities with additional spacing props', () => {
    const mockProps = {
      margin: 'space-100',
      marginX: 'space-200',
      marginY: 'space-400',
      padding: 'space-500',
      paddingX: 'space-600',
      paddingY: 'space-700',
      isTextBalanced: true,
      textAlignment: TextAlignments.CENTER,
      textHyphens: TextHyphens.AUTO,
      textWordBreak: TextWordBreaks.LONG_WORDS,
      hideOn: 'mobile',
      hideFrom: 'desktop',
    };
    const additionalSpacingProps = {
      padding: 'p',
      paddingX: 'px',
      paddingY: 'py',
      isTextBalanced: TextStyleProps.isTextBalanced,
      textAlignment: TextStyleProps.textAlignment,
      textHyphens: TextStyleProps.textHyphens,
      textWordBreak: TextStyleProps.textWordBreak,
    };

    const { result } = renderHook(() =>
      useStyleUtilities(mockProps as StyleProps, 'test-prefix', additionalSpacingProps),
    );

    expect(result.current.styleUtilities).toEqual([
      'test-prefix-m-100',
      'test-prefix-mx-200',
      'test-prefix-my-400',
      'test-prefix-p-500',
      'test-prefix-px-600',
      'test-prefix-py-700',
      'test-prefix-text-wrap-pretty',
      'test-prefix-text-center',
      'test-prefix-text-hyphens-auto',
      'test-prefix-text-word-break-long-words',
      'test-prefix-d-only-mobile-none',
      'test-prefix-d-desktop-none',
    ]);
  });

  it('should process style utilities with responsive additional spacing props', () => {
    const mockProps = {
      margin: 'space-100',
      marginX: 'space-200',
      marginY: 'space-400',
      padding: { mobile: 'space-500', tablet: 'space-600', desktop: 'space-700' },
      paddingX: { mobile: 'space-600', tablet: 'space-700', desktop: 'space-800' },
      paddingY: { mobile: 'space-700', tablet: 'space-800', desktop: 'space-900' },
      textAlignment: { mobile: TextAlignments.LEFT, tablet: TextAlignments.RIGHT, desktop: TextAlignments.RIGHT },
    };
    const additionalSpacingProps = {
      padding: 'p',
      paddingX: 'px',
      paddingY: 'py',
      textAlignment: TextStyleProps.textAlignment,
    };

    const { result } = renderHook(() => useStyleUtilities(mockProps as StyleProps, '', additionalSpacingProps));

    expect(result.current.styleUtilities).toEqual([
      'm-100',
      'mx-200',
      'my-400',
      'p-500',
      'p-tablet-600',
      'p-desktop-700',
      'px-600',
      'px-tablet-700',
      'px-desktop-800',
      'py-700',
      'py-tablet-800',
      'py-desktop-900',
      'text-left',
      'text-tablet-right',
      'text-desktop-right',
    ]);
  });

  it('should not process null, undefined and an empty string style utilities', () => {
    const mockProps = {
      margin: undefined,
      paddingY: null,
      paddingX: '',
      marginX: {
        mobile: null,
        tablet: undefined,
        desktop: 'space-300',
      },
      hideOn: undefined,
      hideFrom: null,
    };

    // Type casting to `unknown` - `undefined` and `null` are not valid values for StyleProps
    const { result } = renderHook(() => useStyleUtilities(mockProps as unknown as StyleProps, ''));

    expect(result.current.styleUtilities).toEqual(['mx-desktop-300']);
    expect(result.current.props).toEqual({ paddingX: '', paddingY: null });
  });

  it('should preserve non-style props with empty string values', () => {
    const mockProps = {
      margin: undefined,
      paddingY: null,
      paddingX: '',
      marginX: {
        mobile: null,
        tablet: undefined,
        desktop: 'space-300',
      },
      hideOn: undefined,
      hideFrom: null,
      value: '',
      placeholder: '',
    };

    const { result } = renderHook(() => useStyleUtilities(mockProps as unknown as StyleProps, ''));

    expect(result.current.styleUtilities).toEqual(['mx-desktop-300']);
    expect(result.current.props).toEqual({ paddingX: '', paddingY: null, value: '', placeholder: '' });
  });

  it('should preserve all non-style props regardless of value', () => {
    const mockProps = {
      margin: 'space-100',
      value: '',
      name: 'test-input',
      disabled: false,
      placeholder: '',
      'data-testid': 'my-component',
    };

    const { result } = renderHook(() => useStyleUtilities(mockProps as unknown as StyleProps, ''));

    expect(result.current.styleUtilities).toEqual(['m-100']);
    expect(result.current.props).toEqual({
      value: '',
      name: 'test-input',
      disabled: false,
      placeholder: '',
      'data-testid': 'my-component',
    });
  });

  it('should process hideOn utility with single breakpoint', () => {
    const mockProps = {
      hideOn: 'tablet',
    };

    const { result } = renderHook(() => useStyleUtilities(mockProps as StyleProps));

    expect(result.current.styleUtilities).toEqual(['d-only-tablet-none']);
  });

  it('should process hideOn utility with multiple breakpoints', () => {
    const mockProps = {
      hideOn: ['mobile', 'desktop'],
    };

    const { result } = renderHook(() => useStyleUtilities(mockProps as StyleProps));

    expect(result.current.styleUtilities).toEqual(['d-only-mobile-none', 'd-only-desktop-none']);
  });

  it('should process hideFrom utility with single breakpoint', () => {
    const mockProps = {
      hideFrom: 'tablet',
    };

    const { result } = renderHook(() => useStyleUtilities(mockProps as StyleProps));

    expect(result.current.styleUtilities).toEqual(['d-tablet-none']);
  });

  it('should process hideFrom utility with mobile breakpoint', () => {
    const mockProps = {
      hideFrom: 'mobile',
    };

    const { result } = renderHook(() => useStyleUtilities(mockProps as StyleProps));

    expect(result.current.styleUtilities).toEqual(['d-none']);
  });

  it('should process both hideOn and hideFrom utilities together', () => {
    const mockProps = {
      hideOn: ['tablet', 'desktop'],
      hideFrom: 'mobile',
    };

    const { result } = renderHook(() => useStyleUtilities(mockProps as StyleProps));

    expect(result.current.styleUtilities).toEqual(['d-only-tablet-none', 'd-only-desktop-none', 'd-none']);
  });

  it('should process display utilities with prefix', () => {
    const mockProps = {
      hideOn: ['tablet', 'desktop'],
      hideFrom: 'mobile',
    };

    const { result } = renderHook(() => useStyleUtilities(mockProps as StyleProps, 'test-prefix'));

    expect(result.current.styleUtilities).toEqual([
      'test-prefix-d-only-tablet-none',
      'test-prefix-d-only-desktop-none',
      'test-prefix-d-none',
    ]);
  });

  describe('padding props whitelist behavior', () => {
    it('should not process padding props when not in additionalProps', () => {
      const mockProps = {
        padding: 'space-100',
        marginTop: 'space-200',
      } as unknown as StyleProps;
      const { result } = renderHook(() => useStyleUtilities(mockProps));

      // margin IS in default whitelist, should be processed
      expect(result.current.styleUtilities).toContain('mt-200');

      // padding is NOT in default whitelist, should NOT be processed
      expect(result.current.styleUtilities).not.toContain('p-100');

      // padding should be passed through as a regular prop
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.current.props as Record<string, any>).padding).toBe('space-100');
    });

    it('should not process any padding variant props when not whitelisted', () => {
      const mockProps = {
        paddingX: 'space-100',
        paddingY: 'space-200',
        paddingTop: 'space-300',
        paddingBottom: 'space-400',
        paddingLeft: 'space-500',
        paddingRight: 'space-600',
        marginTop: 'space-700',
      } as unknown as StyleProps;
      const { result } = renderHook(() => useStyleUtilities(mockProps));

      // margin should be processed (in default whitelist)
      expect(result.current.styleUtilities).toContain('mt-700');

      // none of the padding props should be processed
      expect(result.current.styleUtilities).not.toContain('px-100');
      expect(result.current.styleUtilities).not.toContain('py-200');
      expect(result.current.styleUtilities).not.toContain('pt-300');
      expect(result.current.styleUtilities).not.toContain('pb-400');
      expect(result.current.styleUtilities).not.toContain('pl-500');
      expect(result.current.styleUtilities).not.toContain('pr-600');

      // all padding props should be passed through
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const restProps = result.current.props as Record<string, any>;
      expect(restProps.paddingX).toBe('space-100');
      expect(restProps.paddingY).toBe('space-200');
      expect(restProps.paddingTop).toBe('space-300');
      expect(restProps.paddingBottom).toBe('space-400');
      expect(restProps.paddingLeft).toBe('space-500');
      expect(restProps.paddingRight).toBe('space-600');
    });

    it('should process padding props when explicitly whitelisted via additionalProps', () => {
      const mockProps = {
        padding: 'space-100',
        marginTop: 'space-200',
      } as unknown as StyleProps;

      // Simulate Box component behavior - explicitly whitelist padding
      const additionalProps = {
        padding: 'p',
        paddingX: 'px',
        paddingY: 'py',
        paddingTop: 'pt',
        paddingBottom: 'pb',
        paddingLeft: 'pl',
        paddingRight: 'pr',
      };

      const { result } = renderHook(() => useStyleUtilities(mockProps, '', additionalProps));

      // Both margin and padding should be processed
      expect(result.current.styleUtilities).toContain('mt-200');
      expect(result.current.styleUtilities).toContain('p-100');

      // Processed props should NOT be in restProps
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.current.props as Record<string, any>).padding).toBeUndefined();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.current.props as Record<string, any>).marginTop).toBeUndefined();
    });

    it('should handle responsive padding props correctly when not whitelisted', () => {
      const mockProps = {
        padding: { mobile: 'space-100', tablet: 'space-200' },
        marginTop: { mobile: 'space-300' },
      } as unknown as StyleProps;
      const { result } = renderHook(() => useStyleUtilities(mockProps));

      // margin should be processed
      expect(result.current.styleUtilities).toContain('mt-300');

      // padding should NOT be processed (not in default whitelist)
      expect(result.current.styleUtilities).not.toContain('p-100');
      expect(result.current.styleUtilities).not.toContain('p-tablet-200');

      // padding should be passed through unchanged
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.current.props as Record<string, any>).padding).toEqual({
        mobile: 'space-100',
        tablet: 'space-200',
      });
    });
  });
});
