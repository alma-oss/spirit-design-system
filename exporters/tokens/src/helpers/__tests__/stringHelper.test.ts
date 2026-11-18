import {
  removePairQuotes,
  replaceByConfiguration,
  toCamelCase,
  toKebabCase,
  toParamCase,
  toPlural,
} from '../stringHelper';

const dataProviderItems = [
  ['radius', 'radii'],
  ['spacing', 'spaces'],
  ['breakpoint', 'breakpoints'],
  ['grid-spacing', 'grid-spacings'],
  ['shadow', 'shadows'],
  ['gradient', 'gradients'],
  ['size', 'sizes'],
  ['space', 'spaces'],
  ['spaces', 'spaces'],
];

describe('stringHelper', () => {
  describe.each(dataProviderItems)('toPlural', (name, expected) => {
    it(`should return the expected plural form for ${name}`, () => {
      const result = toPlural(name);

      expect(result).toBe(expected);
    });
  });

  describe('toCamelCase', () => {
    it.each([
      ['some-name', 'someName'],
      ['font size', 'fontSize'],
      ['1a', '_1a'],
      ['a_b', 'aB'],
    ])('should convert %s to %s', (name, expected) => {
      expect(toCamelCase(name)).toBe(expected);
    });
  });

  describe('toParamCase', () => {
    it.each([
      ['Primary 100', 'primary-100'],
      ['a b/c', 'a-b-c'],
      ['fooBar', 'foo-bar'],
      [['Grid', 'spacing', 'desktop'], 'grid-spacing-desktop'],
      [['1', '2'], '_1-2'],
    ])('should convert %s to %s', (name, expected) => {
      expect(toParamCase(name)).toBe(expected);
    });
  });

  describe('toKebabCase', () => {
    it.each([
      ['fontSize', 'font-size'],
      ['lineHeight', 'line-height'],
      ['fontFamily', 'font-family'],
      ['color', 'color'],
    ])('should convert %s to %s', (input, expected) => {
      expect(toKebabCase(input)).toBe(expected);
    });
  });

  describe('removePairQuotes', () => {
    it.each([
      ["'Inter'", 'Inter'],
      ["'Inter', sans-serif", "'Inter', sans-serif"],
      ['Inter', 'Inter'],
    ])('should turn %s into %s', (input, expected) => {
      expect(removePairQuotes(input)).toBe(expected);
    });
  });

  describe('replaceByConfiguration', () => {
    it('should apply the configured replacements', () => {
      const configuration = {
        searchFont0: 'Inter',
        replaceFont0: '"Roboto"',
        searchFont1: 'serif',
        replaceFont1: 'mono',
      };

      expect(replaceByConfiguration(configuration, "'Inter', serif", 'Font')).toBe("'Roboto', mono");
    });

    it('should ignore incomplete replacements and other names', () => {
      const configuration = { searchFont0: 'Inter', searchOther0: 'Inter', replaceOther0: 'Roboto' };

      expect(replaceByConfiguration(configuration, 'Inter', 'Font')).toBe('Inter');
    });

    it('should return the value untouched without configuration', () => {
      expect(replaceByConfiguration({}, 'Inter', 'Font')).toBe('Inter');
    });
  });
});
