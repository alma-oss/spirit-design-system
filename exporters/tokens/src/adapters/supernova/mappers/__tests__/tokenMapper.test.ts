import { type DimensionToken, type StringToken } from '@supernovaio/sdk-exporters';
import { exampleDimensionAndStringTokens } from '../../../../../tests/fixtures/exampleDimensionAndStringTokens';
import { exampleGroups } from '../../../../../tests/fixtures/exampleGroups';
import { TokenTypeEnum } from '../../../../core/types';
import { mapToken } from '../tokenMapper';

describe('tokenMapper', () => {
  describe('mapToken', () => {
    it('maps a string token to the internal model', () => {
      const token = exampleDimensionAndStringTokens.get('stringRef') as StringToken;

      const result = mapToken(token, exampleGroups);

      expect(result).toEqual({
        id: 'stringRef',
        name: 'Columns',
        type: TokenTypeEnum.String,
        value: { type: 'string', value: '12' },
        description: undefined,
        metadata: {
          brandId: undefined,
          device: undefined,
          groupPath: ['Grid'],
        },
        source: {
          adapter: 'supernova',
          originalId: 'stringRef',
          originalType: 'String',
        },
      });
    });

    it('returns null for token types not yet supported by the adapter', () => {
      const token = exampleDimensionAndStringTokens.get('dimensionRef') as DimensionToken;

      const result = mapToken(token, exampleGroups);

      expect(result).toBeNull();
    });

    it('returns an empty group path when the parent group cannot be found', () => {
      const token = {
        ...(exampleDimensionAndStringTokens.get('stringRef') as StringToken),
        parentGroupId: 'missing-group',
      };

      const result = mapToken(token, exampleGroups);

      expect(result?.metadata.groupPath).toEqual([]);
    });
  });
});
