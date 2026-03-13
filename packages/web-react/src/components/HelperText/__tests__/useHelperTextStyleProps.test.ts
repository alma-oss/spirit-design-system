import { renderHook } from '@testing-library/react';
import { FormFieldVariants } from '../../../types';
import { useHelperTextStyleProps } from '../useHelperTextStyleProps';

describe('useHelperTextStyleProps', () => {
  it('should return default class', () => {
    const { result } = renderHook(() => useHelperTextStyleProps({}));

    expect(result.current.classProps).toBe('HelperText');
  });

  it('should return disabled class when isDisabled is true', () => {
    const { result } = renderHook(() => useHelperTextStyleProps({ isDisabled: true }));

    expect(result.current.classProps).toBe('HelperText HelperText--disabled');
  });

  it('should return inline class when formFieldVariant is inline', () => {
    const { result } = renderHook(() => useHelperTextStyleProps({ formFieldVariant: FormFieldVariants.INLINE }));

    expect(result.current.classProps).toBe('HelperText HelperText--inline');
  });

  it('should return item class when formFieldVariant is item', () => {
    const { result } = renderHook(() => useHelperTextStyleProps({ formFieldVariant: FormFieldVariants.ITEM }));

    expect(result.current.classProps).toBe('HelperText HelperText--item');
  });

  it('should return disabled and inline classes when both are set', () => {
    const { result } = renderHook(() =>
      useHelperTextStyleProps({ isDisabled: true, formFieldVariant: FormFieldVariants.INLINE }),
    );

    expect(result.current.classProps).toContain('HelperText');
    expect(result.current.classProps).toContain('HelperText--disabled');
    expect(result.current.classProps).toContain('HelperText--inline');
  });

  it('should return disabled and item classes when both are set', () => {
    const { result } = renderHook(() =>
      useHelperTextStyleProps({ isDisabled: true, formFieldVariant: FormFieldVariants.ITEM }),
    );

    expect(result.current.classProps).toContain('HelperText');
    expect(result.current.classProps).toContain('HelperText--disabled');
    expect(result.current.classProps).toContain('HelperText--item');
  });
});
