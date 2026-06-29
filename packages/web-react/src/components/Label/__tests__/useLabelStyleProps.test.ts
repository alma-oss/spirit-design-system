import { renderHook } from '@testing-library/react';
import { useLabelStyleProps } from '../useLabelStyleProps';

describe('useLabelStyleProps', () => {
  it('should return default Label class', () => {
    const { result } = renderHook(() => useLabelStyleProps({}));

    expect(result.current.classProps).toContain('Label');
  });

  it('should return disabled class when isDisabled is true', () => {
    const { result } = renderHook(() => useLabelStyleProps({ isDisabled: true }));

    expect(result.current.classProps).toContain('Label--disabled');
  });

  it('should return cursor-pointer class when hasPointerCursor is true', () => {
    const { result } = renderHook(() => useLabelStyleProps({ hasPointerCursor: true }));

    expect(result.current.classProps).toContain('cursor-pointer');
  });

  it('should return element-stretched class when isStretched is true', () => {
    const { result } = renderHook(() => useLabelStyleProps({ isStretched: true }));

    expect(result.current.classProps).toContain('element-stretched');
  });

  it('should return required class when isRequired is true', () => {
    const { result } = renderHook(() => useLabelStyleProps({ isRequired: true }));

    expect(result.current.classProps).toContain('Label--required');
  });

  it('should return accessibility-hidden when isLabelHidden is true', () => {
    const { result } = renderHook(() => useLabelStyleProps({ isLabelHidden: true }));

    expect(result.current.classProps).toContain('accessibility-hidden');
  });
});
