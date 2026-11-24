import { getIdentifierName } from '../identifierName';

describe('getIdentifierName', () => {
  it.each([
    ['a plain string', 'Alert', 'Alert'],
    ['an identifier node', { name: 'Alert' }, 'Alert'],
    ['a nested name node', { name: { name: 'Alert' } }, 'Alert'],
  ])('should resolve %s to its string name', (_description, input, expected) => {
    expect(getIdentifierName(input)).toBe(expected);
  });
});
