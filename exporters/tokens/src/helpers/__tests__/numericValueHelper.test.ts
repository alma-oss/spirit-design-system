import { readNumericValue } from '../numericValueHelper';

describe('readNumericValue', () => {
  it('should read the measure and the unit of a token', () => {
    expect(readNumericValue({ value: { measure: 16, unit: 'Pixels' } })).toEqual({ measure: 16, unit: 'Pixels' });
  });

  it('should return undefined members for a token without a value', () => {
    expect(readNumericValue({})).toEqual({ measure: undefined, unit: undefined });
  });
});
