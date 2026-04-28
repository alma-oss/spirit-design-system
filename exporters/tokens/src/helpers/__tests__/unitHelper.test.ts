import { Token, TokenType, Unit } from '@supernovaio/sdk-exporters';
import { FONT_SIZE_BASE_DEFAULT } from '../../constants';
import {
  createDefaultFontSizeBaseMap,
  getFontSizeBaseForBreakpoint,
  getFontSizeBaseMap,
  makeRelativeUnit,
  replacePxWithRemUnits,
  type FontSizeBaseMap,
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
    it('should return empty map when no font-size-base tokens found', () => {
      const tokens = [
        {
          id: '1',
          name: 'spacing-small',
          tokenType: TokenType.dimension,
          value: { measure: 8, unit: Unit.pixels },
        },
      ] as unknown as Token[];

      const result = getFontSizeBaseMap(tokens);

      expect(result.size).toBe(0);
    });

    it('should find font-size-base token by name', () => {
      const tokens = [
        {
          id: '1',
          name: 'font-size-base',
          tokenType: TokenType.dimension,
          value: { measure: 16, unit: Unit.pixels },
        },
      ] as unknown as Token[];

      const result = getFontSizeBaseMap(tokens);

      expect(result.get('mobile')).toBe(16);
      expect(result.get('tablet')).toBe(16);
      expect(result.get('desktop')).toBe(16);
    });

    it('should find device-specific font-size-base tokens', () => {
      const tokens = [
        {
          id: '1',
          name: 'font-size-base-mobile',
          tokenType: TokenType.dimension,
          propertyValues: { device: 'mobile' },
          value: { measure: 14, unit: Unit.pixels, referencedTokenId: null },
        },
        {
          id: '2',
          name: 'font-size-base-desktop',
          tokenType: TokenType.dimension,
          propertyValues: { device: 'desktop' },
          value: { measure: 18, unit: Unit.pixels, referencedTokenId: null },
        },
      ] as unknown as Token[];

      const result = getFontSizeBaseMap(tokens);

      expect(result.get('mobile')).toBe(14);
      expect(result.get('desktop')).toBe(18);
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
});
