import { replacePxWithRem } from '../unitFormatter';

describe('unitFormatter', () => {
  describe('replacePxWithRem', () => {
    it('should replace px occurrences with rem using baseFontSize and keeps other text intact', () => {
      expect(replacePxWithRem('0 2px 8px 0', 14)).toBe('0 0.1429rem 0.5714rem 0');
    });

    it('should keep zero pixel values unitless', () => {
      expect(replacePxWithRem('0px 2px 0px', 16)).toBe('0 0.125rem 0');
    });

    it('should convert large px values without treating their trailing zero as zero px', () => {
      expect(replacePxWithRem('0px 100px 80px 0px', 16)).toBe('0 6.25rem 5rem 0');
    });

    it('should return input unchanged when baseFontSize is invalid', () => {
      expect(replacePxWithRem('0 2px 8px 0', 0)).toBe('0 2px 8px 0');
    });
  });
});
