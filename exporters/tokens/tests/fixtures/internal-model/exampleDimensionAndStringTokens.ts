import { CollectionKind, type DesignToken, TokenTypeEnum } from '../../../src/core/types';

export const exampleDimensionAndStringTokens = new Map<string, DesignToken>([
  [
    'dimensionRef',
    {
      id: 'dimensionRef',
      name: 'desktop',
      type: TokenTypeEnum.Dimension,
      value: { type: 'number', value: 32, unit: 'px' },
      metadata: {
        groupPath: ['Grid', 'spacing'],
        groupId: '1',
        originName: 'Grid/spacing/desktop',
        namePath: ['Grid', 'spacing'],
        collection: CollectionKind.Global,
      },
      source: { adapter: 'test', originalId: 'dimensionRef', originalType: 'Dimension' },
    },
  ],
  [
    'stringRef',
    {
      id: 'stringRef',
      name: 'Columns',
      type: TokenTypeEnum.String,
      value: { type: 'string', value: '12' },
      metadata: {
        groupPath: ['Grid'],
        groupId: '2',
        originName: 'Grid/Columns',
        namePath: ['Grid'],
        collection: CollectionKind.Global,
      },
      source: { adapter: 'test', originalId: 'stringRef', originalType: 'String' },
    },
  ],
  [
    'figmaTokenRef',
    {
      id: 'figmaTokenRef',
      name: 'figma-internal-token',
      type: TokenTypeEnum.Dimension,
      value: { type: 'number', value: 32, unit: 'px' },
      metadata: {
        groupPath: ['Typography'],
        groupId: '3',
        originName: 'Grid/spacing/figma-internal-token',
        namePath: ['Typography'],
        collection: CollectionKind.Global,
      },
      source: { adapter: 'test', originalId: 'figmaTokenRef', originalType: 'Dimension' },
    },
  ],
] satisfies Array<[string, DesignToken]>);

export const exampleInvariantTokens = new Map<string, DesignToken>([
  [
    'radiiRef',
    {
      id: 'radiiRef',
      name: 'radius-full',
      type: TokenTypeEnum.Dimension,
      value: { type: 'number', value: 9999, unit: 'px' },
      metadata: {
        groupPath: ['Grid', 'spacing'],
        groupId: '1',
        originName: 'Radius/radius-full',
        namePath: ['Grid', 'spacing'],
        collection: CollectionKind.Global,
      },
      source: { adapter: 'test', originalId: 'radiiRef', originalType: 'Dimension' },
    },
  ],
] satisfies Array<[string, DesignToken]>);
