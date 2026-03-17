import { renderHook } from '@testing-library/react';
import { FormFieldVariants } from '../../../types';
import { useLabelStyleProps } from '../useLabelStyleProps';

describe('useLabelStyleProps', () => {
  it('should return default Label and box class', () => {
    const { result } = renderHook(() => useLabelStyleProps({}));

    expect(result.current.classProps).toContain('Label');
    expect(result.current.classProps).toContain('Label--box');
  });

  it('should return disabled class when isDisabled is true', () => {
    const { result } = renderHook(() => useLabelStyleProps({ isDisabled: true }));

    expect(result.current.classProps).toContain('Label');
    expect(result.current.classProps).toContain('Label--disabled');
  });

  it('should return inline class when formFieldVariant is inline', () => {
    const { result } = renderHook(() => useLabelStyleProps({ formFieldVariant: FormFieldVariants.INLINE }));

    expect(result.current.classProps).toContain('Label');
    expect(result.current.classProps).toContain('Label--inline');
  });

  it('should return item class when formFieldVariant is item', () => {
    const { result } = renderHook(() => useLabelStyleProps({ formFieldVariant: FormFieldVariants.ITEM }));

    expect(result.current.classProps).toContain('Label');
    expect(result.current.classProps).toContain('Label--item');
  });

  it('should return inline and item classes when formFieldVariant is inline and isItem is true', () => {
    const { result } = renderHook(() =>
      useLabelStyleProps({ formFieldVariant: FormFieldVariants.INLINE, isItem: true }),
    );

    expect(result.current.classProps).toContain('Label');
    expect(result.current.classProps).toContain('Label--inline');
    expect(result.current.classProps).toContain('Label--item');
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
