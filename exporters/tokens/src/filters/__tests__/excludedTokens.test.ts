import { type Token, type TokenGroup, TokenType } from '@supernovaio/sdk-exporters';
import { filterExcludedTokens } from '../excludedTokens';
import { exampleTypographyTokens } from '../../../tests/fixtures/exampleTypographyTokens';
import { exampleDimensionAndStringTokens } from '../../../tests/fixtures/exampleDimensionAndStringTokens';

describe('filterExcludedTokens', () => {
  it('should filter out tokens with "figma-" in their name', () => {
    const tokens = Array.from(exampleDimensionAndStringTokens.values());
    const expectedTokens = [
      exampleDimensionAndStringTokens.get('dimensionRef'),
      exampleDimensionAndStringTokens.get('stringRef'),
    ].filter(Boolean) as Token[];

    const filteredTokens = filterExcludedTokens(tokens);

    expect(filteredTokens).toStrictEqual(expectedTokens);
  });

  it('should filter out typography tokens with "Link" in their name', () => {
    const tokens = Array.from(exampleTypographyTokens.values());
    const expectedTokens = [exampleTypographyTokens.get('typographyRef1')] as Token[];

    const filteredTokens = filterExcludedTokens(tokens);

    expect(filteredTokens).toStrictEqual(expectedTokens);
  });

  it('should filter out typography tokens with "Italic" in their name', () => {
    const italicToken = { ...exampleTypographyTokens.get('typographyRef1'), name: 'Bold-Italic' } as Token;
    const tokens = [exampleTypographyTokens.get('typographyRef1'), italicToken].filter(Boolean) as Token[];

    const filteredTokens = filterExcludedTokens(tokens);

    expect(filteredTokens).toStrictEqual([exampleTypographyTokens.get('typographyRef1')]);
  });

  it('should keep tokens that do not match exclusion criteria', () => {
    const tokens = [
      exampleDimensionAndStringTokens.get('dimensionRef'),
      exampleDimensionAndStringTokens.get('stringRef'),
      exampleTypographyTokens.get('typographyRef1'),
    ].filter(Boolean) as Token[];

    const filteredTokens = filterExcludedTokens(tokens);

    expect(filteredTokens).toStrictEqual(tokens);
  });

  it('should filter out both figma tokens and Link typography tokens', () => {
    const tokens = [
      exampleDimensionAndStringTokens.get('dimensionRef'),
      exampleDimensionAndStringTokens.get('figmaTokenRef'),
      exampleTypographyTokens.get('typographyRef1'),
      exampleTypographyTokens.get('typographyRef2'),
    ].filter(Boolean) as Token[];

    const filteredTokens = filterExcludedTokens(tokens);
    const expectedTokens = [
      exampleDimensionAndStringTokens.get('dimensionRef'),
      exampleTypographyTokens.get('typographyRef1'),
    ].filter(Boolean) as Token[];

    expect(filteredTokens).toStrictEqual(expectedTokens);
  });

  describe('typography font weights', () => {
    const groups = [
      { id: 'weights', name: 'Font Weight', path: ['Typography'] },
      { id: 'sizes', name: 'Action', path: ['Typography'] },
      { id: 'grid', name: 'Grid', path: [] },
    ] as unknown as TokenGroup[];
    const stringToken = (id: string, name: string, parentGroupId: string) =>
      ({ id, name, tokenType: TokenType.string, parentGroupId }) as unknown as Token;

    it.each(['Bold', 'Bold Italic', 'Semibold'])('should filter out the string token "%s"', (name) => {
      expect(filterExcludedTokens([stringToken('weight', name, 'weights')], groups)).toStrictEqual([]);
    });

    it('should keep other string tokens', () => {
      const tokens = [stringToken('size', 'Large', 'sizes'), stringToken('columns', 'Columns', 'grid')];

      expect(filterExcludedTokens(tokens, groups)).toStrictEqual(tokens);
    });

    it('should keep string tokens of a sibling group named like the font weight group', () => {
      const siblingGroups = [{ id: 'sibling', name: 'Font Weights', path: ['Typography'] }] as unknown as TokenGroup[];
      const tokens = [stringToken('sibling', 'Bold', 'sibling')];

      expect(filterExcludedTokens(tokens, siblingGroups)).toStrictEqual(tokens);
    });

    it('should keep a token that merely has the font weight path in its name', () => {
      const token = stringToken('named', 'Typography Font Weight Bold', 'grid');

      expect(filterExcludedTokens([token], groups)).toStrictEqual([token]);
    });

    it('should filter out tokens of nested groups of the font weight group', () => {
      const nestedGroups = [
        { id: 'nested', name: 'Italic', path: ['Typography', 'Font Weight'] },
      ] as unknown as TokenGroup[];

      expect(filterExcludedTokens([stringToken('nested-weight', 'Bold', 'nested')], nestedGroups)).toStrictEqual([]);
    });

    it('should keep font weight tokens of other types', () => {
      const token = { ...stringToken('weight', 'Bold', 'weights'), tokenType: TokenType.dimension } as Token;

      expect(filterExcludedTokens([token], groups)).toStrictEqual([token]);
    });
  });
});
