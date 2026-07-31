import { omitNullish } from '../omitNullish';

describe('omitNullish', () => {
  it('should strip null and undefined values', () => {
    expect(omitNullish({ a: null, b: undefined, c: 'value' })).toEqual({ c: 'value' });
  });

  it('should keep falsy but defined values', () => {
    expect(omitNullish({ a: 0, b: '', c: false })).toEqual({ a: 0, b: '', c: false });
  });

  it('should return an empty object when every value is nullish', () => {
    expect(omitNullish({ a: null, b: undefined })).toEqual({});
  });

  it('should not mutate the input object', () => {
    const input = { a: null, b: 'value' };

    omitNullish(input);

    expect(input).toEqual({ a: null, b: 'value' });
  });
});
