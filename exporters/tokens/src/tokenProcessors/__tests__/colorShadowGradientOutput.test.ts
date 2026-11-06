import {
  type ColorToken,
  type GradientToken,
  GradientType,
  type ShadowToken,
  ShadowType,
  type TokenGroup,
  TokenType,
  Unit,
} from '@supernovaio/sdk-exporters';
import { exampleGroups } from '../../../tests/fixtures/exampleGroups';
import { sampleConfigurationDefault } from '../../../tests/fixtures/sampleConfiguration';
import { mapToken } from '../../adapters/supernova/mappers/tokenMapper';
import { createTokenIndex } from '../../core/tokenIndex';
import { type DesignToken } from '../../core/types';
import { type FontSizeBaseMap } from '../../helpers/unitHelper';
import { processColorToken } from '../colorTokenProcessor';
import { processGradientToken } from '../gradientTokenProcessor';
import { processShadowToken } from '../shadowTokenProcessor';

jest.mock('../../../config', () => ({
  exportConfiguration: sampleConfigurationDefault,
}));

/**
 * Exact-output safety net for the color, shadow and gradient processors (#DS-2872). These expectations were captured
 * from the implementation that rendered values via Supernova's `CSSHelper`; they must not change when the values are
 * read through the internal token model instead.
 */

type ColorInput = { r: number; g: number; b: number; opacity?: number; referencedTokenId?: string | null };

const tokenGroups: Array<TokenGroup> = exampleGroups;
const fontSizeBaseMap: FontSizeBaseMap = new Map([
  ['mobile', 14],
  ['tablet', 16],
  ['desktop', 18],
]);

const colorValue = ({ r, g, b, opacity = 1, referencedTokenId = null }: ColorInput) => ({
  color: { r, g, b, referencedTokenId: null },
  opacity: { unit: Unit.raw, measure: opacity, referencedTokenId: null },
  referencedTokenId,
});

const colorToken = (id: string, name: string, input: ColorInput): ColorToken =>
  ({
    id,
    name,
    tokenType: TokenType.color,
    parentGroupId: '5',
    origin: { name: `background/${name}` },
    value: colorValue(input),
  }) as unknown as ColorToken;

const shadowLayer = (
  input: ColorInput,
  overrides: Partial<{
    x: number;
    y: number;
    radius: number;
    spread: number;
    opacity: number | null;
    type: ShadowType;
    referencedTokenId: string | null;
  }> = {},
) => {
  const { opacity, ...rest } = { x: 0, y: 2, radius: 8, spread: 0, opacity: 1, type: ShadowType.drop, ...overrides };

  return {
    color: colorValue(input),
    ...rest,
    ...(opacity === null ? {} : { opacity: { unit: Unit.raw, measure: opacity, referencedTokenId: null } }),
    referencedTokenId: null,
    ...(overrides.referencedTokenId ? { referencedTokenId: overrides.referencedTokenId } : {}),
  };
};

const shadowToken = (id: string, name: string, layers: unknown[]): ShadowToken =>
  ({
    id,
    name,
    tokenType: TokenType.shadow,
    parentGroupId: '8',
    origin: { name: `Shadows/${name}` },
    value: layers,
  }) as unknown as ShadowToken;

const gradientLayer = (
  type: GradientType,
  from: { x: number; y: number },
  to: { x: number; y: number },
  stops: Array<{ position: number; color: ColorInput }>,
) => ({
  type,
  aspectRatio: 0,
  from,
  to,
  stops: stops.map(({ position, color }) => ({ position, color: colorValue(color) })),
  referencedTokenId: null,
});

const gradientToken = (id: string, name: string, layers: unknown[]): GradientToken =>
  ({
    id,
    name,
    tokenType: TokenType.gradient,
    parentGroupId: '9',
    origin: { name: `Gradient/${name}` },
    value: layers,
  }) as unknown as GradientToken;

const referencedToken = mapToken(
  colorToken('primary-ref', 'primary', { r: 0, g: 0, b: 0 }),
  tokenGroups,
) as DesignToken;
const tokenIndex = createTokenIndex([referencedToken]);

