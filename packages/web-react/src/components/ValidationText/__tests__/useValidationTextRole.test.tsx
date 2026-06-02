import { renderHook } from '@testing-library/react';
import { type ValidationState } from '../../../types';
import { A11Y_ALERT_ROLE } from '../constants';
import { useValidationTextRole } from '../useValidationTextRole';

describe('useValidationTextRole', () => {
  it('should not return alert role on initial render', () => {
    const { result } = renderHook(() =>
      useValidationTextRole({
        validationState: 'danger',
        validationText: 'validation text',
      }),
    );

    expect(result.current).toBeUndefined();
  });

  it('should return alert role when validation text changes', () => {
    const { rerender, result } = renderHook(
      ({ validationText }) =>
        useValidationTextRole({
          validationState: 'danger',
          validationText,
        }),
      {
        initialProps: {
          validationText: 'initial validation text',
        },
      },
    );

    rerender({ validationText: 'updated validation text' });

    expect(result.current).toBe(A11Y_ALERT_ROLE);
  });

  it('should return alert role when validation state changes', () => {
    const { rerender, result } = renderHook(
      ({ validationState }) =>
        useValidationTextRole({
          validationState,
          validationText: 'validation text',
        }),
      {
        initialProps: {
          validationState: 'warning' as ValidationState,
        },
      },
    );

    rerender({ validationState: 'danger' });

    expect(result.current).toBe(A11Y_ALERT_ROLE);
  });
});
