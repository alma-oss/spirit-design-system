import { renderHook } from '@testing-library/react';
import { ValidationStates } from '../../../constants';
import { type SpiritCheckboxProps } from '../../../types';
import { useCheckboxStyleProps } from '../useCheckboxStyleProps';

describe('useCheckboxStyleProps', () => {
  it('should return defaults', () => {
    const props = { id: 'checkbox', label: 'Label' };
    const { result } = renderHook(() => useCheckboxStyleProps(props));

    expect(result.current.classProps).toEqual({
      root: 'Checkbox Checkbox--inputPositionStart',
      text: 'Checkbox__text',
      input: 'Checkbox__input',
    });
  });

  it('should return field as an Item', () => {
    const props = { isItem: true } as SpiritCheckboxProps;
    const { result } = renderHook(() => useCheckboxStyleProps(props));

    expect(result.current.classProps.root).toBe('Checkbox Checkbox--inputPositionStart Checkbox--item');
  });

  it.each([Object.values(ValidationStates)])('should return field with %s', (state) => {
    const props = { validationState: state } as SpiritCheckboxProps;
    const { result } = renderHook(() => useCheckboxStyleProps(props));

    expect(result.current.classProps.root).toBe(`Checkbox Checkbox--inputPositionStart Checkbox--${state}`);
  });

  it('should return field with inputPosition start', () => {
    const props = { inputPosition: 'start' } as SpiritCheckboxProps;
    const { result } = renderHook(() => useCheckboxStyleProps(props));

    expect(result.current.classProps.root).toBe('Checkbox Checkbox--inputPositionStart');
  });

  it('should return field with inputPosition end', () => {
    const props = { inputPosition: 'end' } as SpiritCheckboxProps;
    const { result } = renderHook(() => useCheckboxStyleProps(props));

    expect(result.current.classProps.root).toBe('Checkbox Checkbox--inputPositionEnd');
  });

  it('should return field with responsive inputPosition', () => {
    const props = { inputPosition: { mobile: 'start', tablet: 'end', desktop: 'start' } } as SpiritCheckboxProps;
    const { result } = renderHook(() => useCheckboxStyleProps(props));

    expect(result.current.classProps.root).toBe(
      'Checkbox Checkbox--inputPositionStart Checkbox--tablet--inputPositionEnd Checkbox--desktop--inputPositionStart',
    );
  });
});