describe('color, shadow and gradient output', () => {
  describe('processColorToken', () => {
    const ctx = (hasJsOutput = false) => ({
      tokenGroups,
      hasParentPrefix: true,
      hasJsOutput,
      tokenIndex,
    });

    it.each([
      {
        description: 'opaque color',
        input: { r: 202, g: 32, b: 38 },
        expected: '$background-primary: #ca2026 !default;',
      },
      {
        description: 'shortenable color',
        input: { r: 17, g: 34, b: 51 },
        expected: '$background-primary: #123 !default;',
      },
      {
        description: 'color with alpha',
        input: { r: 0, g: 0, b: 0, opacity: 0.5 },
        expected: '$background-primary: #00000080 !default;',
      },
      {
        description: 'color with shortenable alpha',
        input: { r: 255, g: 255, b: 255, opacity: 0.2 },
        expected: '$background-primary: #fff3 !default;',
      },
      {
        description: 'color with fractional channel values',
        input: { r: 12.6, g: 99.4, b: 254.5, opacity: 0.333 },
        expected: '$background-primary: #0d63ff55 !default;',
      },
      {
        description: 'color aliasing another color token',
        input: { r: 10, g: 20, b: 30, referencedTokenId: 'primary-ref' },
        expected: '$background-primary: #0a141e !default;',
      },
    ])('should process $description', ({ input, expected }) => {
      expect(processColorToken(colorToken('c', 'primary', input), ctx())).toBe(expected);
    });

    it('should process color with js output', () => {
      expect(processColorToken(colorToken('c', 'primary', { r: 202, g: 32, b: 38 }), ctx(true))).toBe(
        "export const backgroundPrimary = '#ca2026';",
      );
    });

    it('should throw for an alias to an unknown token', () => {
      const token = colorToken('c', 'primary', { r: 10, g: 20, b: 30, referencedTokenId: 'unknown' });

      expect(() => processColorToken(token, ctx())).toThrow('unknown');
    });
  });

  describe('processShadowToken', () => {
    const ctx = (hasJsOutput = false, tokenPrefix = 'spirit-') => ({
      tokenGroups,
      hasParentPrefix: false,
      hasJsOutput,
      tokenPrefix,
      tokenIndex,
      fontSizeBaseMap,
    });

    it('should process multiple layers with inset and per-layer opacity', () => {
      const token = shadowToken('s', 'shadow-200', [
        shadowLayer({ r: 0, g: 0, b: 0 }, { y: 4, radius: 12, opacity: 0.1 }),
        shadowLayer(
          { r: 255, g: 255, b: 255, opacity: 0.5 },
          { x: 1, y: 1, radius: 0, type: ShadowType.inner, opacity: null },
        ),
      ]);

      expect(processShadowToken(token, ctx())).toBe(
        '$shadow-200: var(--spirit-shadow-200-offset-x-01, 0) var(--spirit-shadow-200-offset-y-01, 0.2857rem) var(--spirit-shadow-200-blur-radius-01, 0.8571rem) var(--spirit-shadow-200-spread-radius-01, 0) var(--spirit-color-shadows-shadow-200-color-01, #0000001a), ' +
          'inset var(--spirit-shadow-200-offset-x-02, 0.0714rem) var(--spirit-shadow-200-offset-y-02, 0.0714rem) var(--spirit-shadow-200-blur-radius-02, 0) var(--spirit-shadow-200-spread-radius-02, 0) var(--spirit-color-shadows-shadow-200-color-02, #ffffff80) !default;',
      );
    });

    it('should process fractional lengths with js output', () => {
      const token = shadowToken('s', 'shadow-300', [
        shadowLayer({ r: 17, g: 34, b: 51 }, { x: -1.5, y: 0.5, radius: 3.25, spread: 2, opacity: 0.75 }),
      ]);

      expect(processShadowToken(token, ctx(true, ''))).toBe(
        "export const shadow300 = 'var(--shadow-300-offset-x-01, -0.1071rem) var(--shadow-300-offset-y-01, 0.0357rem) var(--shadow-300-blur-radius-01, 0.2321rem) var(--shadow-300-spread-radius-01, 0.1429rem) var(--color-shadows-shadow-300-color-01, #112233bf)';",
      );
    });

    it('should process a layer color aliasing another color token', () => {
      const layer = shadowLayer({ r: 5, g: 6, b: 7 });
      layer.color.referencedTokenId = 'primary-ref';

      expect(processShadowToken(shadowToken('s', 'shadow-400', [layer]), ctx())).toBe(
        '$shadow-400: var(--spirit-shadow-400-offset-x-01, 0) var(--spirit-shadow-400-offset-y-01, 0.1429rem) var(--spirit-shadow-400-blur-radius-01, 0.5714rem) var(--spirit-shadow-400-spread-radius-01, 0) var(--spirit-color-shadows-shadow-400-color-01, #050607) !default;',
      );
    });
  });

  describe('processGradientToken', () => {
    const ctx = (hasJsOutput = false) => ({
      tokenGroups,
      hasParentPrefix: false,
      hasJsOutput,
      tokenPrefix: 'spirit-',
      tokenIndex,
    });

    it.each([
      { angle: 90, description: 'left to right', from: { x: 0, y: 0.5 }, to: { x: 1, y: 0.5 } },
      { angle: 90, description: 'right to left', from: { x: 1, y: 0.5 }, to: { x: 0, y: 0.5 } },
      { angle: 180, description: 'top to bottom', from: { x: 0.5, y: 0 }, to: { x: 0.5, y: 1 } },
      { angle: 0, description: 'bottom to top', from: { x: 0.5, y: 1 }, to: { x: 0.5, y: 0 } },
      { angle: 135, description: 'diagonal down', from: { x: 0.1234, y: 0.0004 }, to: { x: 0.9, y: 0.7777 } },
      { angle: 49, description: 'diagonal up', from: { x: 0.9, y: 0.7 }, to: { x: 0.2, y: 0.1 } },
    ])('should process linear gradient $description', ({ angle, from, to }) => {
      const token = gradientToken('g', 'basic-overlay', [
        gradientLayer(GradientType.linear, from, to, [
          { position: 0, color: { r: 255, g: 255, b: 255 } },
          { position: 0.3333333, color: { r: 0, g: 0, b: 0, opacity: 0.4 } },
          { position: 1, color: { r: 17, g: 34, b: 51, opacity: 0 } },
        ]),
      ]);

      expect(processGradientToken(token, ctx())).toBe(
        `$basic-overlay: linear-gradient(var(--gradient-angle, ${angle}deg), var(--spirit-color-gradient-basic-overlay-color-01, #fff) 0%, ` +
          'var(--spirit-color-gradient-basic-overlay-color-02, #0006) 33.333%, ' +
          'var(--spirit-color-gradient-basic-overlay-color-03, #1230) 100%) !default;',
      );
    });

    it('should process radial and angular gradients in multiple layers', () => {
      const stops = [
        { position: 0, color: { r: 255, g: 0, b: 0 } },
        { position: 1, color: { r: 0, g: 0, b: 255, opacity: 0.5 } },
      ];
      const token = gradientToken('g', 'basic-overlay', [
        gradientLayer(GradientType.radial, { x: 0, y: 0 }, { x: 1, y: 1 }, stops),
        gradientLayer(GradientType.angular, { x: 0, y: 0 }, { x: 1, y: 1 }, stops),
      ]);

      expect(processGradientToken(token, ctx())).toBe(
        '$basic-overlay: radial-gradient(circle, var(--spirit-color-gradient-basic-overlay-color-01, #f00) 0%, var(--spirit-color-gradient-basic-overlay-color-02, #0000ff80) 100%), ' +
          'conic-gradient(var(--spirit-color-gradient-basic-overlay-color-03, #f00) 0%, var(--spirit-color-gradient-basic-overlay-color-04, #0000ff80) 100%) !default;',
      );
    });

    it('should process a stop color aliasing another color token with js output', () => {
      const layer = gradientLayer(GradientType.linear, { x: 0, y: 0.5 }, { x: 1, y: 0.5 }, [
        { position: 0, color: { r: 9, g: 8, b: 7 } },
        { position: 1, color: { r: 1, g: 2, b: 3 } },
      ]);
      layer.stops[0].color.referencedTokenId = 'primary-ref';

      expect(processGradientToken(gradientToken('g', 'basic-overlay', [layer]), ctx(true))).toBe(
        "export const basicOverlay = 'linear-gradient(var(--gradient-angle, 90deg), var(--spirit-color-gradient-basic-overlay-color-01, #090807) 0%, var(--spirit-color-gradient-basic-overlay-color-02, #010203) 100%)';",
      );
    });
  });
});
