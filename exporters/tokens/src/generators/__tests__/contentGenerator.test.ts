import fs from 'fs';
import path from 'path';
import { type DesignToken, TokenTypeEnum } from '../../core/types';
import { createTokenIndex } from '../../core/tokenIndex';
import { exampleDimensionAndStringTokens } from '../../../tests/fixtures/internal-model/exampleDimensionAndStringTokens';
import { createDesignToken } from '../../../tests/helpers/createDesignToken';
import { commonThemedFilesData, FileData, themedFilesData } from '../../config/fileConfig';
import { createDefaultFontSizeBaseMap } from '../../helpers/unitHelper';
import { exampleThemeShadowTokens } from '../../../tests/fixtures/internal-model/exampleThemeShadowTokens';
import { exampleTypographyTokens } from '../../../tests/fixtures/internal-model/exampleTypographyTokens';
import {
  generateFileContent,
  addDisclaimer,
  filterTokensByType,
  filterTokensByTypeAndGroup,
  generateScssObjectOutput,
  generateJsObjectOutput,
  getGroups,
} from '../contentGenerator';

const mockedExpectedResult = fs.readFileSync(
  path.join(__dirname, '../../../tests/fixtures/exampleFileContent.scss'),
  'utf-8',
);
const tokenIndex = createTokenIndex([]);

