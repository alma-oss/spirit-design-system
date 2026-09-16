import {
  type BorderToken,
  type BorderWidthToken,
  type ColorToken,
  type DimensionToken,
  type FontSizeToken,
  type LetterSpacingToken,
  type LineHeightToken,
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

    it('maps a fontSize token to the internal model', () => {
      const token = {
        id: 'fontSizeRef',
        name: 'font-size-body',
        tokenType: TokenType.fontSize,
        parentGroupId: '1',
        value: { measure: 16, unit: 'Pixels', referencedTokenId: null },
      } as unknown as FontSizeToken;

      const result = mapToken(token, exampleGroups);

      expect(result).toEqual({
        id: 'fontSizeRef',
        name: 'font-size-body',
        type: TokenTypeEnum.FontSize,
        value: { type: 'number', value: 16, unit: 'Pixels' },
        description: undefined,
        metadata: {
          brandId: undefined,
          device: undefined,
          groupPath: ['Grid', 'spacing'],
        },
        source: {
          adapter: 'supernova',
          originalId: 'fontSizeRef',
          originalType: 'FontSize',
        },
      });
    });

    it('maps a lineHeight token to the internal model', () => {
      const token = {
        id: 'lineHeightRef',
        name: 'line-height-body',
        tokenType: TokenType.lineHeight,
        parentGroupId: '1',
        value: { measure: 24, unit: 'Pixels', referencedTokenId: null },
      } as unknown as LineHeightToken;

      const result = mapToken(token, exampleGroups);

      expect(result).toEqual({
        id: 'lineHeightRef',
        name: 'line-height-body',
        type: TokenTypeEnum.LineHeight,
        value: { type: 'number', value: 24, unit: 'Pixels' },
        description: undefined,
        metadata: {
          brandId: undefined,
          device: undefined,
          groupPath: ['Grid', 'spacing'],
        },
        source: {
          adapter: 'supernova',
          originalId: 'lineHeightRef',
          originalType: 'LineHeight',
        },
      });
    });

    it('maps a letterSpacing token to the internal model', () => {
      const token = {
        id: 'letterSpacingRef',
        name: 'letter-spacing-body',
        tokenType: TokenType.letterSpacing,
        parentGroupId: '1',
        value: { measure: 0.5, unit: 'Pixels', referencedTokenId: null },
      } as unknown as LetterSpacingToken;

      const result = mapToken(token, exampleGroups);

      expect(result).toEqual({
        id: 'letterSpacingRef',
        name: 'letter-spacing-body',
        type: TokenTypeEnum.LetterSpacing,
        value: { type: 'number', value: 0.5, unit: 'Pixels' },
        description: undefined,
        metadata: {
          brandId: undefined,
          device: undefined,
          groupPath: ['Grid', 'spacing'],
        },
        source: {
          adapter: 'supernova',
          originalId: 'letterSpacingRef',
          originalType: 'LetterSpacing',
        },
      });
    });

    it('maps a borderWidth token to the internal model', () => {
      const token = {
        id: 'borderWidthRef',
        name: 'border-width-thin',
        tokenType: TokenType.borderWidth,
        parentGroupId: '1',
        value: { measure: 2, unit: 'Pixels', referencedTokenId: null },
      } as unknown as BorderWidthToken;

      const result = mapToken(token, exampleGroups);

      expect(result).toEqual({
        id: 'borderWidthRef',
        name: 'border-width-thin',
        type: TokenTypeEnum.BorderWidth,
        value: { type: 'number', value: 2, unit: 'Pixels' },
        description: undefined,
        metadata: {
          brandId: undefined,
          device: undefined,
          groupPath: ['Grid', 'spacing'],
        },
        source: {
          adapter: 'supernova',
          originalId: 'borderWidthRef',
          originalType: 'BorderWidth',
        },
      });
    });

    it('maps a border token to the internal model, using only the width', () => {
      const token = {
        id: 'borderRef',
        name: 'border-default',
        tokenType: TokenType.border,
        parentGroupId: '1',
        value: {
          width: { measure: 1, unit: 'Pixels', referencedTokenId: null },
          color: { color: { r: 0, g: 0, b: 0 }, opacity: { measure: 1 }, referencedTokenId: null },
          position: 'inside',
          style: 'solid',
          referencedTokenId: null,
        },
      } as unknown as BorderToken;

      const result = mapToken(token, exampleGroups);

      expect(result).toEqual({
        id: 'borderRef',
        name: 'border-default',
        type: TokenTypeEnum.Border,
        value: { type: 'number', value: 1, unit: 'Pixels' },
        description: undefined,
        metadata: {
          brandId: undefined,
          device: undefined,
          groupPath: ['Grid', 'spacing'],
        },
        source: {
          adapter: 'supernova',
          originalId: 'borderRef',
          originalType: 'Border',
        },
      });
    });

    it('returns null for a border token with no width', () => {
      const token = {
        id: 'borderRef',
        name: 'border-undefined',
        tokenType: TokenType.border,
        value: { width: undefined, color: {}, referencedTokenId: null },
      } as unknown as BorderToken;

      const result = mapToken(token, exampleGroups);

      expect(result).toBeNull();
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
