import {
  DimensionToken,
  FontSizeToken,
  LetterSpacingToken,
  LineHeightToken,
  SizeToken,
  StringToken,
  Token,
  TokenGroup,
  TokenType,
  TypographyToken,
} from '@supernovaio/sdk-exporters';
import {
  exampleDeviceTokenDimension,
  exampleDeviceTokenFontSize,
  exampleDeviceTokenLetterSpacing,
  exampleDeviceTokenLineHeight,
  exampleDeviceTokenSize,
  exampleDeviceTokenString,
  exampleDeviceUpdatedTokens,
} from '../../../tests/fixtures/exampleDeviceTokens';
import { exampleDimensionAndStringTokens } from '../../../tests/fixtures/exampleDimensionAndStringTokens';
import { exampleGroups } from '../../../tests/fixtures/exampleGroups';
import { exampleTypographyTokens, expectedTypographyValue } from '../../../tests/fixtures/exampleTypographyTokens';
import { sampleConfigurationDefault } from '../../../tests/fixtures/sampleConfiguration';
import {
  addAngleVarToGradient,
  addEmptyLineBetweenTokenGroups,
  formatTokenStyleByOutput,
  getTokenGroup,
  sortTokens,
  tokenVariableName,
  typographyValue,
} from '../tokenHelper';
import { filterExcludedTokens } from '../../filters/excludedTokens';

jest.mock('../../../config', () => ({
  exportConfiguration: sampleConfigurationDefault,
}));

const dataProvider = [
  {
    hasParentPrefix: true,
    description: 'with parent prefix',
    expectedVariableName: 'grid-spacing-desktop',
    tokenRef: exampleDimensionAndStringTokens.get('dimensionRef'),
  },
  {
    hasParentPrefix: false,
    description: 'without parent prefix',
    expectedVariableName: 'desktop',
    tokenRef: exampleDimensionAndStringTokens.get('dimensionRef'),
  },
  {
    hasParentPrefix: false,
    description: 'with device suffix',
    expectedVariableName: 'spacing-mobile',
    tokenRef: exampleDeviceUpdatedTokens.get('stringRef1'),
  },
];

