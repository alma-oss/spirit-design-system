import { renderHook } from '@testing-library/react';
import { usePickerStyleProps } from '../usePickerStyleProps';

describe('usePickerStyleProps', () => {
  it('should return base classes', () => {
    const { result } = renderHook(() => usePickerStyleProps());

    expect(result.current.classProps.root).toBe('UNSTABLE_Picker');
    expect(result.current.classProps.selection).toBe('UNSTABLE_PickerSelection');
    expect(result.current.classProps.selectionEmpty).toBe('UNSTABLE_PickerSelection__empty');
    expect(result.current.classProps.trigger).toBe('UNSTABLE_PickerTrigger');
  });

  it('should add disabled modifier to selection when isDisabled is true', () => {
    const { result } = renderHook(() => usePickerStyleProps({ isDisabled: true }));

    expect(result.current.classProps.selection).toBe('UNSTABLE_PickerSelection UNSTABLE_PickerSelection--disabled');
  });
});