describe('contentGenerator', () => {
  describe('generateFileContent', () => {
    it('should generate file content', () => {
      const tokens = Array.from(exampleDimensionAndStringTokens.values());
      const fileData: FileData = {
        fileName: 'testFile',
        tokenTypes: [TokenTypeEnum.Dimension, TokenTypeEnum.String],
        groupNames: ['Grid', 'String'],
        hasStylesObject: true,
        hasParentPrefix: true,
        sortByNumValue: false,
      };

      const fileContent = generateFileContent({
        tokens,
        tokenIndex,
        fileData,
        hasJsOutput: false,
        deviceDimensions: undefined,
        fontSizeBaseMapOverride: undefined,
      });

      expect(fileContent).toStrictEqual({ content: mockedExpectedResult });
    });

    describe('typography font weight tokens', () => {
      const fontWeightToken = createDesignToken(
        TokenTypeEnum.String,
        { type: 'string', value: '12' },
        {
          id: 'fontWeightBold',
          name: 'Bold',
          metadata: {
            groupPath: ['Typography', 'Font Weight'],
            namePath: ['Typography', 'Font Weight'],
            groupId: 'fontWeight',
            originName: 'Typography/Font Weight/Bold',
          },
        },
      );
      const tokens = [...Array.from(exampleDimensionAndStringTokens.values()), fontWeightToken];

      it.each([
        { description: 'by type', groupNames: undefined },
        { description: 'by group', groupNames: ['Grid', 'Typography'] },
      ])('should leave them out when filtering $description', ({ groupNames }) => {
        const { content } = generateFileContent({
          tokens,
          tokenIndex,
          fileData: {
            fileName: 'testFile',
            tokenTypes: [TokenTypeEnum.String],
            groupNames,
            hasStylesObject: false,
            hasParentPrefix: true,
            sortByNumValue: false,
          },
          hasJsOutput: false,
        });

        expect(content).toContain('columns');
        expect(content).not.toContain('font-weight');
      });
    });
  });

  describe('generateFileContent for shadow lengths', () => {
    const findFileData = (filesData: FileData[], fileName: string) =>
      filesData.find((fileData) => fileData.fileName === fileName) as FileData;

    const dataProvider = [
      {
        description: 'theme-collection lengths of any shadow with a single css variables mixin',
        fileData: findFileData(themedFilesData, 'shadows'),
        hasJsOutput: false,
        expectedContent: `$elevation-100-offset-y-01: 0.25rem !default;

$focus-ring-spread-radius-01: 0.125rem !default;

$shadow-100-blur-radius-01: 0.5rem !default;
$shadow-100-offset-y-01: 0.125rem !default;
$shadow-100-offset-y-02: 0.25rem !default;

@mixin shadow-css-variables {
    --spirit-elevation-100-offset-y-01: #{$elevation-100-offset-y-01};
    --spirit-focus-ring-spread-radius-01: #{$focus-ring-spread-radius-01};
    --spirit-shadow-100-blur-radius-01: #{$shadow-100-blur-radius-01};
    --spirit-shadow-100-offset-y-01: #{$shadow-100-offset-y-01};
    --spirit-shadow-100-offset-y-02: #{$shadow-100-offset-y-02};
}
`,
      },
      {
        description: 'theme-collection shadow lengths with js output',
        fileData: findFileData(themedFilesData, 'shadows'),
        hasJsOutput: true,
        expectedContent: `export const elevation100OffsetY01 = '0.25rem';

export const focusRingSpreadRadius01 = '0.125rem';

export const shadow100BlurRadius01 = '0.5rem';
export const shadow100OffsetY01 = '0.125rem';
export const shadow100OffsetY02 = '0.25rem';
`,
      },
      {
        description: 'references to shadow length css variables',
        fileData: findFileData(commonThemedFilesData, 'shadow-tokens'),
        hasJsOutput: false,
        expectedContent: `$elevation-100-offset-y-01: var(--spirit-elevation-100-offset-y-01);

$focus-ring-spread-radius-01: var(--spirit-focus-ring-spread-radius-01);

$shadow-100-blur-radius-01: var(--spirit-shadow-100-blur-radius-01);
$shadow-100-offset-y-01: var(--spirit-shadow-100-offset-y-01);
$shadow-100-offset-y-02: var(--spirit-shadow-100-offset-y-02);
`,
      },
      {
        description: 'references to shadow length css variables with js output',
        fileData: findFileData(commonThemedFilesData, 'shadow-tokens'),
        hasJsOutput: true,
        expectedContent: `export const elevation100OffsetY01 = 'var(--spirit-elevation-100-offset-y-01)';

export const focusRingSpreadRadius01 = 'var(--spirit-focus-ring-spread-radius-01)';

export const shadow100BlurRadius01 = 'var(--spirit-shadow-100-blur-radius-01)';
export const shadow100OffsetY01 = 'var(--spirit-shadow-100-offset-y-01)';
export const shadow100OffsetY02 = 'var(--spirit-shadow-100-offset-y-02)';
`,
      },
    ];

    it.each(dataProvider)('should generate $description', ({ fileData, hasJsOutput, expectedContent }) => {
      const { content } = generateFileContent({
        tokens: Array.from(exampleThemeShadowTokens.values()),
        tokenIndex,
        fileData,
        fontSizeBaseMapOverride: createDefaultFontSizeBaseMap(),
        hasJsOutput,
      });

      expect(content).toBe(addDisclaimer(expectedContent));
    });
  });

  describe('addDisclaimer', () => {
    it('should add disclaimer to the top of the content', () => {
      const content = '/* This is a test content */';
      const expectedContent = `/* This file was generated by Supernova, don't change manually */\n${content}`;

      expect(addDisclaimer(content)).toBe(expectedContent);
    });
  });

  describe('filterTokensByTypeAndGroup', () => {
    const dataProviderItems = [
      {
        type: TokenTypeEnum.Dimension,
        group: 'Grid',
        tokenIdentifier: 'dimensionRef',
        description: 'dimension token type and Grid group',
      },
      {
        type: TokenTypeEnum.String,
        group: 'Grid',
        tokenIdentifier: 'stringRef',
        description: 'string token type and Grid group',
      },
    ];

    const dataTypographyProviderItems = {
      type: TokenTypeEnum.Typography,
      group: 'Heading',
      tokenIdentifier: 'typographyRef1',
    };

    it.each(dataProviderItems)('should filter $description', ({ type, group, tokenIdentifier }) => {
      const tokens = Array.from(exampleDimensionAndStringTokens.values());
      const expectedTokens = [exampleDimensionAndStringTokens.get(tokenIdentifier) as DesignToken];

      expect(filterTokensByTypeAndGroup(tokens, type, group, null)).toStrictEqual(expectedTokens);
    });

    it(`should filter ${dataTypographyProviderItems.type} token type and ${dataTypographyProviderItems.group} group and exclude tokens with "Link" in name`, () => {
      const tokens = Array.from(exampleTypographyTokens.values());
      const expectedTokens = [exampleTypographyTokens.get(dataTypographyProviderItems.tokenIdentifier) as DesignToken];

      const filteredTokens = filterTokensByTypeAndGroup(
        tokens,
        dataTypographyProviderItems.type,
        dataTypographyProviderItems.group,
        null,
      );

      expect(filteredTokens).toStrictEqual(expectedTokens);
    });

    it('should filter tokens with "figma-" prefix', () => {
      const tokens = Array.from(exampleDimensionAndStringTokens.values());
      const expectedTokens = [exampleDimensionAndStringTokens.get('dimensionRef') as DesignToken];

      const filteredTokens = filterTokensByTypeAndGroup(tokens, TokenTypeEnum.Dimension, 'Grid', null);

      expect(filteredTokens).toStrictEqual(expectedTokens);
    });

    it('should filter font weight tokens', () => {
      const fontWeightToken: DesignToken = {
        ...(exampleDimensionAndStringTokens.get('stringRef') as DesignToken),
        name: 'Bold',
        metadata: {
          groupPath: ['Typography', 'Font Weight'],
          namePath: ['Typography', 'Font Weight'],
          groupId: 'fontWeight',
          originName: 'Typography/Font Weight/Bold',
        },
      };

      expect(filterTokensByTypeAndGroup([fontWeightToken], TokenTypeEnum.String, 'Typography', null)).toStrictEqual([]);
      expect(filterTokensByType([fontWeightToken], TokenTypeEnum.String, null)).toStrictEqual([]);
    });
  });

  describe('generateScssObjectOutput', () => {
    it('should generate SCSS object output', () => {
      const stylesObject = {
        $grids: { columns: '$grid-columns', spacing: { desktop: '$grid-spacing-desktop' } },
      };
      const expectedResult = fs.readFileSync(path.join(__dirname, '../__fixtures__/unformattedExample.scss'), 'utf-8');

      const scssOutput = generateScssObjectOutput(stylesObject);

      expect(scssOutput).toBe(expectedResult);
    });
  });

  describe('generateJsObjectOutput', () => {
    it('should generate JS object output', () => {
      const stylesObject = {
        grids: { columns: 'gridColumns', spacing: { desktop: 'gridSpacingDesktop' } },
      };
      const expectedResult = fs.readFileSync(path.join(__dirname, '../__fixtures__/unformattedExample.ts'), 'utf-8');

      const jsOutput = generateJsObjectOutput(stylesObject);

      expect(jsOutput).toBe(expectedResult);
    });
  });

  describe('getGroups', () => {
    it('should return group names', () => {
      const tokens = Array.from(exampleDimensionAndStringTokens.values());
      const excludeGroupNames = ['String'];
      const groupNames = ['Grid'];

      const groups = getGroups(tokens, excludeGroupNames, groupNames);

      expect(groups).toStrictEqual(['grid']);
    });

    it('should return group names without excluded group names', () => {
      const tokens = Array.from(exampleDimensionAndStringTokens.values());
      const excludeGroupNames = ['String', 'Grid'];
      const groupNames = ['Grid'];

      const groups = getGroups(tokens, excludeGroupNames, groupNames);

      expect(groups).toStrictEqual([]);
    });

    it('should return group names with no excluded group names', () => {
      const tokens = Array.from(exampleDimensionAndStringTokens.values());
      const excludeGroupNames = null;
      const groupNames = ['Grid', 'String'];

      const groups = getGroups(tokens, excludeGroupNames, groupNames);

      expect(groups).toStrictEqual(['grid', 'string']);
    });

    it('should not return group names', () => {
      const tokens = Array.from(exampleDimensionAndStringTokens.values());
      const excludeGroupNames = ['Grid', 'String'];
      const groupNames = [''];

      const groups = getGroups(tokens, excludeGroupNames, groupNames);

      expect(groups).toStrictEqual([]);
    });
  });
});
