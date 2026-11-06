import {
  type BorderToken,
  type BorderWidthToken,
  type ColorToken,
  type GradientToken,
  GradientType,
  type ShadowToken,
  ShadowType,
  type Token,
  Unit,
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
import { exampleColorsTokens } from '../../../../../tests/fixtures/exampleColorTokens';
import { exampleGradientTokens } from '../../../../../tests/fixtures/exampleGradientTokens';
import { exampleShadowTokens } from '../../../../../tests/fixtures/exampleShadowTokens';
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
        value: { type: 'number', value: 32, unit: 'px' },
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

    it('should return null for a numeric token with no measure', () => {
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
        value: { type: 'number', value: 4, unit: 'px' },
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
        value: { type: 'number', value: 8, unit: 'px' },
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
        value: { type: 'number', value: 32, unit: 'px' },
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
        value: { type: 'number', value: 16, unit: 'px' },
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
        value: { type: 'number', value: 24, unit: 'px' },
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
        value: { type: 'number', value: 0.5, unit: 'px' },
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
        value: { type: 'number', value: 2, unit: 'px' },
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
        value: { type: 'number', value: 1, unit: 'px' },
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
        id: 'durationRef',
        name: 'duration-short',
        tokenType: TokenType.duration,
        value: { measure: 100, unit: 'Ms', referencedTokenId: null },
      } as unknown as Token;

      const result = mapToken(token, exampleGroups);

      expect(result).toBeNull();
    });

    describe('color tokens', () => {
      it('should map a color token to a hex color with alpha', () => {
        const token = exampleColorsTokens.get('actionColorRef') as ColorToken;

        const result = mapToken(token, exampleGroups);

        expect(result).toMatchObject({
          id: 'actionColorRef',
          type: TokenTypeEnum.Color,
          value: { type: 'color', format: 'hex', value: '#ca2026ff' },
          source: { adapter: 'supernova', originalId: 'actionColorRef', originalType: 'Color' },
        });
      });

      it('should round channels and alpha like Supernova does', () => {
        const token = {
          ...exampleColorsTokens.get('actionColorRef'),
          value: {
            color: { r: 12.6, g: 99.4, b: 254.5, referencedTokenId: null },
            opacity: { unit: Unit.raw, measure: 0.333, referencedTokenId: null },
            referencedTokenId: null,
          },
        } as unknown as ColorToken;

        expect(mapToken(token, exampleGroups)?.value).toEqual({ type: 'color', format: 'hex', value: '#0d63ff55' });
      });

      it('should map an alias to a reference that keeps the already computed value', () => {
        const token = {
          ...exampleColorsTokens.get('actionColorRef'),
          value: { ...(exampleColorsTokens.get('actionColorRef') as ColorToken).value, referencedTokenId: 'primary' },
        } as unknown as ColorToken;

        expect(mapToken(token, exampleGroups)?.value).toEqual({
          type: 'reference',
          tokenId: 'primary',
          resolved: { type: 'color', format: 'hex', value: '#ca2026ff' },
        });
      });
    });

    describe('shadow tokens', () => {
      it('should map shadow layers to a composite keyed by layer index', () => {
        const token = exampleShadowTokens.get('shadowRef') as ShadowToken;

        const result = mapToken(token, exampleGroups);

        expect(result).toMatchObject({ id: 'shadowRef', type: TokenTypeEnum.Shadow });
        expect(result?.value).toEqual({
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
                // the layer's own opacity (0.15) overrides the color's (1)
                color: { type: 'color', format: 'hex', value: '#00000026' },
              },
            },
          },
        });
      });

      it('should map an inner shadow layer to inset', () => {
        const [layer] = (exampleShadowTokens.get('shadowRef') as ShadowToken).value;
        const token = {
          ...exampleShadowTokens.get('shadowRef'),
          value: [{ ...layer, type: ShadowType.inner }],
        } as unknown as ShadowToken;

        const mapped = mapToken(token, exampleGroups)?.value;

        expect(mapped).toMatchObject({
          value: { '0': { value: { inset: { type: 'boolean', value: true } } } },
        });
      });
    });

    describe('gradient tokens', () => {
      it('should map gradient layers to a composite keyed by layer index', () => {
        const token = exampleGradientTokens.get('gradientRef') as GradientToken;

        const result = mapToken(token, exampleGroups);

        expect(result).toMatchObject({ id: 'gradientRef', type: TokenTypeEnum.Gradient });
        expect(result?.value).toEqual({
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
        });
      });

      it.each([
        [GradientType.radial, 'radial'],
        [GradientType.angular, 'angular'],
      ])('should map a %s gradient layer', (nativeType, type) => {
        const [layer] = (exampleGradientTokens.get('gradientRef') as GradientToken).value;
        const token = {
          ...exampleGradientTokens.get('gradientRef'),
          value: [{ ...layer, type: nativeType }],
        } as unknown as GradientToken;

        expect(mapToken(token, exampleGroups)?.value).toMatchObject({
          value: { '0': { value: { type: { type: 'string', value: type } } } },
        });
      });

      it('should map a layer that aliases another gradient to a reference', () => {
        const [layer] = (exampleGradientTokens.get('gradientRef') as GradientToken).value;
        const token = {
          ...exampleGradientTokens.get('gradientRef'),
          value: [{ ...layer, referencedTokenId: 'other-gradient' }],
        } as unknown as GradientToken;

        expect(mapToken(token, exampleGroups)?.value).toMatchObject({
          value: { '0': { type: 'reference', tokenId: 'other-gradient', resolved: { type: 'composite' } } },
        });
      });
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
