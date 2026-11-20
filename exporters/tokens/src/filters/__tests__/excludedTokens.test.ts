import { type DesignToken, TokenTypeEnum } from '../../core/types';
import { filterExcludedTokens } from '../excludedTokens';
import { exampleTypographyTokens } from '../../../tests/fixtures/internal-model/exampleTypographyTokens';
import { exampleDimensionAndStringTokens } from '../../../tests/fixtures/internal-model/exampleDimensionAndStringTokens';

const fixture = (tokens: Map<string, DesignToken>, id: string): DesignToken => tokens.get(id) as DesignToken;

const dimension = fixture(exampleDimensionAndStringTokens, 'dimensionRef');
const string = fixture(exampleDimensionAndStringTokens, 'stringRef');
const figma = fixture(exampleDimensionAndStringTokens, 'figmaTokenRef');
const typography = fixture(exampleTypographyTokens, 'typographyRef1');
const typographyLink = fixture(exampleTypographyTokens, 'typographyRef2');

describe('filterExcludedTokens', () => {
  it('should filter out tokens with "figma-" in their name', () => {
    expect(filterExcludedTokens([dimension, string, figma])).toStrictEqual([dimension, string]);
  });

  it('should filter out typography tokens with "Link" in their name', () => {
    expect(filterExcludedTokens([typography, typographyLink])).toStrictEqual([typography]);
  });

  it('should filter out typography tokens with "Italic" in their name', () => {
    const italicToken = { ...typography, name: 'Bold-Italic' };

    expect(filterExcludedTokens([typography, italicToken])).toStrictEqual([typography]);
  });

  it('should keep tokens that do not match exclusion criteria', () => {
    const tokens = [dimension, string, typography];

    expect(filterExcludedTokens(tokens)).toStrictEqual(tokens);
  });

  it('should filter out both figma tokens and Link typography tokens', () => {
    expect(filterExcludedTokens([dimension, figma, typography, typographyLink])).toStrictEqual([dimension, typography]);
  });

  describe('typography font weights', () => {
    const stringToken = (id: string, name: string, groupPath: string[]): DesignToken => ({
      ...string,
      id,
      name,
      metadata: { ...string.metadata, groupPath },
    });

    it.each(['Bold', 'Bold Italic', 'Semibold'])('should filter out the string token "%s"', (name) => {
      expect(filterExcludedTokens([stringToken('weight', name, ['Typography', 'Font Weight'])])).toStrictEqual([]);
    });

    it('should keep other string tokens', () => {
      const tokens = [
        stringToken('size', 'Large', ['Typography', 'Action']),
        stringToken('columns', 'Columns', ['Grid']),
      ];

      expect(filterExcludedTokens(tokens)).toStrictEqual(tokens);
    });

    it('should keep string tokens of a sibling group named like the font weight group', () => {
      const tokens = [stringToken('sibling', 'Bold', ['Typography', 'Font Weights'])];

      expect(filterExcludedTokens(tokens)).toStrictEqual(tokens);
    });

    it('should keep a token that merely has the font weight path in its name', () => {
      const tokens = [stringToken('named', 'Typography Font Weight Bold', ['Grid'])];

      expect(filterExcludedTokens(tokens)).toStrictEqual(tokens);
    });

    it('should filter out tokens of nested groups of the font weight group', () => {
      const tokens = [stringToken('nested-weight', 'Bold', ['Typography', 'Font Weight', 'Italic'])];

      expect(filterExcludedTokens(tokens)).toStrictEqual([]);
    });

    it('should keep font weight tokens of other types', () => {
      const token = { ...stringToken('weight', 'Bold', ['Typography', 'Font Weight']), type: TokenTypeEnum.Dimension };

      expect(filterExcludedTokens([token])).toStrictEqual([token]);
    });
  });
});
