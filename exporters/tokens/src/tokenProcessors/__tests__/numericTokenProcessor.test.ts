import { exampleDimensionAndStringTokens } from '../../../tests/fixtures/internal-model/exampleDimensionAndStringTokens';
import { createDesignToken } from '../../../tests/helpers/createDesignToken';
import { type FontSizeBaseMap, TokenTypeEnum } from '../../core/types';
import { processNumericToken } from '../numericTokenProcessor';

const fontSizeBaseMap: FontSizeBaseMap = new Map([
  ['mobile', 14],
  ['tablet', 16],
  ['desktop', 18],
]);

describe('numericTokenProcessor', () => {
  describe('processNumericToken', () => {
    it('should process dimension token and convert px to rem', () => {
      const token = exampleDimensionAndStringTokens.get('dimensionRef')!;
      const ctx = {
        hasParentPrefix: true,
        hasJsOutput: false,
        fontSizeBaseMap,
      };

      const result = processNumericToken(token, ctx);

      expect(result).toBe('$grid-spacing-desktop: 1.7778rem !default;');
    });

    it('should process dimension token with js output', () => {
      const token = exampleDimensionAndStringTokens.get('dimensionRef')!;
      const ctx = {
        hasParentPrefix: true,
        hasJsOutput: true,
        fontSizeBaseMap,
      };

      const result = processNumericToken(token, ctx);

      expect(result).toBe("export const gridSpacingDesktop = '1.7778rem';");
    });

    it('should process fontSize token', () => {
      const token = createDesignToken(
        TokenTypeEnum.FontSize,
        { type: 'number', value: 16, unit: 'px' },
        { id: '1', name: 'font-size-body' },
      );
      const ctx = {
        hasParentPrefix: false,
        hasJsOutput: false,
        fontSizeBaseMap,
      };

      const result = processNumericToken(token, ctx);

      expect(result).toContain('font-size-body');
      expect(result).toContain('rem');
    });

    it('should process lineHeight token', () => {
      const token = createDesignToken(
        TokenTypeEnum.LineHeight,
        { type: 'number', value: 24, unit: 'px' },
        { id: '1', name: 'line-height-body' },
      );
      const ctx = {
        hasParentPrefix: false,
        hasJsOutput: false,
        fontSizeBaseMap,
      };

      const result = processNumericToken(token, ctx);

      expect(result).toContain('line-height-body');
      expect(result).toContain('rem');
    });

    it('should process letterSpacing token', () => {
      const token = createDesignToken(
        TokenTypeEnum.LetterSpacing,
        { type: 'number', value: 0.5, unit: 'px' },
        { id: '1', name: 'letter-spacing-body' },
      );
      const ctx = {
        hasParentPrefix: false,
        hasJsOutput: false,
        fontSizeBaseMap,
      };

      const result = processNumericToken(token, ctx);

      expect(result).toContain('letter-spacing-body');
      expect(result).toContain('rem');
    });

    it('should process radius token', () => {
      const token = createDesignToken(
        TokenTypeEnum.Radius,
        { type: 'number', value: 4, unit: 'px' },
        { id: '1', name: 'radius-small' },
      );
      const ctx = {
        hasParentPrefix: false,
        hasJsOutput: false,
        fontSizeBaseMap,
      };

      const result = processNumericToken(token, ctx);

      expect(result).toContain('radius-small');
      expect(result).toContain('rem');
    });

    it('should process space token', () => {
      const token = createDesignToken(
        TokenTypeEnum.Space,
        { type: 'number', value: 8, unit: 'px' },
        { id: '1', name: 'space-small' },
      );
      const ctx = {
        hasParentPrefix: false,
        hasJsOutput: false,
        fontSizeBaseMap,
      };

      const result = processNumericToken(token, ctx);

      expect(result).toContain('space-small');
      expect(result).toContain('rem');
    });

    it('should process size token', () => {
      const token = createDesignToken(
        TokenTypeEnum.Size,
        { type: 'number', value: 32, unit: 'px' },
        { id: '1', name: 'size-small' },
      );
      const ctx = {
        hasParentPrefix: false,
        hasJsOutput: false,
        fontSizeBaseMap,
      };

      const result = processNumericToken(token, ctx);

      expect(result).toContain('size-small');
      expect(result).toContain('rem');
    });

    it('should keep the unit when a non-zero px value rounds to zero rem', () => {
      const token = {
        ...exampleDimensionAndStringTokens.get('dimensionRef')!,
        value: { type: 'number', value: 0.0001, unit: 'px' },
      } as const;
      const ctx = {
        hasParentPrefix: true,
        hasJsOutput: false,
        fontSizeBaseMap,
      };

      const result = processNumericToken(token, ctx);

      expect(result).toBe('$grid-spacing-desktop: 0rem !default;');
    });

    it('should return null for a value that is not a number', () => {
      const token = {
        ...exampleDimensionAndStringTokens.get('dimensionRef')!,
        value: { type: 'string', value: 'auto' },
      } as const;
      const ctx = {
        hasParentPrefix: false,
        hasJsOutput: false,
        fontSizeBaseMap,
      };

      const result = processNumericToken(token, ctx);

      expect(result).toBeNull();
    });
  });
});
