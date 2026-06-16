import { renderHook } from '@testing-library/react';
import { ValidationStates } from '../../../constants';
import { type SpiritCheckboxProps } from '../../../types';
import { useCheckboxStyleProps } from '../useCheckboxStyleProps';

describe('useCheckboxStyleProps', () => {
  it('should return defaults', () => {
    const props = { id: 'checkbox', label: 'Label' };
    const { result } = renderHook(() => useCheckboxStyleProps(props));

    expect(result.current.classProps).toEqual({
      input: 'Checkbox',
    });
    expect(result.current.direction).toBe('horizontal');
  });

  it('should return field as an Item', () => {
    const props = { isItem: true } as SpiritCheckboxProps;
    const { result } = renderHook(() => useCheckboxStyleProps(props));

    expect(result.current.classProps.input).toBe('Checkbox Checkbox--item');
  });

  it.each(Object.values(ValidationStates))('should return field with %s', (state) => {
    const props = { validationState: state } as SpiritCheckboxProps;
    const { result } = renderHook(() => useCheckboxStyleProps(props));

    expect(result.current.classProps.input).toBe(`Checkbox Checkbox--${state}`);
  });

  it('should return field with inputPosition start', () => {
    const props = { inputPosition: 'start' } as SpiritCheckboxProps;
    const { result } = renderHook(() => useCheckboxStyleProps(props));

    expect(result.current.direction).toBe('horizontal');
  });

  it('should return field with inputPosition end', () => {
    const props = { inputPosition: 'end' } as SpiritCheckboxProps;
    const { result } = renderHook(() => useCheckboxStyleProps(props));

    expect(result.current.direction).toBe('horizontal-reversed');
  });

  it('should return field with responsive inputPosition', () => {
    const props = { inputPosition: { mobile: 'start', tablet: 'end', desktop: 'start' } } as SpiritCheckboxProps;
    const { result } = renderHook(() => useCheckboxStyleProps(props));

    expect(result.current.direction).toEqual({
      mobile: 'horizontal',
      tablet: 'horizontal-reversed',
      desktop: 'horizontal',
    });
  });
});
