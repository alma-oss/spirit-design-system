import { mergeProps } from '../mergeProps';

describe('mergeProps', () => {
  it('should merge multiple prop objects with later sources winning', () => {
    expect(mergeProps({ a: 1, b: 2 }, { b: 3 })).toEqual({ a: 1, b: 3 });
  });

  it('should not let a nullish value in a later source override an earlier defined value', () => {
    expect(mergeProps({ elementType: 'li' }, { elementType: undefined })).toEqual({ elementType: 'li' });
    expect(mergeProps({ elementType: 'li' }, { elementType: null })).toEqual({ elementType: 'li' });
  });

  it('should keep falsy but defined values', () => {
    expect(mergeProps({ isDisabled: true }, { isDisabled: false })).toEqual({ isDisabled: false });
  });

  it('should skip undefined sources', () => {
    expect(mergeProps({ a: 1 }, undefined, { b: 2 })).toEqual({ a: 1, b: 2 });
  });

  it('should return an empty object when called with no sources', () => {
    expect(mergeProps()).toEqual({});
  });

  it('should not mutate any of the input sources', () => {
    const defaults = { a: 1 };
    const overrides = { a: 2 };

    mergeProps(defaults, overrides);

    expect(defaults).toEqual({ a: 1 });
    expect(overrides).toEqual({ a: 2 });
  });
});
