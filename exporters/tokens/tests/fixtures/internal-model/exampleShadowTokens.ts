import { CollectionKind, type DesignToken, TokenTypeEnum } from '../../../src/core/types';

export const exampleShadowTokens = new Map<string, DesignToken>([
  [
    'shadowRef',
    {
      id: 'shadowRef',
      name: 'shadow-100',
      type: TokenTypeEnum.Shadow,
      value: {
        type: 'composite',
        value: {
          '0': {
            type: 'composite',
            value: {
              inset: { type: 'boolean', value: false },
              x: { type: 'number', value: 0, unit: 'px' },
              y: { type: 'number', value: 2, unit: 'px' },
              blur: { type: 'number', value: 8, unit: 'px' },
              spread: { type: 'number', value: 0, unit: 'px' },
              color: { type: 'color', format: 'hex', value: '#00000026' },
            },
          },
        },
      },
      metadata: {
        groupPath: ['shadow', 'shadow-100'],
        groupId: '8',
        originName: 'Shadows/shadow-100',
        namePath: ['shadow', 'shadow-100'],
        collection: CollectionKind.Global,
      },
      source: { adapter: 'test', originalId: 'shadowRef', originalType: 'Shadow' },
    },
  ],
] satisfies Array<[string, DesignToken]>);
