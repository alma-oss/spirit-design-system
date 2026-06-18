import { renderHook } from '@testing-library/react';
import { ValidationStates } from '../../../constants';
import { type SpiritRadioProps } from '../../../types';
import { useRadioStyleProps } from '../useRadioStyleProps';

describe('useRadioStyleProps', () => {
  it('should return defaults', () => {
    const props = { id: 'radio', label: 'text' };
    const { result } = renderHook(() => useRadioStyleProps(props));

    expect(result.current.classProps).toEqual({
      input: 'Radio',
    });
    expect(result.current.direction).toBe('horizontal');
  });

  it('should return field as an Item', () => {
    const props = { id: 'radio', label: 'text', isItem: true } as SpiritRadioProps;
    const { result } = renderHook(() => useRadioStyleProps(props));

    expect(result.current.classProps.input).toBe('Radio Radio--item');
  });

  it.each(Object.values(ValidationStates))('should return field with %s', (state) => {
    const props = { validationState: state } as SpiritRadioProps;
    const { result } = renderHook(() => useRadioStyleProps(props));

    expect(result.current.classProps.input).toBe(`Radio Radio--${state}`);
  });

  it('should return field with inputPosition start', () => {
    const props = { inputPosition: 'start' } as SpiritRadioProps;
    const { result } = renderHook(() => useRadioStyleProps(props));

    expect(result.current.direction).toBe('horizontal');
  });

  it('should return field with inputPosition end', () => {
    const props = { inputPosition: 'end' } as SpiritRadioProps;
    const { result } = renderHook(() => useRadioStyleProps(props));

    expect(result.current.direction).toBe('horizontal-reversed');
  });

  it('should return field with responsive inputPosition', () => {
    const props = { inputPosition: { mobile: 'start', tablet: 'end', desktop: 'start' } } as SpiritRadioProps;
    const { result } = renderHook(() => useRadioStyleProps(props));

    expect(result.current.direction).toEqual({
      mobile: 'horizontal',
      tablet: 'horizontal-reversed',
      desktop: 'horizontal',
    });
  });
});
