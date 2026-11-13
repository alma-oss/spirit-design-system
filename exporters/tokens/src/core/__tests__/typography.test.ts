import { createTokenIndex } from '../tokenIndex';
import { readTypography, readTypographyReferences, withTypographyDimensions } from '../typography';
import { type DesignToken, type NumberValue, TokenTypeEnum, type TokenValue } from '../types';

const px = (value: number): NumberValue => ({ type: 'number', value, unit: 'px' });

const typography = (members: Record<string, TokenValue> = {}): TokenValue => ({
  type: 'composite',
  value: {
    fontFamily: { type: 'string', value: 'Inter' },
    fontWeight: { type: 'string', value: 'Bold' },
    ...members,
  },
});

describe('typography', () => {
  describe('readTypography', () => {
    it('should read the members of a typography', () => {
      expect(readTypography(typography({ fontSize: px(16), lineHeight: px(24) }))).toEqual({
        fontFamily: 'Inter',
        fontWeight: 'Bold',
        fontSize: px(16),
        lineHeight: px(24),
      });
    });

    it('should leave out a font size and a line height the style does not have', () => {
      const style = readTypography(typography());

      expect(style.fontSize).toBeUndefined();
      expect(style.lineHeight).toBeUndefined();
    });

    it('should take the value the source resolved for a reference without looking the token up', () => {
      const value = typography({ fontSize: { type: 'reference', tokenId: 'unknown', resolved: px(20) } });

      expect(readTypography(value).fontSize).toEqual(px(20));
    });

    it('should follow a reference the source did not resolve through the index', () => {
      const target: DesignToken = {
        id: 'size',
        name: 'size',
        type: TokenTypeEnum.FontSize,
        value: px(18),
        metadata: { groupPath: [] },
        source: { adapter: 'test', originalId: 'size' },
      };
      const value = typography({ fontSize: { type: 'reference', tokenId: 'size' } });

      expect(readTypography(value, createTokenIndex([target])).fontSize).toEqual(px(18));
    });

    it('should take the value the source resolved for an alias the index knows, whatever the alias points at', () => {
      const alias: DesignToken = {
        id: 'alias',
        name: 'alias',
        type: TokenTypeEnum.FontSize,
        value: { type: 'reference', tokenId: 'missing', resolved: px(22) },
        metadata: { groupPath: [] },
        source: { adapter: 'test', originalId: 'alias' },
      };
      const value = typography({ fontSize: { type: 'reference', tokenId: 'alias' } });

      expect(readTypography(value, createTokenIndex([alias])).fontSize).toEqual(px(22));
    });

    it('should throw for an unresolved reference to an unknown token', () => {
      const value = typography({ fontSize: { type: 'reference', tokenId: 'unknown' } });

      expect(() => readTypography(value)).toThrow('unknown referenced token unknown');
    });

    it('should throw when the value is not a composite', () => {
      expect(() => readTypography({ type: 'string', value: 'Inter' })).toThrow('typography composite');
    });

    it('should throw when a required member is missing', () => {
      expect(() => readTypography({ type: 'composite', value: {} })).toThrow('Missing "fontFamily"');
    });

    it('should throw when a member has an unexpected type', () => {
      expect(() => readTypography(typography({ fontSize: { type: 'string', value: '16px' } }))).toThrow(
        '"fontSize" of a typography to be a "number"',
      );
    });
  });

  describe('readTypographyReferences', () => {
    it('should read the ids the font size and the line height point at', () => {
      const value = typography({
        fontSize: { type: 'reference', tokenId: 'size', resolved: px(16) },
        lineHeight: px(24),
      });

      expect(readTypographyReferences(value)).toEqual({ fontSize: 'size', lineHeight: undefined });
    });

    it('should read nothing from a value that is not a composite', () => {
      expect(readTypographyReferences({ type: 'string', value: 'x' })).toEqual({});
    });
  });

  describe('withTypographyDimensions', () => {
    it('should replace the given dimensions and leave the original untouched', () => {
      const original = typography({
        fontSize: { type: 'reference', tokenId: 'size', resolved: px(16) },
        lineHeight: px(24),
      });

      const result = withTypographyDimensions(original, { fontSize: px(32) });

      expect(readTypography(result)).toMatchObject({ fontSize: px(32), lineHeight: px(24) });
      expect(readTypographyReferences(result)).toEqual({ fontSize: undefined, lineHeight: undefined });
      expect(readTypographyReferences(original).fontSize).toBe('size');
    });

    it('should throw when the value is not a composite', () => {
      expect(() => withTypographyDimensions({ type: 'string', value: 'x' }, {})).toThrow('typography composite');
    });
  });
});
