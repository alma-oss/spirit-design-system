import { COLOR_CSS_VARIABLE_PREFIX } from '../constants';
import { CollectionKind, type DesignToken, TokenTypeEnum } from '../core/types';
import { getShadowLengthTokens } from '../filters/shadowLengthTokens';

export type FileData = {
  fileName: string;
  tokenTypes: TokenTypeEnum[];
  /** Keeps the tokens of this collection only. */
  collection?: CollectionKind;
  prepareTokens?: (tokens: DesignToken[]) => DesignToken[];
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
    tokenTypes: [TokenTypeEnum.Dimension, TokenTypeEnum.BorderWidth],
    groupNames: ['Border'],
    hasStylesObject: false,
    sortByNumValue: true,
  },
  {
    fileName: 'other',
    tokenTypes: [
      TokenTypeEnum.Dimension,
      TokenTypeEnum.String,
      TokenTypeEnum.Space,
      TokenTypeEnum.Radius,
      TokenTypeEnum.Border,
      TokenTypeEnum.BorderWidth,
      TokenTypeEnum.Size,
    ],
    excludeGroupNames: ['Border', 'Radius', 'Spacing'],
    sortByNumValue: true,
  },
  {
    fileName: 'radii',
    tokenTypes: [TokenTypeEnum.Dimension, TokenTypeEnum.Radius],
    groupNames: ['Radius'],
    hasParentPrefix: false,
    sortByNumValue: true,
  },
  {
    fileName: 'spacing',
    tokenTypes: [TokenTypeEnum.Dimension, TokenTypeEnum.Space],
    groupNames: ['Spacing'],
    hasParentPrefix: false,
    sortByNumValue: true,
  },
  {
    fileName: 'shadows',
    tokenTypes: [TokenTypeEnum.Shadow],
    hasParentPrefix: false,
  },
  {
    fileName: 'gradients',
    tokenTypes: [TokenTypeEnum.Gradient],
    hasParentPrefix: true,
  },
  {
    fileName: 'typography',
    tokenTypes: [TokenTypeEnum.Typography],
  },
];

const shadowLengthFileData = {
  tokenTypes: [TokenTypeEnum.Dimension],
  collection: CollectionKind.Color,
  prepareTokens: getShadowLengthTokens,
  hasStylesObject: false,
  hasTopLevelGroupPrefix: false,
} satisfies Partial<FileData>;

export const themedFilesData: FileData[] = [
  {
    fileName: 'colors',
    tokenTypes: [TokenTypeEnum.Color],
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
      TokenTypeEnum.Dimension,
      TokenTypeEnum.FontSize,
      TokenTypeEnum.LetterSpacing,
      TokenTypeEnum.LineHeight,
      TokenTypeEnum.Radius,
      TokenTypeEnum.Size,
      TokenTypeEnum.String,
    ],
    sortByNumValue: true,
  },
];

export const commonThemedFilesData: FileData[] = [
  {
    fileName: 'color-tokens',
    tokenTypes: [TokenTypeEnum.Color],
    hasCssVariableReferences: true,
    cssVariablePrefix: COLOR_CSS_VARIABLE_PREFIX,
  },
  { fileName: 'shadow-tokens', ...shadowLengthFileData, hasCssVariableReferences: true },
];
