import { Token, TokenType } from '@supernovaio/sdk-exporters';
import { COLOR_CSS_VARIABLE_PREFIX, TOKEN_COLLECTION_THEMES_NAME } from '../constants';
import { getShadowLengthTokens } from '../filters/shadowLengthTokens';

export type FileData = {
  fileName: string;
  tokenTypes: TokenType[];
  collectionName?: string;
  prepareTokens?: (tokens: Token[]) => Token[];
  groupNames?: string[];
  excludeGroupNames?: string[] | null;
  mixinName?: string | null;
  cssVariablePrefix?: string;
  hasCssVariableReferences?: boolean;
  hasStylesObject?: boolean;
  hasParentPrefix?: boolean;
  hasTopLevelGroupPrefix?: boolean;
  sortByNumValue?: boolean;
};

export const nonThemedFilesData: FileData[] = [
  {
    fileName: 'borders',
    tokenTypes: [TokenType.dimension, TokenType.borderWidth],
    groupNames: ['Border'],
    hasStylesObject: false,
    sortByNumValue: true,
  },
  {
    fileName: 'other',
    tokenTypes: [
      TokenType.dimension,
      TokenType.string,
      TokenType.space,
      TokenType.radius,
      TokenType.border,
      TokenType.borderWidth,
      TokenType.size,
    ],
    excludeGroupNames: ['Border', 'Radius', 'Spacing'],
    sortByNumValue: true,
  },
  {
    fileName: 'radii',
    tokenTypes: [TokenType.dimension, TokenType.radius],
    groupNames: ['Radius'],
    hasParentPrefix: false,
    sortByNumValue: true,
  },
  {
    fileName: 'spacing',
    tokenTypes: [TokenType.dimension, TokenType.space],
    groupNames: ['Spacing'],
    hasParentPrefix: false,
    sortByNumValue: true,
  },
  {
    fileName: 'shadows',
    tokenTypes: [TokenType.shadow],
    hasParentPrefix: false,
  },
  {
    fileName: 'gradients',
    tokenTypes: [TokenType.gradient],
    hasParentPrefix: true,
  },
  {
    fileName: 'typography',
    tokenTypes: [TokenType.typography],
  },
];

const shadowLengthFileData = {
  tokenTypes: [TokenType.dimension],
  collectionName: TOKEN_COLLECTION_THEMES_NAME,
  prepareTokens: getShadowLengthTokens,
  hasStylesObject: false,
  hasTopLevelGroupPrefix: false,
} satisfies Partial<FileData>;

export const themedFilesData: FileData[] = [
  {
    fileName: 'colors',
    tokenTypes: [TokenType.color],
    mixinName: 'color-css-variables',
    cssVariablePrefix: COLOR_CSS_VARIABLE_PREFIX,
    hasStylesObject: false,
  },
  { fileName: 'shadows', ...shadowLengthFileData, mixinName: 'shadow-css-variables' },
];

export const devicesFilesData: FileData[] = [
  {
    fileName: 'devices',
    tokenTypes: [
      TokenType.dimension,
      TokenType.fontSize,
      TokenType.letterSpacing,
      TokenType.lineHeight,
      TokenType.radius,
      TokenType.size,
      TokenType.string,
    ],
    sortByNumValue: true,
  },
];

export const commonThemedFilesData: FileData[] = [
  {
    fileName: 'color-tokens',
    tokenTypes: [TokenType.color],
    hasCssVariableReferences: true,
    cssVariablePrefix: COLOR_CSS_VARIABLE_PREFIX,
  },
  { fileName: 'shadow-tokens', ...shadowLengthFileData, hasCssVariableReferences: true },
];
