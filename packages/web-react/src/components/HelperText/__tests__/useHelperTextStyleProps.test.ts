import { renderHook } from '@testing-library/react';
import { FormFieldModes } from '../../../types';
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

  it('should return inline class when formFieldMode is inline', () => {
    const { result } = renderHook(() => useHelperTextStyleProps({ formFieldMode: FormFieldModes.INLINE }));

    expect(result.current.classProps).toBe('HelperText HelperText--inline');
  });

  it('should return item class when formFieldMode is item', () => {
    const { result } = renderHook(() => useHelperTextStyleProps({ formFieldMode: FormFieldModes.ITEM }));

    expect(result.current.classProps).toBe('HelperText HelperText--item');
  });

  it('should return disabled and inline classes when both are set', () => {
    const { result } = renderHook(() =>
      useHelperTextStyleProps({ isDisabled: true, formFieldMode: FormFieldModes.INLINE }),
    );

    expect(result.current.classProps).toContain('HelperText');
    expect(result.current.classProps).toContain('HelperText--disabled');
    expect(result.current.classProps).toContain('HelperText--inline');
  });

  it('should return disabled and item classes when both are set', () => {
    const { result } = renderHook(() =>
      useHelperTextStyleProps({ isDisabled: true, formFieldMode: FormFieldModes.ITEM }),
    );

    expect(result.current.classProps).toContain('HelperText');
    expect(result.current.classProps).toContain('HelperText--disabled');
    expect(result.current.classProps).toContain('HelperText--item');
  });
});
