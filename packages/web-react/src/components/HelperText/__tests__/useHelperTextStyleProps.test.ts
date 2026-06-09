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

  it('should return disabled class when formFieldMode is inline', () => {
    const { result } = renderHook(() =>
      useHelperTextStyleProps({ isDisabled: true, formFieldMode: FormFieldModes.INLINE }),
    );

    expect(result.current.classProps).toBe('HelperText HelperText--disabled');
  });

  it('should not return item class when formFieldMode is item', () => {
    const { result } = renderHook(() => useHelperTextStyleProps({ formFieldMode: FormFieldModes.ITEM }));

    expect(result.current.classProps).toBe('HelperText');
  });
});
