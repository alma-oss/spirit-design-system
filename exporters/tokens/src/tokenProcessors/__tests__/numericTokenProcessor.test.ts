import {
  DimensionToken,
  FontSizeToken,
  LetterSpacingToken,
  LineHeightToken,
  RadiusToken,
  SizeToken,
  SpaceToken,
  TokenGroup,
  TokenType,
} from '@supernovaio/sdk-exporters';
import { exampleDimensionAndStringTokens } from '../../../tests/fixtures/exampleDimensionAndStringTokens';
import { exampleGroups } from '../../../tests/fixtures/exampleGroups';
import { sampleConfigurationDefault } from '../../../tests/fixtures/sampleConfiguration';
import { processNumericToken } from '../numericTokenProcessor';
import { type FontSizeBaseMap } from '../../helpers/unitHelper';

jest.mock('../../../config', () => ({
  exportConfiguration: sampleConfigurationDefault,
}));

const tokenGroups: Array<TokenGroup> = exampleGroups;
const fontSizeBaseMap: FontSizeBaseMap = new Map([
  ['mobile', 14],
  ['tablet', 16],
  ['desktop', 18],
]);

describe('numericTokenProcessor', () => {
  describe('processNumericToken', () => {
    it('should process dimension token and convert px to rem', () => {
      const token = exampleDimensionAndStringTokens.get('dimensionRef') as DimensionToken;
      const ctx = {
        tokenGroups,
        hasParentPrefix: true,
        hasJsOutput: false,
        fontSizeBaseMap,
      };

      const result = processNumericToken(token, TokenType.dimension, ctx);

      expect(result).toBe('$grid-spacing-desktop: 1.7778rem !default;');
    });

    it('should process dimension token with js output', () => {
      const token = exampleDimensionAndStringTokens.get('dimensionRef') as DimensionToken;
      const ctx = {
        tokenGroups,
        hasParentPrefix: true,
        hasJsOutput: true,
        fontSizeBaseMap,
      };

      const result = processNumericToken(token, TokenType.dimension, ctx);

      expect(result).toBe("export const gridSpacingDesktop = '1.7778rem';");
    });

    it('should process fontSize token', () => {
      const token = {
        id: '1',
        name: 'font-size-body',
        tokenType: TokenType.fontSize,
        value: { measure: 16, unit: 'px' },
      } as unknown as FontSizeToken;
      const ctx = {
        tokenGroups,
        hasParentPrefix: false,
        hasJsOutput: false,
        fontSizeBaseMap,
      };

      const result = processNumericToken(token, TokenType.fontSize, ctx);

      expect(result).toContain('font-size-body');
      expect(result).toContain('rem');
    });

    it('should process lineHeight token', () => {
      const token = {
        id: '1',
        name: 'line-height-body',
        tokenType: TokenType.lineHeight,
        value: { measure: 24, unit: 'px' },
      } as unknown as LineHeightToken;
      const ctx = {
        tokenGroups,
        hasParentPrefix: false,
        hasJsOutput: false,
        fontSizeBaseMap,
      };

      const result = processNumericToken(token, TokenType.lineHeight, ctx);

      expect(result).toContain('line-height-body');
      expect(result).toContain('rem');
    });

    it('should process letterSpacing token', () => {
      const token = {
        id: '1',
        name: 'letter-spacing-body',
        tokenType: TokenType.letterSpacing,
        value: { measure: 0.5, unit: 'px' },
      } as unknown as LetterSpacingToken;
      const ctx = {
        tokenGroups,
        hasParentPrefix: false,
        hasJsOutput: false,
        fontSizeBaseMap,
      };

      const result = processNumericToken(token, TokenType.letterSpacing, ctx);

      expect(result).toContain('letter-spacing-body');
      expect(result).toContain('rem');
    });

    it('should process radius token', () => {
      const token = {
        id: '1',
        name: 'radius-small',
        tokenType: TokenType.radius,
        value: { measure: 4, unit: 'px' },
      } as unknown as RadiusToken;
      const ctx = {
        tokenGroups,
        hasParentPrefix: false,
        hasJsOutput: false,
        fontSizeBaseMap,
      };

      const result = processNumericToken(token, TokenType.radius, ctx);

      expect(result).toContain('radius-small');
      expect(result).toContain('rem');
    });

    it('should process space token', () => {
      const token = {
        id: '1',
        name: 'space-small',
        tokenType: TokenType.space,
        value: { measure: 8, unit: 'px' },
      } as unknown as SpaceToken;
      const ctx = {
        tokenGroups,
        hasParentPrefix: false,
        hasJsOutput: false,
        fontSizeBaseMap,
      };

      const result = processNumericToken(token, TokenType.space, ctx);

      expect(result).toContain('space-small');
      expect(result).toContain('rem');
    });

    it('should process size token', () => {
      const token = {
        id: '1',
        name: 'size-small',
        tokenType: TokenType.size,
        value: { measure: 32, unit: 'px' },
      } as unknown as SizeToken;
      const ctx = {
        tokenGroups,
        hasParentPrefix: false,
        hasJsOutput: false,
        fontSizeBaseMap,
      };

      const result = processNumericToken(token, TokenType.size, ctx);

      expect(result).toContain('size-small');
      expect(result).toContain('rem');
    });

    it('should return null for undefined value', () => {
      const token = {
        id: '1',
        name: 'dimension-undefined',
        tokenType: TokenType.dimension,
        value: { measure: undefined, unit: 'px' },
      } as unknown as DimensionToken;
      const ctx = {
        tokenGroups,
        hasParentPrefix: false,
        hasJsOutput: false,
        fontSizeBaseMap,
      };

      const result = processNumericToken(token, TokenType.dimension, ctx);

      expect(result).toBeNull();
    });
  });
});
