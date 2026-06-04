import { renderHook } from '@testing-library/react';
import { useValidationTextStyleProps } from '../useValidationTextStyleProps';

describe('useValidationTextStyleProps', () => {
  it('should return default ValidationText class', () => {
    const { result } = renderHook(() => useValidationTextStyleProps({}));

    expect(result.current.classProps).toContain('ValidationText');
  });

  it('should return danger class when validationStateIcon is danger', () => {
    const { result } = renderHook(() => useValidationTextStyleProps({ validationStateIcon: 'danger' }));

    expect(result.current.classProps).toContain('ValidationText');
    expect(result.current.classProps).toContain('ValidationText--danger');
  });

  it('should return warning class when validationStateIcon is warning', () => {
    const { result } = renderHook(() => useValidationTextStyleProps({ validationStateIcon: 'warning' }));

    expect(result.current.classProps).toContain('ValidationText--warning');
  });

  it('should return success class when validationStateIcon is success', () => {
    const { result } = renderHook(() => useValidationTextStyleProps({ validationStateIcon: 'success' }));

    expect(result.current.classProps).toContain('ValidationText--success');
  });

  it('should return disabled class when isDisabled is true', () => {
    const { result } = renderHook(() => useValidationTextStyleProps({ isDisabled: true }));

    expect(result.current.classProps).toContain('ValidationText--disabled');
  });
});
