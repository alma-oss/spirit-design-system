import { CollectionKind, type DesignToken, TokenTypeEnum } from '../../../src/core/types';

export const exampleColorsTokens = new Map<string, DesignToken>([
  [
    'actionColorRef',
    {
      id: 'actionColorRef',
      name: 'active',
      type: TokenTypeEnum.Color,
      value: { type: 'color', format: 'hex', value: '#ca2026ff' },
      metadata: {
        groupPath: ['action', 'button', 'primary'],
        groupId: '4',
        originName: 'action/button/primary/default',
        namePath: ['action', 'button', 'primary'],
        collection: CollectionKind.Color,
      },
      source: { adapter: 'test', originalId: 'actionColorRef', originalType: 'Color' },
    },
  ],
  [
    'backgroundColorRef',
    {
      id: 'backgroundColorRef',
      name: 'primary',
      type: TokenTypeEnum.Color,
      value: { type: 'color', format: 'hex', value: '#ffffffff' },
      metadata: {
        groupPath: ['background'],
        groupId: '5',
        originName: 'background/primary',
        namePath: ['background'],
        collection: CollectionKind.Color,
      },
      source: { adapter: 'test', originalId: 'backgroundColorRef', originalType: 'Color' },
    },
  ],
] satisfies Array<[string, DesignToken]>);
