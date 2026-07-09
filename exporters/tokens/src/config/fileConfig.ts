import { TokenType } from '@supernovaio/sdk-exporters';

export type FileData = {
  fileName: string;
  tokenTypes: TokenType[];
  groupNames?: string[];
  excludeGroupNames?: string[] | null;
  hasMixin?: boolean;
  hasStylesObject?: boolean;
  hasParentPrefix?: boolean;
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

export const themedFilesData: FileData[] = [
  {
    fileName: 'colors',
    tokenTypes: [TokenType.color],
    hasMixin: true,
    hasStylesObject: false,
  },
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

export const commonThemedFilesData: FileData[] = [{ fileName: 'color-tokens', tokenTypes: [TokenType.color] }];
