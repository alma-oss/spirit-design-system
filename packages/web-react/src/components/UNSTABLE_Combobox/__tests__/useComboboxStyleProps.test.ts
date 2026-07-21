import { renderHook } from '@testing-library/react';
import { useComboboxStyleProps } from '../useComboboxStyleProps';

describe('useComboboxStyleProps', () => {
  it('should return combobox class names', () => {
    const { result } = renderHook(() => useComboboxStyleProps());

    expect(result.current.classProps.root).toBe('UNSTABLE_Combobox');
    expect(result.current.classProps.selection).toBe('UNSTABLE_ComboboxSelection');
    expect(result.current.classProps.input).toBe('UNSTABLE_Combobox__input');
    expect(result.current.classProps.emptyState).toBe('UNSTABLE_Combobox__emptyState');
    expect(result.current.classProps.loading).toBe('UNSTABLE_Combobox__loading');
  });

  it('should add disabled class on root when isDisabled', () => {
    const { result } = renderHook(() => useComboboxStyleProps({ isDisabled: true }));

    expect(result.current.classProps.root).toContain('UNSTABLE_Combobox--disabled');
  });
});
