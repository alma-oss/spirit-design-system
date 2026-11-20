import { type Token } from '@supernovaio/sdk-exporters';
import { readNumericValue } from '../numericValueHelper';

describe('readNumericValue', () => {
  it('should read the measure and the unit of a token', () => {
    const token = { value: { measure: 16, unit: 'Pixels' } } as unknown as Token;

    expect(readNumericValue(token)).toEqual({ measure: 16, unit: 'Pixels' });
  });

  it('should return undefined members for a token without a value', () => {
    expect(readNumericValue({} as unknown as Token)).toEqual({ measure: undefined, unit: undefined });
  });
});
