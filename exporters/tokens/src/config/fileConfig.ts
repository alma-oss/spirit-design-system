import type { Token } from '@supernovaio/sdk-exporters';
import { SOURCE_TOKEN_TYPE, type SourceTokenType } from '../core/types';
import { COLOR_CSS_VARIABLE_PREFIX, TOKEN_COLLECTION_THEMES_NAME } from '../constants';
import { getShadowLengthTokens } from '../filters/shadowLengthTokens';

export type FileData = {
  fileName: string;
  tokenTypes: SourceTokenType[];
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
    tokenTypes: [SOURCE_TOKEN_TYPE.dimension, SOURCE_TOKEN_TYPE.borderWidth],
    groupNames: ['Border'],
    hasStylesObject: false,
    sortByNumValue: true,
  },
  {
    fileName: 'other',
    tokenTypes: [
      SOURCE_TOKEN_TYPE.dimension,
      SOURCE_TOKEN_TYPE.string,
      SOURCE_TOKEN_TYPE.space,
      SOURCE_TOKEN_TYPE.radius,
      SOURCE_TOKEN_TYPE.border,
      SOURCE_TOKEN_TYPE.borderWidth,
      SOURCE_TOKEN_TYPE.size,
    ],
    excludeGroupNames: ['Border', 'Radius', 'Spacing'],
    sortByNumValue: true,
  },
  {
    fileName: 'radii',
    tokenTypes: [SOURCE_TOKEN_TYPE.dimension, SOURCE_TOKEN_TYPE.radius],
    groupNames: ['Radius'],
    hasParentPrefix: false,
    sortByNumValue: true,
  },
  {
    fileName: 'spacing',
    tokenTypes: [SOURCE_TOKEN_TYPE.dimension, SOURCE_TOKEN_TYPE.space],
    groupNames: ['Spacing'],
    hasParentPrefix: false,
    sortByNumValue: true,
  },
  {
    fileName: 'shadows',
    tokenTypes: [SOURCE_TOKEN_TYPE.shadow],
    hasParentPrefix: false,
  },
  {
    fileName: 'gradients',
    tokenTypes: [SOURCE_TOKEN_TYPE.gradient],
    hasParentPrefix: true,
  },
  {
    fileName: 'typography',
    tokenTypes: [SOURCE_TOKEN_TYPE.typography],
  },
];

const shadowLengthFileData = {
  tokenTypes: [SOURCE_TOKEN_TYPE.dimension],
  collectionName: TOKEN_COLLECTION_THEMES_NAME,
  prepareTokens: getShadowLengthTokens,
  hasStylesObject: false,
  hasTopLevelGroupPrefix: false,
} satisfies Partial<FileData>;

export const themedFilesData: FileData[] = [
  {
    fileName: 'colors',
    tokenTypes: [SOURCE_TOKEN_TYPE.color],
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
      SOURCE_TOKEN_TYPE.dimension,
      SOURCE_TOKEN_TYPE.fontSize,
      SOURCE_TOKEN_TYPE.letterSpacing,
      SOURCE_TOKEN_TYPE.lineHeight,
      SOURCE_TOKEN_TYPE.radius,
      SOURCE_TOKEN_TYPE.size,
      SOURCE_TOKEN_TYPE.string,
      SOURCE_TOKEN_TYPE.space,
    ],
    sortByNumValue: true,
  },
];

export const commonThemedFilesData: FileData[] = [
  {
    fileName: 'color-tokens',
    tokenTypes: [SOURCE_TOKEN_TYPE.color],
    hasCssVariableReferences: true,
    cssVariablePrefix: COLOR_CSS_VARIABLE_PREFIX,
  },
  { fileName: 'shadow-tokens', ...shadowLengthFileData, hasCssVariableReferences: true },
];
