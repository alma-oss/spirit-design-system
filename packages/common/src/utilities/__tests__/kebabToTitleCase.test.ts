import { kebabToTitleCase } from '../kebabToTitleCase';

describe('kebabToTitleCase', () => {
  it.each([
    ['theme-light-default', 'Theme Light Default'],
    ['button', 'Button'],
    ['some-icon-name', 'Some Icon Name'],
    ['', ''],
    ['already-Capitalized', 'Already Capitalized'],
  ])('should convert %s to %s', (input, expected) => {
    expect(kebabToTitleCase(input)).toBe(expected);
  });
});
