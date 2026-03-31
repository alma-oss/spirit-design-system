import { renderHook } from '@testing-library/react';
import { Sizes } from '../../../constants';
import { usePickerStyleProps } from '../usePickerStyleProps';

describe('usePickerStyleProps', () => {
  it('should return base classes', () => {
    const { result } = renderHook(() => usePickerStyleProps({}));

    expect(result.current.classProps.root).toBe('UNSTABLE_Picker');
    expect(result.current.classProps.label).toBe('UNSTABLE_Picker__label');
  });

  it('should include all modifiers', () => {
    const { result } = renderHook(() =>
      usePickerStyleProps({
        isDisabled: true,
        isFluid: true,
        isLabelHidden: true,
        isRequired: true,
        size: Sizes.SMALL,
        validationState: 'danger',
      }),
    );

    expect(result.current.classProps.root).toContain('UNSTABLE_Picker--small');
    expect(result.current.classProps.root).toContain('UNSTABLE_Picker--disabled');
    expect(result.current.classProps.root).toContain('UNSTABLE_Picker--fluid');
    expect(result.current.classProps.root).toContain('UNSTABLE_Picker--danger');
    expect(result.current.classProps.label).toContain('UNSTABLE_Picker__label--hidden');
    expect(result.current.classProps.label).toContain('UNSTABLE_Picker__label--required');
  });
});
