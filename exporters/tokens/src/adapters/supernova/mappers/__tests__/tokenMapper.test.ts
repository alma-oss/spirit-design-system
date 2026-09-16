import {
  type ColorToken,
  type DimensionToken,
  type RadiusToken,
  type SizeToken,
  type SpaceToken,
  type StringToken,
  TokenType,
} from '@supernovaio/sdk-exporters';
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

    it('maps a dimension token to the internal model', () => {
      const token = exampleDimensionAndStringTokens.get('dimensionRef') as DimensionToken;

      const result = mapToken(token, exampleGroups);

      expect(result).toEqual({
        id: 'dimensionRef',
        name: 'desktop',
        type: TokenTypeEnum.Dimension,
        value: { type: 'number', value: 32, unit: 'Pixels' },
        description: undefined,
        metadata: {
          brandId: undefined,
          device: undefined,
          groupPath: ['Grid', 'spacing'],
        },
        source: {
          adapter: 'supernova',
          originalId: 'dimensionRef',
          originalType: 'Dimension',
        },
      });
    });

    it('returns null for a numeric token with no measure', () => {
      const token = {
        ...(exampleDimensionAndStringTokens.get('dimensionRef') as DimensionToken),
        value: { measure: undefined, unit: 'Pixels', referencedTokenId: null },
      };

      const result = mapToken(token, exampleGroups);

      expect(result).toBeNull();
    });

    it('maps a radius token to the internal model', () => {
      const token = {
        id: 'radiusRef',
        name: 'radius-small',
        tokenType: TokenType.radius,
        parentGroupId: '1',
        value: { measure: 4, unit: 'Pixels', referencedTokenId: null },
      } as unknown as RadiusToken;

      const result = mapToken(token, exampleGroups);

      expect(result).toEqual({
        id: 'radiusRef',
        name: 'radius-small',
        type: TokenTypeEnum.Radius,
        value: { type: 'number', value: 4, unit: 'Pixels' },
        description: undefined,
        metadata: {
          brandId: undefined,
          device: undefined,
          groupPath: ['Grid', 'spacing'],
        },
        source: {
          adapter: 'supernova',
          originalId: 'radiusRef',
          originalType: 'BorderRadius',
        },
      });
    });

    it('maps a space token to the internal model', () => {
      const token = {
        id: 'spaceRef',
        name: 'space-small',
        tokenType: TokenType.space,
        parentGroupId: '1',
        value: { measure: 8, unit: 'Pixels', referencedTokenId: null },
      } as unknown as SpaceToken;

      const result = mapToken(token, exampleGroups);

      expect(result).toEqual({
        id: 'spaceRef',
        name: 'space-small',
        type: TokenTypeEnum.Space,
        value: { type: 'number', value: 8, unit: 'Pixels' },
        description: undefined,
        metadata: {
          brandId: undefined,
          device: undefined,
          groupPath: ['Grid', 'spacing'],
        },
        source: {
          adapter: 'supernova',
          originalId: 'spaceRef',
          originalType: 'Space',
        },
      });
    });

    it('maps a size token to the internal model', () => {
      const token = {
        id: 'sizeRef',
        name: 'size-small',
        tokenType: TokenType.size,
        parentGroupId: '1',
        value: { measure: 32, unit: 'Pixels', referencedTokenId: null },
      } as unknown as SizeToken;

      const result = mapToken(token, exampleGroups);

      expect(result).toEqual({
        id: 'sizeRef',
        name: 'size-small',
        type: TokenTypeEnum.Size,
        value: { type: 'number', value: 32, unit: 'Pixels' },
        description: undefined,
        metadata: {
          brandId: undefined,
          device: undefined,
          groupPath: ['Grid', 'spacing'],
        },
        source: {
          adapter: 'supernova',
          originalId: 'sizeRef',
          originalType: 'Size',
        },
      });
    });

    it('returns null for token types not yet supported by the adapter', () => {
      const token = {
        id: 'colorRef',
        name: 'color-primary',
        tokenType: TokenType.color,
        value: { color: { r: 0, g: 0, b: 0 }, opacity: { measure: 1 }, referencedTokenId: null },
      } as unknown as ColorToken;

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
