import { toPascalCase } from '../toPascalCase';

describe('string to pascal case', () => {
  it.each([
    ['foo-bar', 'FooBar'],
    ['test-case', 'TestCase'],
    ['some-words-here', 'SomeWordsHere'],
    ['single', 'Single'],
    ['', ''],
    ['kebab-case-test', 'KebabCaseTest'],
  ])('should convert kebab-case string "%s" to PascalCase string "%s"', (input, expected) => {
    const result = toPascalCase(input);

    expect(result).toBe(expected);
  });
});
