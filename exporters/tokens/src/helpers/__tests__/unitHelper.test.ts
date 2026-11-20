import { type DesignToken, TokenTypeEnum, FontSizeBaseMap } from '../../core/types';
import { FONT_SIZE_BASE_DEFAULT } from '../../constants';
import {
  createDefaultFontSizeBaseMap,
  getFontSizeBaseForBreakpoint,
  getFontSizeBaseMap,
  isPxValue,
  makeRelativeUnit,
  replacePxWithRemUnits,
} from '../unitHelper';

describe('unitHelper', () => {
  describe('createDefaultFontSizeBaseMap', () => {
    it('should create map with default font size for all breakpoints', () => {
      const result = createDefaultFontSizeBaseMap();

      expect(result.get('mobile')).toBe(FONT_SIZE_BASE_DEFAULT);
      expect(result.get('tablet')).toBe(FONT_SIZE_BASE_DEFAULT);
      expect(result.get('desktop')).toBe(FONT_SIZE_BASE_DEFAULT);
    });

    it('should create map with custom font size for all breakpoints', () => {
      const customSize = 18;
      const result = createDefaultFontSizeBaseMap(customSize);

      expect(result.get('mobile')).toBe(customSize);
      expect(result.get('tablet')).toBe(customSize);
      expect(result.get('desktop')).toBe(customSize);
    });
  });

  describe('getFontSizeBaseForBreakpoint', () => {
    it('should return value for specific breakpoint', () => {
      const fontSizeBaseMap: FontSizeBaseMap = new Map([
        ['mobile', 14],
        ['tablet', 16],
        ['desktop', 18],
      ]);

      expect(getFontSizeBaseForBreakpoint(fontSizeBaseMap, 'mobile')).toBe(14);
      expect(getFontSizeBaseForBreakpoint(fontSizeBaseMap, 'tablet')).toBe(16);
      expect(getFontSizeBaseForBreakpoint(fontSizeBaseMap, 'desktop')).toBe(18);
    });

    it('should return value for breakpoint case-insensitive', () => {
      const fontSizeBaseMap: FontSizeBaseMap = new Map([['mobile', 14]]);

      expect(getFontSizeBaseForBreakpoint(fontSizeBaseMap, 'MOBILE')).toBe(14);
      expect(getFontSizeBaseForBreakpoint(fontSizeBaseMap, 'Mobile')).toBe(14);
      expect(getFontSizeBaseForBreakpoint(fontSizeBaseMap, 'mObIlE')).toBe(14);
    });

    it('should fallback to mobile when breakpoint is not found', () => {
      const fontSizeBaseMap: FontSizeBaseMap = new Map([['mobile', 14]]);

      expect(getFontSizeBaseForBreakpoint(fontSizeBaseMap, 'tablet')).toBe(14);
      expect(getFontSizeBaseForBreakpoint(fontSizeBaseMap, 'desktop')).toBe(14);
    });

    it('should return 0 when map is empty', () => {
      const fontSizeBaseMap: FontSizeBaseMap = new Map();

      expect(getFontSizeBaseForBreakpoint(fontSizeBaseMap, 'mobile')).toBe(0);
      expect(getFontSizeBaseForBreakpoint(fontSizeBaseMap, 'tablet')).toBe(0);
      expect(getFontSizeBaseForBreakpoint(fontSizeBaseMap, 'desktop')).toBe(0);
    });

    it('should return 0 when breakpoint and mobile are not in map', () => {
      const fontSizeBaseMap: FontSizeBaseMap = new Map([['tablet', 16]]);

      expect(getFontSizeBaseForBreakpoint(fontSizeBaseMap, 'desktop')).toBe(0);
    });

    it('should prioritize specific breakpoint over mobile fallback', () => {
      const fontSizeBaseMap: FontSizeBaseMap = new Map([
        ['mobile', 14],
        ['tablet', 16],
      ]);

      expect(getFontSizeBaseForBreakpoint(fontSizeBaseMap, 'tablet')).toBe(16);
      expect(getFontSizeBaseForBreakpoint(fontSizeBaseMap, 'desktop')).toBe(14);
    });
  });

  describe('getFontSizeBaseMap', () => {
    const dimension = (id: string, name: string, value: number, device?: string): DesignToken => ({
      id,
      name,
      type: TokenTypeEnum.Dimension,
      value: { type: 'number', value, unit: 'px' },
      metadata: { groupPath: [], device },
      source: { adapter: 'test', originalId: id },
    });

    it('should read the measure of a font-size-base token that is an alias', () => {
      const alias: DesignToken = {
        ...dimension('alias', 'font-size-base', 0),
        value: { type: 'reference', tokenId: 'base', resolved: { type: 'number', value: 20, unit: 'px' } },
      };

      expect(getFontSizeBaseMap([alias]).get('mobile')).toBe(20);
    });

    it('should return empty map when no font-size-base tokens found', () => {
      const result = getFontSizeBaseMap([dimension('1', 'spacing-small', 8)]);

      expect(result.size).toBe(0);
    });

    it('should find font-size-base token by name', () => {
      const result = getFontSizeBaseMap([dimension('1', 'font-size-base', 16)]);

      expect(result.get('mobile')).toBe(16);
      expect(result.get('tablet')).toBe(16);
      expect(result.get('desktop')).toBe(16);
    });

    it('should find font-size-base token by origin name', () => {
      const token = dimension('1', 'base', 16);
      const result = getFontSizeBaseMap([{ ...token, metadata: { ...token.metadata, originName: 'Font-Size-Base' } }]);

      expect(result.get('mobile')).toBe(16);
    });

    it('should find device-specific font-size-base tokens', () => {
      const result = getFontSizeBaseMap([
        dimension('1', 'font-size-base-mobile', 14, 'mobile'),
        dimension('2', 'font-size-base-desktop', 18, 'desktop'),
      ]);

      expect(result.get('mobile')).toBe(14);
      expect(result.get('desktop')).toBe(18);
    });

    it('should ignore a font-size-base token without a positive number', () => {
      const result = getFontSizeBaseMap([
        dimension('1', 'font-size-base', 0),
        { ...dimension('2', 'font-size-base', 0, 'mobile'), value: { type: 'string', value: '14px' } },
      ]);

      expect(result.size).toBe(0);
    });
  });

  describe('makeRelativeUnit', () => {
    it('should convert px to rem with default base font size', () => {
      expect(makeRelativeUnit(32, FONT_SIZE_BASE_DEFAULT)).toBe('2rem');
      expect(makeRelativeUnit(16, FONT_SIZE_BASE_DEFAULT)).toBe('1rem');
      expect(makeRelativeUnit(8, FONT_SIZE_BASE_DEFAULT)).toBe('0.5rem');
    });

    it('should convert px to rem with custom base font size', () => {
      expect(makeRelativeUnit(32, 18)).toBe('1.7778rem');
      expect(makeRelativeUnit(14, 14)).toBe('1rem');
    });

    it('should return original value when baseFontSize is 0', () => {
      expect(makeRelativeUnit(32, 0)).toBe(32);
      expect(makeRelativeUnit('32', 0)).toBe('32');
    });

    it('should return original value when baseFontSize is negative', () => {
      expect(makeRelativeUnit(32, -1)).toBe(32);
    });

    it('should handle string values', () => {
      expect(makeRelativeUnit('32', 16)).toBe('2rem');
      expect(makeRelativeUnit('40', 16)).toBe('2.5rem');
    });
  });

  describe('replacePxWithRemUnits', () => {
    it('should replace px with rem in string', () => {
      expect(replacePxWithRemUnits('0 2px 8px 0', 14)).toBe('0 0.1429rem 0.5714rem 0');
      expect(replacePxWithRemUnits('32px', 16)).toBe('2rem');
    });

    it('should return original string when baseFontSize is 0', () => {
      expect(replacePxWithRemUnits('0 2px 8px 0', 0)).toBe('0 2px 8px 0');
    });

    it('should return original string when baseFontSize is negative', () => {
      expect(replacePxWithRemUnits('0 2px 8px 0', -1)).toBe('0 2px 8px 0');
    });

    it('should keep non-px values unchanged', () => {
      expect(replacePxWithRemUnits('0 2rem 8px 0', 16)).toBe('0 2rem 0.5rem 0');
      expect(replacePxWithRemUnits('50%', 16)).toBe('50%');
    });

    it('should handle decimal px values', () => {
      expect(replacePxWithRemUnits('0.5px 1.5px', 16)).toBe('0.0313rem 0.0938rem');
    });
  });

  describe('isPxValue', () => {
    it('should accept a dimension in px', () => {
      expect(isPxValue({ type: 'number', value: 16, unit: 'px' })).toBe(true);
    });

    it.each([{ type: 'number', value: 1, unit: 'rem' }, { type: 'number', value: 1 }, undefined] as const)(
      'should reject %j',
      (dimension) => {
        expect(isPxValue(dimension)).toBe(false);
      },
    );
  });
});
