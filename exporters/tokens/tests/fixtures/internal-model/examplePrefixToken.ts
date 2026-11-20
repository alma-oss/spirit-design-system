import { CollectionKind, type DesignToken, TokenTypeEnum } from '../../../src/core/types';

export const examplePrefixToken = new Map<string, DesignToken>([
  [
    'stringRef',
    {
      id: 'stringRef',
      name: 'css-variable-prefix',
      type: TokenTypeEnum.String,
      value: { type: 'string', value: 'spirit-' },
      metadata: {
        groupPath: ['Grid', 'spacing'],
        groupId: '1',
        namePath: ['Grid', 'spacing'],
        collection: CollectionKind.Global,
      },
      source: { adapter: 'test', originalId: 'stringRef', originalType: 'String' },
    },
  ],
] satisfies Array<[string, DesignToken]>);
