import { renderHook } from '@testing-library/react';
import { FormFieldVariants } from '../../../types';
import { useValidationTextStyleProps } from '../useValidationTextStyleProps';

describe('useValidationTextStyleProps', () => {
  it('should return default ValidationText class', () => {
    const { result } = renderHook(() => useValidationTextStyleProps({}));

    expect(result.current.classProps).toContain('ValidationText');
  });

  it('should return danger class when hasValidationStateIcon is danger', () => {
    const { result } = renderHook(() => useValidationTextStyleProps({ hasValidationStateIcon: 'danger' }));

    expect(result.current.classProps).toContain('ValidationText');
    expect(result.current.classProps).toContain('ValidationText--danger');
  });

  it('should return warning class when hasValidationStateIcon is warning', () => {
    const { result } = renderHook(() => useValidationTextStyleProps({ hasValidationStateIcon: 'warning' }));

    expect(result.current.classProps).toContain('ValidationText--warning');
  });

  it('should return success class when hasValidationStateIcon is success', () => {
    const { result } = renderHook(() => useValidationTextStyleProps({ hasValidationStateIcon: 'success' }));

    expect(result.current.classProps).toContain('ValidationText--success');
  });

  it('should return disabled class when isDisabled is true', () => {
    const { result } = renderHook(() => useValidationTextStyleProps({ isDisabled: true }));

    expect(result.current.classProps).toContain('ValidationText--disabled');
  });

  it('should return inline class when formFieldVariant is inline', () => {
    const { result } = renderHook(() =>
      useValidationTextStyleProps({
        formFieldVariant: FormFieldVariants.INLINE,
      }),
    );

    expect(result.current.classProps).toContain('ValidationText--inline');
  });

  it('should return item class when formFieldVariant is item', () => {
    const { result } = renderHook(() =>
      useValidationTextStyleProps({
        formFieldVariant: FormFieldVariants.ITEM,
      }),
    );

    expect(result.current.classProps).toContain('ValidationText--item');
  });
});
