import { renderHook } from '@testing-library/react';
import { type SpiritFieldGroupProps } from '../../../types';
import { useFieldGroupStyleProps } from '../useFieldGroupStyleProps';

describe('useFieldGroupStyleProps', () => {
  it('should return defaults', () => {
    const props = {};
    const { result } = renderHook(() => useFieldGroupStyleProps(props));

    expect(result.current.classProps.root).toBe('FieldGroup');
  });

  it('should return FieldGroup fluid and danger classes', () => {
    const props: SpiritFieldGroupProps = { id: 'example-id', label: 'Label', isFluid: true, validationState: 'danger' };
    const { result } = renderHook(() => useFieldGroupStyleProps(props));

    expect(result.current.classProps.root).toBe('FieldGroup FieldGroup--fluid FieldGroup--danger');
  });

  it('should return fields class', () => {
    const props: SpiritFieldGroupProps = { id: 'example-id', label: 'Label' };
    const { result } = renderHook(() => useFieldGroupStyleProps(props));

    expect(result.current.classProps.fields).toBe('FieldGroup__fields');
  });
});
