import {
  applyReplacements,
  getReplacements,
  removePairQuotes,
  toCamelCase,
  toOutputName,
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

  describe('toOutputName', () => {
    it('should camel-case the name in the JS output and keep it in the SCSS output', () => {
      expect(toOutputName('theme-light', true)).toBe('themeLight');
      expect(toOutputName('theme-light', false)).toBe('theme-light');
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

  describe('getReplacements and applyReplacements', () => {
    it('should apply the configured replacements', () => {
      const configuration = {
        searchFont1: 'Inter',
        replaceFont1: '"Roboto"',
        searchFont2: 'serif',
        replaceFont2: 'mono',
      };

      expect(applyReplacements("'Inter', serif", getReplacements(configuration, 'Font'))).toBe("'Roboto', mono");
    });

    it('should ignore incomplete replacements and other names', () => {
      const configuration = { searchFont1: 'Inter', searchOther1: 'Inter', replaceOther1: 'Roboto' };

      expect(applyReplacements('Inter', getReplacements(configuration, 'Font'))).toBe('Inter');
    });

    it('should return the value untouched without configuration', () => {
      expect(applyReplacements('Inter', getReplacements({}, 'Font'))).toBe('Inter');
    });
  });
});
