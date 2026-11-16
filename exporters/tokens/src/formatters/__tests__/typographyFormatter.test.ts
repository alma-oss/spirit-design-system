import {
  formatTypographyStyle,
  jsKeyValueTemplate,
  jsObjectTemplate,
  scssKeyValueTemplate,
  scssObjectTemplate,
} from '../typographyFormatter';

describe('typographyFormatter', () => {
  describe('object templates', () => {
    it('should render a JS object', () => {
      expect(jsObjectTemplate(['a: 1', 'b: 2'])).toBe('{\na: 1,\nb: 2,\n}');
    });

    it('should render an SCSS map', () => {
      expect(scssObjectTemplate(['a: 1', 'b: 2'])).toBe('(\na: 1,\nb: 2,\n)');
    });
  });

  describe('key-value templates', () => {
    it('should quote JS values with whitespace only', () => {
      expect(jsKeyValueTemplate('fontStyle', 'italic')).toBe('fontStyle: italic');
      expect(jsKeyValueTemplate('fontFamily', 'Inter sans')).toBe('fontFamily: "Inter sans"');
    });

    it.each([
      ['fontFamily', "'Inter', sans-serif", 'font-family: "\'Inter\', sans-serif"'],
      ['fontWeight', 600, 'font-weight: 600'],
      ['fontStyle', "'italic'", 'font-style: italic'],
    ])('should format SCSS %s', (key, value, expected) => {
      expect(scssKeyValueTemplate(key, value)).toBe(expected);
    });
  });

  describe('formatTypographyStyle', () => {
    const style = { fontFamily: "'Inter', sans-serif", fontSize: "'1rem'", fontStyle: "'normal'", fontWeight: 400 };

    it('should render an SCSS map', () => {
      expect(formatTypographyStyle(style, false)).toBe(
        '(\nfont-family: "\'Inter\', sans-serif",\nfont-size: 1rem,\nfont-style: normal,\nfont-weight: 400,\n)',
      );
    });

    it('should render a JS object', () => {
      expect(formatTypographyStyle({ ...style, lineHeight: '1.5' }, true)).toBe(
        "{\nfontFamily: \"'Inter', sans-serif\",\nfontSize: '1rem',\nfontStyle: 'normal',\nfontWeight: 400,\nlineHeight: 1.5,\n}",
      );
    });
  });
});
