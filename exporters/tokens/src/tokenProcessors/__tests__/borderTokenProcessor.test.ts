import { createDesignToken } from '../../../tests/helpers/createDesignToken';
import { TokenTypeEnum } from '../../core/types';
import { processBorderToken } from '../borderTokenProcessor';

describe('borderTokenProcessor', () => {
  describe('processBorderToken', () => {
    it('should process border token with width', () => {
      const token = createDesignToken(
        TokenTypeEnum.Border,
        { type: 'number', value: 1, unit: 'px' },
        { id: '1', name: 'border-default' },
      );
      const ctx = {
        hasParentPrefix: false,
        hasJsOutput: false,
      };

      const result = processBorderToken(token, ctx);

      expect(result).toContain('border-default');
      expect(result).toContain('1px');
    });

    it('should process borderWidth token', () => {
      const token = createDesignToken(
        TokenTypeEnum.BorderWidth,
        { type: 'number', value: 2, unit: 'px' },
        { id: '1', name: 'border-width-thin' },
      );
      const ctx = {
        hasParentPrefix: false,
        hasJsOutput: false,
      };

      const result = processBorderToken(token, ctx);

      expect(result).toContain('border-width-thin');
      expect(result).toContain('2px');
    });

    it('should process border token with js output', () => {
      const token = createDesignToken(
        TokenTypeEnum.Border,
        { type: 'number', value: 1, unit: 'px' },
        { id: '1', name: 'border-default' },
      );
      const ctx = {
        hasParentPrefix: false,
        hasJsOutput: true,
      };

      const result = processBorderToken(token, ctx);

      expect(result).toContain('export const');
      expect(result).toContain('borderDefault');
    });

    it('should return null for a value that is not a number', () => {
      const token = createDesignToken(
        TokenTypeEnum.Border,
        { type: 'composite', value: {} },
        { id: '1', name: 'border-undefined' },
      );
      const ctx = {
        hasParentPrefix: false,
        hasJsOutput: false,
      };

      const result = processBorderToken(token, ctx);

      expect(result).toBeNull();
    });
  });
});