describe('tokenHelper', () => {
  describe.each(dataProvider)(
    'tokenVariableName',
    ({ hasParentPrefix, description, expectedVariableName, tokenRef }) => {
      it(`should return the expected variable name for exampleToken ${description} parent prefix`, () => {
        const mockedToken: Token = tokenRef as Token;
        const mockedTokenGroups: Array<TokenGroup> = exampleGroups;

        const result = tokenVariableName(mockedToken, mockedTokenGroups, hasParentPrefix);

        expect(result).toBe(expectedVariableName);
      });
    },
  );

  describe('formatTokenStyleByOutput', () => {
    it('should return the expected formatted token name with unit', () => {
      const name = 'grid-spacing-desktop';
      const value = 32;
      const unit = 'px';

      const result = formatTokenStyleByOutput(name, value, false, unit);

      expect(result).toBe('$grid-spacing-desktop: 32px !default;');
    });

    it('should return the expected formatted token name without unit', () => {
      const name = 'grid-columns';
      const value = 12;

      const result = formatTokenStyleByOutput(name, value, false);

      expect(result).toBe('$grid-columns: 12 !default;');
    });

    it('should return the expected formatted token name for js output', () => {
      const name = 'grid-spacing-desktop';
      const value = 32;
      const unit = 'px';

      const result = formatTokenStyleByOutput(name, value, true, unit);

      expect(result).toBe("export const gridSpacingDesktop = '32px';");
    });

    it('should return the expected formatted token name for js output without unit', () => {
      const name = 'grid-columns';
      const value = 12;

      const result = formatTokenStyleByOutput(name, value, true);

      expect(result).toBe('export const gridColumns = 12;');
    });

    it('should return the expected formatted token for zero values with unit', () => {
      const name = 'grid-columns';
      const value = 0;
      const unit = 'px';

      const result = formatTokenStyleByOutput(name, value, false, unit);

      expect(result).toBe('$grid-columns: 0 !default;');
    });

    it('should return the expected formatted token for zero values with unit for js output', () => {
      const name = 'grid-columns';
      const value = 0;
      const unit = 'px';

      const result = formatTokenStyleByOutput(name, value, true, unit);

      expect(result).toBe('export const gridColumns = 0;');
    });
  });

  describe('sortTokens', () => {
    it('should sort tokens by variable name', () => {
      const tokens = Array.from(exampleDimensionAndStringTokens.values());
      const tokenGroups = exampleGroups;
      const hasParentPrefix = true;
      const sortByNumValue = false;

      const result = sortTokens(tokens, tokenGroups, hasParentPrefix, sortByNumValue);

      expect(result[0]?.origin?.name).toBe('Grid/Columns');
      expect(result[1]?.origin?.name).toBe('Grid/spacing/desktop');
    });

    const sortByNumValueCases: Array<{
      tokenType: string;
      tokenSource: Map<string, Token>;
      expectedFirst: number;
      expectedSecond: number;
    }> = [
      {
        tokenType: TokenType.dimension,
        tokenSource: exampleDeviceTokenDimension,
        expectedFirst: 768,
        expectedSecond: 1200,
      },
      {
        tokenType: TokenType.size,
        tokenSource: exampleDeviceTokenSize,
        expectedFirst: 0,
        expectedSecond: 768,
      },
      {
        tokenType: TokenType.fontSize,
        tokenSource: exampleDeviceTokenFontSize,
        expectedFirst: 15,
        expectedSecond: 30,
      },
      {
        tokenType: TokenType.lineHeight,
        tokenSource: exampleDeviceTokenLineHeight,
        expectedFirst: 30,
        expectedSecond: 45,
      },
      {
        tokenType: TokenType.letterSpacing,
        tokenSource: exampleDeviceTokenLetterSpacing,
        expectedFirst: -0.02,
        expectedSecond: -0.01,
      },
    ];

    it.each(sortByNumValueCases)(
      'should sort $tokenType Tokens by number value',
      ({ tokenSource, expectedFirst, expectedSecond }) => {
        const tokens = Array.from(tokenSource.values());
        const tokenGroups = exampleGroups;
        const hasParentPrefix = true;
        const sortByNumValue = true;
        type NumericSortableToken = DimensionToken | SizeToken | FontSizeToken | LineHeightToken | LetterSpacingToken;
        const result = sortTokens(tokens, tokenGroups, hasParentPrefix, sortByNumValue) as NumericSortableToken[];

        expect(result[0]?.value?.measure).toBe(expectedFirst);
        expect(result[1]?.value?.measure).toBe(expectedSecond);
      },
    );

    it('should sort TokenString by number value', () => {
      const tokens = Array.from(exampleDeviceTokenString.values());
      const tokenGroups = exampleGroups;
      const hasParentPrefix = true;
      const sortByNumValue = true;

      const result = sortTokens(tokens, tokenGroups, hasParentPrefix, sortByNumValue) as StringToken[];

      expect(result[0].value?.text).toBe('10');
      expect(result[1].value?.text).toBe('30');
    });
  });

  describe('addEmptyLineBetweenTokenGroups', () => {
    it('should add empty line between token groups', () => {
      const cssTokens = [
        { css: '$grid-columns: 12 !default;', parentGroupId: '1' },
        { css: '$grid-spacing-desktop: 32px !default;', parentGroupId: '2' },
      ];

      const result = addEmptyLineBetweenTokenGroups(cssTokens);

      expect(result).toBe('$grid-columns: 12 !default;\n\n$grid-spacing-desktop: 32px !default;');
    });
  });

  describe('addAngleVarToGradient', () => {
    it('should add angle variable to gradient', () => {
      const inputString = 'linear-gradient(90deg, #000 0%, #fff 100%)';
      const expectedOutput = 'linear-gradient(var(--gradient-angle, 90deg), #000 0%, #fff 100%)';

      const result = addAngleVarToGradient(inputString);

      expect(result).toBe(expectedOutput);
    });

    it('should return the input string if no match is found', () => {
      const inputString = 'example string';

      const result = addAngleVarToGradient(inputString);

      expect(result).toBe(inputString);
    });
  });

  describe('typographyValue', () => {
    it('should return the expected typography value', () => {
      const mockedToken: TypographyToken = exampleTypographyTokens.get('typographyRef1') as TypographyToken;
      const tokenValue = typographyValue(mockedToken.value, true, false);

      expect(tokenValue).toBe(expectedTypographyValue);
    });
  });

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
  });

  describe('getTokenGroup', () => {
    it('should extract the group name from token origin path', () => {
      const token = exampleDimensionAndStringTokens.get('dimensionRef') as Token;
      const group = getTokenGroup(token);

      expect(group).toBe('grid');
    });

    it('should return lowercase group name', () => {
      const token = {
        ...exampleDimensionAndStringTokens.get('dimensionRef'),
        origin: { name: 'Spacing/Large' },
      } as Token;
      const group = getTokenGroup(token);

      expect(group).toBe('spacing');
    });

    it('should extract first part of path before slash', () => {
      const token = {
        ...exampleDimensionAndStringTokens.get('dimensionRef'),
        origin: { name: 'Group/Subgroup/Token' },
      } as Token;
      const group = getTokenGroup(token);

      expect(group).toBe('group');
    });
  });
});
