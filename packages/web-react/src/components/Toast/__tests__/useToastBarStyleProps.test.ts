import { renderHook } from '@testing-library/react';
import { type SpiritToastBarProps } from '../../../types';
import { useToastBarStyleProps } from '../useToastBarStyleProps';

describe('useToastBarStyleProps', () => {
  it('should return default classes', () => {
    const props = { isOpen: true } as SpiritToastBarProps;
    const { result } = renderHook(() => useToastBarStyleProps(props));

    expect(result.current.classProps.root).toBe('ToastBar');
    expect(result.current.classProps.box).toBe('ToastBar__box color-scheme-on-neutral-basic');
    expect(result.current.classProps.link).toBe('ToastBar__link link-underlined');
    expect(result.current.classProps.content).toBe('ToastBar__content');
    expect(result.current.classProps.container).toBe('ToastBar__container');
  });

  it('should return dismissible class', () => {
    const props = { isDismissible: true } as SpiritToastBarProps;
    const { result } = renderHook(() => useToastBarStyleProps(props));

    expect(result.current.classProps.root).toContain('ToastBar--dismissible');
  });

  it.each([
    ['neutral', 'color-scheme-on-neutral-basic'],
    ['informative', 'color-scheme-on-emotion-informative-basic'],
    ['success', 'color-scheme-on-emotion-success-basic'],
    ['warning', 'color-scheme-on-emotion-warning-basic'],
    ['danger', 'color-scheme-on-emotion-danger-basic'],
  ])('should return color scheme class for %s', (color, expectedClass) => {
    const props = { color } as SpiritToastBarProps;
    const { result } = renderHook(() => useToastBarStyleProps(props));

    expect(result.current.classProps.box).toContain(expectedClass);
  });
});
