import { CollectionKind, type DesignToken, TokenTypeEnum } from '../../../src/core/types';

export const exampleGradientTokens = new Map<string, DesignToken>([
  [
    'gradientRef',
    {
      id: 'gradientRef',
      name: 'basic-overlay',
      type: TokenTypeEnum.Gradient,
      value: {
        type: 'composite',
        value: {
          '0': {
            type: 'composite',
            value: {
              type: { type: 'string', value: 'linear' },
              from: {
                type: 'composite',
                value: {
                  x: { type: 'number', value: 0.2058823534702224 },
                  y: { type: 'number', value: 0.4999999778582067 },
                },
              },
              to: {
                type: 'composite',
                value: {
                  x: { type: 'number', value: 0.999999947627349 },
                  y: { type: 'number', value: 0.4999999728606128 },
                },
              },
              stops: {
                type: 'composite',
                value: {
                  '0': {
                    type: 'composite',
                    value: {
                      position: { type: 'number', value: 0 },
                      color: { type: 'color', format: 'hex', value: '#ffffffff' },
                    },
                  },
                  '1': {
                    type: 'composite',
                    value: {
                      position: { type: 'number', value: 1 },
                      color: { type: 'color', format: 'hex', value: '#ffffff00' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      metadata: {
        groupPath: ['basic-overlay'],
        groupId: '9',
        originName: 'Gradient/basic-overlay',
        namePath: ['basic-overlay'],
        collection: CollectionKind.Global,
      },
      source: { adapter: 'test', originalId: 'gradientRef', originalType: 'Gradient' },
    },
  ],
] satisfies Array<[string, DesignToken]>);
