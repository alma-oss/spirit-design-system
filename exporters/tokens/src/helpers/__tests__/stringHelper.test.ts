import { removePairQuotes, replaceByConfiguration, toKebabCase, toPlural } from '../stringHelper';

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
