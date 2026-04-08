import { TokenType } from '@supernovaio/sdk-exporters';
import { formatUnitValue, replacePxWithRem, type UnitFormatContext, type UnitFormatRule } from '../unitFormatter';
import { FONT_SIZE_BASE_DEFAULT } from '../../constants';

const tokenStub = {} as unknown as UnitFormatContext['token'];

describe('unitFormatter', () => {
  describe('formatUnitValue', () => {
    it('should return undefined for undefined value and 0 for zero', () => {
      const ctx: UnitFormatContext = {
        token: tokenStub,
        tokenType: TokenType.dimension,
        baseFontSize: FONT_SIZE_BASE_DEFAULT,
        isFontSizeBaseToken: false,
      };

      expect(formatUnitValue(undefined, 'px', ctx, [])).toBeUndefined();
      expect(formatUnitValue(0, 'px', ctx, [])).toBe(0);
    });

    it('should return raw number when unit is missing', () => {
      const ctx: UnitFormatContext = {
        token: tokenStub,
        tokenType: TokenType.dimension,
        baseFontSize: FONT_SIZE_BASE_DEFAULT,
        isFontSizeBaseToken: false,
      };

      expect(formatUnitValue(12, undefined, ctx, [])).toBe(12);
    });

    it('should do not convert non-px units', () => {
      const ctx: UnitFormatContext = {
        token: tokenStub,
        tokenType: TokenType.dimension,
        baseFontSize: FONT_SIZE_BASE_DEFAULT,
        isFontSizeBaseToken: false,
      };

      expect(formatUnitValue(50, '%', ctx, [])).toBe('50%');
      expect(formatUnitValue(2, 'rem', ctx, [])).toBe('2rem');
    });

    it('should convert px -> rem when rule matches', () => {
      const ctx: UnitFormatContext = {
        token: tokenStub,
        tokenType: TokenType.fontSize,
        baseFontSize: FONT_SIZE_BASE_DEFAULT,
        isFontSizeBaseToken: false,
      };
      const rules: UnitFormatRule[] = [
        { tokenTypes: [TokenType.fontSize], shouldConvert: () => true, converterNames: ['pxToRem'] },
      ];

      expect(formatUnitValue(40, 'px', ctx, rules)).toBe('2.5rem');
    });

    it('should keep px when rule does not match or shouldConvert is false', () => {
      const ctx: UnitFormatContext = {
        token: tokenStub,
        tokenType: TokenType.fontSize,
        baseFontSize: FONT_SIZE_BASE_DEFAULT,
        isFontSizeBaseToken: false,
      };
      const rules: UnitFormatRule[] = [
        { tokenTypes: [TokenType.dimension], shouldConvert: () => true, converterNames: ['pxToRem'] },
      ];

      expect(formatUnitValue(40, 'px', ctx, rules)).toBe('40px');
    });

    it('should keep px for font-size-base tokens (rule-based)', () => {
      const ctx: UnitFormatContext = {
        token: tokenStub,
        tokenType: TokenType.fontSize,
        baseFontSize: FONT_SIZE_BASE_DEFAULT,
        isFontSizeBaseToken: true,
      };
      const rules: UnitFormatRule[] = [
        { tokenTypes: [TokenType.fontSize], shouldConvert: (c) => !c.isFontSizeBaseToken, converterNames: ['pxToRem'] },
      ];

      expect(formatUnitValue(18, 'px', ctx, rules)).toBe('18px');
    });
  });

  describe('replacePxWithRem', () => {
    it('should replace px occurrences with rem using baseFontSize and keeps other text intact', () => {
      expect(replacePxWithRem('0 2px 8px 0', 14)).toBe('0 0.14rem 0.57rem 0');
    });

    it('should return input unchanged when baseFontSize is invalid', () => {
      expect(replacePxWithRem('0 2px 8px 0', 0)).toBe('0 2px 8px 0');
    });
  });
});
