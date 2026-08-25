export type FileCategory = 'borders' | 'other' | 'radii' | 'spacing' | 'shadows' | 'gradients' | 'typography' | 'colors' | 'color-tokens' | 'devices';

export interface FileSpec {
  fileName: FileCategory;
  kinds: string[];
  groupNames?: string[];
  excludeGroupNames?: string[];
  hasMixin?: boolean;
  hasStylesObject?: boolean;
  hasParentPrefix?: boolean;
  sortByNumValue?: boolean;
}

export const nonThemedFiles: FileSpec[] = [
  {
    fileName: 'borders',
    kinds: ['dimension', 'borderWidth'],
    groupNames: ['border'],
    hasStylesObject: false,
    sortByNumValue: true,
  },
  {
    fileName: 'other',
    kinds: ['dimension', 'string', 'space', 'radius', 'borderWidth', 'size'],
    excludeGroupNames: ['border', 'radius', 'spacing'],
    sortByNumValue: true,
  },
  {
    fileName: 'radii',
    kinds: ['dimension', 'radius'],
    groupNames: ['radius'],
    hasParentPrefix: false,
    sortByNumValue: true,
  },
  {
    fileName: 'spacing',
    kinds: ['dimension', 'space'],
    groupNames: ['spacing'],
    hasParentPrefix: false,
    sortByNumValue: true,
  },
  {
    fileName: 'shadows',
    kinds: ['shadow'],
    hasParentPrefix: false,
  },
  {
    fileName: 'gradients',
    kinds: ['gradient'],
    hasParentPrefix: true,
  },
  {
    fileName: 'typography',
    kinds: ['typography'],
  },
];

export const themedFiles: FileSpec[] = [
  {
    fileName: 'colors',
    kinds: ['color'],
    hasMixin: true,
    hasStylesObject: false,
  },
];

export const devicesFiles: FileSpec[] = [
  {
    fileName: 'devices',
    kinds: ['radius', 'dimension', 'fontSize', 'lineHeight', 'letterSpacing', 'size', 'string'],
    sortByNumValue: true,
  },
];

export const commonThemedFiles: FileSpec[] = [{ fileName: 'color-tokens', kinds: ['color'] }];
