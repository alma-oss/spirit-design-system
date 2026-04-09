import { renderHook } from '@testing-library/react';
import { useSliderStyleProps } from '../useSliderStyleProps';

const defaultProps = {
  label: 'Slider',
  value: 0,
  onChange: () => {},
};

describe('useSliderStyleProps', () => {
  it('should return defaults', () => {
    const { result } = renderHook(() => useSliderStyleProps(defaultProps));

    expect(result.current.classProps.root).toBe('Slider');
    expect(result.current.classProps.input).toBe('Slider__input');
  });

  it('should return disabled class', () => {
    const { result } = renderHook(() => useSliderStyleProps({ ...defaultProps, isDisabled: true }));

    expect(result.current.classProps.root).toContain('Slider--disabled');
  });

  it('should return validation state class', () => {
    const { result } = renderHook(() => useSliderStyleProps({ ...defaultProps, validationState: 'danger' }));

    expect(result.current.classProps.root).toContain('Slider--danger');
  });
});
