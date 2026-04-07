import { renderHook } from '@testing-library/react';
import { type SpiritToastBarProps } from '../../../types';
import { getColorSchemeClassName } from '../../../utils';
import { useToastBarStyleProps } from '../useToastBarStyleProps';

describe('useToastBarStyleProps', () => {
  it('should return default classes', () => {
    const props = { isOpen: true } as SpiritToastBarProps;
    const { result } = renderHook(() => useToastBarStyleProps(props));

    expect(result.current.classProps.root).toBe(
      `ToastBar ToastBar--neutral ${getColorSchemeClassName({ color: 'neutral', isSubtle: false })}`,
    );
    expect(result.current.classProps.close).toBe('ToastBar__close');
    expect(result.current.classProps.link).toBe('ToastBar__link link-underlined');
    expect(result.current.classProps.content).toBe('ToastBar__content');
    expect(result.current.classProps.container).toBe('ToastBar__container');
  });

  it('should return dismissible class', () => {
    const props = { isDismissible: true } as SpiritToastBarProps;
    const { result } = renderHook(() => useToastBarStyleProps(props));

    expect(result.current.classProps.root).toContain('ToastBar--dismissible');
  });

  it.each([['neutral'], ['informative'], ['success'], ['warning'], ['danger']])(
    'should return color class %s',
    (color) => {
      const props = { color } as SpiritToastBarProps;
      const { result } = renderHook(() => useToastBarStyleProps(props));

      expect(result.current.classProps.root).toBe(
        `ToastBar ToastBar--${color} ${getColorSchemeClassName({ color, isSubtle: false })}`,
      );
    },
  );
});
