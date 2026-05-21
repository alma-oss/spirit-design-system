import { renderHook } from '@testing-library/react';
import { FillVariants, Sizes } from '../../../constants';
import { useInputContainerStyleProps } from '../useInputContainerStyleProps';

describe('useInputContainerStyleProps', () => {
  it('should return default class when no style props are provided', () => {
    const { result } = renderHook(() => useInputContainerStyleProps({}));

    expect(result.current.classProps).toBe('InputContainer');
    expect(result.current.props).toEqual({});
  });

  it('should return modifier classes and forward rest props', () => {
    const { result } = renderHook(() =>
      useInputContainerStyleProps({
        id: 'example-input-container',
        isDisabled: true,
        size: Sizes.SMALL,
        validationState: 'danger',
        variant: FillVariants.OUTLINE,
      }),
    );

    expect(result.current.classProps).toBe(
      'InputContainer InputContainer--outline InputContainer--small InputContainer--disabled InputContainer--danger',
    );
    expect(result.current.props).toEqual({ id: 'example-input-container' });
  });
});
