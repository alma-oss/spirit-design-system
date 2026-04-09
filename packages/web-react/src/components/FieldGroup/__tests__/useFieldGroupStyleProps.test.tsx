import { renderHook } from '@testing-library/react';
import { useFieldGroupStyleProps } from '../useFieldGroupStyleProps';

describe('useFieldGroupStyleProps', () => {
  it('should return defaults', () => {
    const props = {};
    const { result } = renderHook(() => useFieldGroupStyleProps(props));

    expect(result.current.classProps.root).toBe('FieldGroup');
  });

  it('should return FieldGroup danger class', () => {
    const props = { validationState: 'danger' as const };
    const { result } = renderHook(() => useFieldGroupStyleProps(props));

    expect(result.current.classProps.root).toBe('FieldGroup FieldGroup--danger');
  });

  it('should return fields class', () => {
    const props = {};
    const { result } = renderHook(() => useFieldGroupStyleProps(props));

    expect(result.current.classProps.fields).toBe('FieldGroup__fields');
  });
});
