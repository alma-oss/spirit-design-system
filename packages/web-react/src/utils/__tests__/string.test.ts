import {
  camelCaseToKebabCase,
  kebabCaseToCamelCase,
  kebabCaseToCamelCaseValues,
  normalizeStringValue,
  stringOrObjectKebabCaseToCamelCase,
} from '../string';

describe('string', () => {
  describe('#camelCaseToKebabCase', () => {
    it.each([
      ['fooBar', 'foo-bar'],
      ['testCase', 'test-case'],
      ['someWordsHere', 'some-words-here'],
      ['single', 'single'],
      ['themeLightDefault', 'theme-light-default'],
    ])('should convert camelCase string "%s" to kebab-case string "%s"', (input, expected) => {
      const result = camelCaseToKebabCase(input);

      expect(result).toEqual(expected);
    });
  });

  describe('#kebabCaseToCamelCase', () => {
    it.each([
      ['foo-bar', 'fooBar'],
      ['test-case', 'testCase'],
      ['some-words-here', 'someWordsHere'],
      ['single', 'single'],
      ['', ''],
      ['kebab-case-test', 'kebabCaseTest'],
    ])('should convert kebab-case string "%s" to camelCase string "%s"', (input, expected) => {
      const result = kebabCaseToCamelCase(input);

      expect(result).toEqual(expected);
    });
  });

  describe('#kebabCaseToCamelCaseValues', () => {
    it.each([
      [{ test: 'foo-bar' }, { test: 'fooBar' }],
      [{ test: 'test-case' }, { test: 'testCase' }],
      [{ test: 'some-words-here' }, { test: 'someWordsHere' }],
      [{ test: 'single' }, { test: 'single' }],
      [{ test: '' }, { test: '' }],
      [{ test: 'kebab-case-test' }, { test: 'kebabCaseTest' }],
    ])('should convert kebab-case object "%s" to camelCase object "%s"', (input, expected) => {
      const result = kebabCaseToCamelCaseValues(input);

      expect(result).toEqual(expected);
    });
  });

  describe('#normalizeStringValue', () => {
    it.each([
      ['hello', 'hello'],
      ['', ''],
      [null, undefined],
      [undefined, undefined],
      [42, '42'],
      [0, '0'],
      [true, 'true'],
      [false, 'false'],
    ])('should normalize %s to %s', (input, expected) => {
      const result = normalizeStringValue(input);

      expect(result).toEqual(expected);
    });
  });

  describe('#stringOrObjectKebabCaseToCamelCase', () => {
    it.each([
      ['foo-bar', 'fooBar'],
      ['test-case', 'testCase'],
      ['some-words-here', 'someWordsHere'],
      ['single', 'single'],
      ['', ''],
      ['kebab-case-test', 'kebabCaseTest'],
      [{ test: 'foo-bar' }, { test: 'fooBar' }],
      [{ test: 'test-case' }, { test: 'testCase' }],
      [{ test: 'some-words-here' }, { test: 'someWordsHere' }],
      [{ test: 'single' }, { test: 'single' }],
      [{ test: '' }, { test: '' }],
      [{ test: 'kebab-case-test' }, { test: 'kebabCaseTest' }],
    ])('should convert kebab-case object "%s" to camelCase object "%s"', (input, expected) => {
      const result = stringOrObjectKebabCaseToCamelCase(input);

      expect(result).toEqual(expected);
    });
  });
});
