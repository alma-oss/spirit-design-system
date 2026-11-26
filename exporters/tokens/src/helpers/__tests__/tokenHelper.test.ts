import { type DesignToken, TokenTypeEnum } from '../../core/types';
import {
  exampleDeviceTokenDimension,
  exampleDeviceTokenEqualValue,
  exampleDeviceTokenFontSize,
  exampleDeviceTokenLetterSpacing,
  exampleDeviceTokenLineHeight,
  exampleDeviceTokenSize,
  exampleDeviceTokenString,
  exampleDeviceUpdatedTokens,
} from '../../../tests/fixtures/internal-model/exampleDeviceTokens';
import { exampleDimensionAndStringTokens } from '../../../tests/fixtures/internal-model/exampleDimensionAndStringTokens';
import { createDesignToken } from '../../../tests/helpers/createDesignToken';
import {
  addAngleVarToGradient,
  addEmptyLineBetweenTokenGroups,
  formatTokenStyleByOutput,
  getTokenGroup,
  sortTokens,
  tokenVariableName,
} from '../tokenHelper';

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
        const result = tokenVariableName(tokenRef!, hasParentPrefix);

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
      const hasParentPrefix = true;
      const sortByNumValue = false;

      const result = sortTokens(tokens, hasParentPrefix, sortByNumValue);

      expect(result[0]?.metadata.originName).toBe('Grid/Columns');
      expect(result[1]?.metadata.originName).toBe('Grid/spacing/desktop');
    });

    it('should sort tokens by variable name if they have the same value', () => {
      const tokens = Array.from(exampleDeviceTokenEqualValue.values());
      const hasParentPrefix = true;
      const sortByNumValue = true;

      const result = sortTokens(tokens, hasParentPrefix, sortByNumValue);

      expect(result[0]?.metadata.originName).toBe('breakpoint-mobile');
      expect(result[1]?.metadata.originName).toBe('breakpoint-tablet');
    });

    it('should sort numbers in variable names by their value', () => {
      const tokens = ['1000', '200', '50'].map((name) =>
        createDesignToken(
          TokenTypeEnum.Radius,
          { type: 'number', value: 0 },
          { id: name, name, metadata: { originName: `Radius/${name}`, groupPath: ['Radius'] } },
        ),
      );

      const result = sortTokens(tokens, true, false);

      expect(result.map(({ metadata }) => metadata.originName)).toEqual(['Radius/50', 'Radius/200', 'Radius/1000']);
    });

    it('should sort the device variants of a token as mobile, tablet, desktop', () => {
      const tokens = ['desktop', 'tablet', 'mobile'].map((device) =>
        createDesignToken(
          TokenTypeEnum.FontSize,
          { type: 'number', value: 16, unit: 'px' },
          { id: device, name: 'font-size', metadata: { device, groupPath: ['Typography'] } },
        ),
      );

      const result = sortTokens(tokens, true, true);

      expect(result.map(({ metadata }) => metadata.device)).toEqual(['mobile', 'tablet', 'desktop']);
    });

    it('should sort the variants of an unknown device by their number value', () => {
      const variants: Array<[string, number]> = [
        ['desktop', 24],
        ['wide', 32],
        ['mobile', 16],
        ['compact', 12],
      ];
      const tokens = variants.map(([device, value]) =>
        createDesignToken(
          TokenTypeEnum.FontSize,
          { type: 'number', value, unit: 'px' },
          { id: device, name: 'font-size', metadata: { device, groupPath: ['Typography'] } },
        ),
      );

      const result = sortTokens(tokens, true, false);

      expect(result.map(({ metadata }) => metadata.device)).toEqual(['compact', 'mobile', 'desktop', 'wide']);
    });

    const sortByNumValueCases: Array<{
      tokenType: TokenTypeEnum;
      tokenSource: Map<string, DesignToken>;
      expectedFirst: number;
      expectedSecond: number;
    }> = [
      {
        tokenType: TokenTypeEnum.Dimension,
        tokenSource: exampleDeviceTokenDimension,
        expectedFirst: 768,
        expectedSecond: 1200,
      },
      {
        tokenType: TokenTypeEnum.Size,
        tokenSource: exampleDeviceTokenSize,
        expectedFirst: 0,
        expectedSecond: 768,
      },
      {
        tokenType: TokenTypeEnum.FontSize,
        tokenSource: exampleDeviceTokenFontSize,
        expectedFirst: 15,
        expectedSecond: 30,
      },
      {
        tokenType: TokenTypeEnum.LineHeight,
        tokenSource: exampleDeviceTokenLineHeight,
        expectedFirst: 30,
        expectedSecond: 45,
      },
      {
        tokenType: TokenTypeEnum.LetterSpacing,
        tokenSource: exampleDeviceTokenLetterSpacing,
        expectedFirst: -0.02,
        expectedSecond: -0.01,
      },
    ];

    it.each(sortByNumValueCases)(
      'should sort $tokenType Tokens by number value',
      ({ tokenSource, expectedFirst, expectedSecond }) => {
        const tokens = Array.from(tokenSource.values());
        const hasParentPrefix = true;
        const sortByNumValue = true;
        const result = sortTokens(tokens, hasParentPrefix, sortByNumValue);

        expect(result[0]?.value).toMatchObject({ type: 'number', value: expectedFirst });
        expect(result[1]?.value).toMatchObject({ type: 'number', value: expectedSecond });
      },
    );

    it('should sort TokenString by number value', () => {
      const tokens = Array.from(exampleDeviceTokenString.values());
      const hasParentPrefix = true;
      const sortByNumValue = true;

      const result = sortTokens(tokens, hasParentPrefix, sortByNumValue);

      expect(result[0].value).toEqual({ type: 'string', value: '10' });
      expect(result[1].value).toEqual({ type: 'string', value: '30' });
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

  describe('getTokenGroup', () => {
    it('should extract the group name from token origin path', () => {
      const token = exampleDimensionAndStringTokens.get('dimensionRef')!;
      const group = getTokenGroup(token);

      expect(group).toBe('grid');
    });

    it('should return lowercase group name', () => {
      const token = createDesignToken(
        TokenTypeEnum.Dimension,
        { type: 'number', value: 32, unit: 'px' },
        { metadata: { originName: 'Spacing/Large' } },
      );
      const group = getTokenGroup(token);

      expect(group).toBe('spacing');
    });

    it('should extract first part of path before slash', () => {
      const token = createDesignToken(
        TokenTypeEnum.Dimension,
        { type: 'number', value: 32, unit: 'px' },
        { metadata: { originName: 'Group/Subgroup/Token' } },
      );
      const group = getTokenGroup(token);

      expect(group).toBe('group');
    });

    it('should fall back to the group path when the source has no origin name', () => {
      const token = createDesignToken(
        TokenTypeEnum.Dimension,
        { type: 'number', value: 1, unit: 'px' },
        { metadata: { groupPath: ['Spacing', 'inner'] } },
      );

      expect(getTokenGroup(token)).toBe('spacing');
    });
  });
});
