import { renderHook } from '@testing-library/react';
import { Sizes } from '../../../constants';
import { type SpiritTextFieldBaseProps } from '../../../types';
import { useTextFieldBaseStyleProps } from '../useTextFieldBaseStyleProps';

describe('useTextFieldBaseStyleProps', () => {
  it('should return defaults', () => {
    const props = {} as SpiritTextFieldBaseProps;
    const { result } = renderHook(() => useTextFieldBaseStyleProps(props));

    expect(result.current.classProps).toStrictEqual({
      counter: 'TextField__counter',
      input: 'TextField__input',
      passwordToggle: 'TextField__passwordToggle',
      passwordToggleButton: 'TextField__passwordToggle__button',
      passwordToggleIcon: 'TextField__passwordToggle__icon',
      root: 'TextField',
      validationText: 'TextField__validationText',
    });
  });

  it('should return TextField root class', () => {
    const props = {
      isMultiline: false,
    } as SpiritTextFieldBaseProps;
    const { result } = renderHook(() => useTextFieldBaseStyleProps(props));

    expect(result.current.classProps.root).toBe('TextField');
  });

  it('should return TextArea root class', () => {
    const props = {
      isMultiline: true,
    } as SpiritTextFieldBaseProps;
    const { result } = renderHook(() => useTextFieldBaseStyleProps(props));

    expect(result.current.classProps.root).toBe('TextArea');
  });

  it('should return required disabled warning TextField class', () => {
    const props = {
      isMultiline: false,
      isRequired: true,
      isDisabled: true,
      validationState: 'warning',
    } as SpiritTextFieldBaseProps;
    const { result } = renderHook(() => useTextFieldBaseStyleProps(props));

    expect(result.current.classProps.root).toBe('TextField TextField--disabled TextField--warning');
  });

  it.each([Object.values(Sizes)])('should return field with size %s', (size) => {
    const props = { size } as SpiritTextFieldBaseProps;
    const { result } = renderHook(() => useTextFieldBaseStyleProps(props));

    expect(result.current.classProps.root).toBe(`TextField TextField--${size}`);
  });
});
