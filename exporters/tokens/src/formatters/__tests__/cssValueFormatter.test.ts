import type { CompositeValue, TokenValue } from '../../core/types';
import { formatColorValue, formatGradientValue, formatShadowValue } from '../cssValue';

const hex = (value: string, format = 'hex'): TokenValue => ({ type: 'color', format, value });
const num = (value: number, unit?: string): TokenValue => ({ type: 'number', value, unit });
const composite = (value: Record<string, TokenValue>): CompositeValue => ({ type: 'composite', value });

const shadowLayer = (color: TokenValue, overrides: Record<string, TokenValue> = {}): TokenValue =>
  composite({
    inset: { type: 'boolean', value: false },
    x: num(0, 'px'),
    y: num(2, 'px'),
    blur: num(8, 'px'),
    spread: num(0, 'px'),
    color,
    ...overrides,
  });

const gradientLayer = (type: string, stops: TokenValue[], from = { x: 0, y: 0.5 }, to = { x: 1, y: 0.5 }) =>
  composite({
    type: { type: 'string', value: type },
    from: composite({ x: num(from.x), y: num(from.y) }),
    to: composite({ x: num(to.x), y: num(to.y) }),
    stops: composite(Object.fromEntries(stops.map((stop, stopIndex) => [String(stopIndex), stop]))),
  });

const stop = (position: number, color: TokenValue): TokenValue => composite({ position: num(position), color });

describe('cssValueFormatter', () => {
  describe('formatColorValue', () => {
    it.each([
      ['#ca2026ff', '#ca2026ff'],
      ['#CA2026', '#ca2026ff'],
      ['ca2026', '#ca2026ff'],
      ['#fff', '#ffffffff'],
      ['#0008', '#00000088'],
    ])('should normalize %s to 8 lowercase digits', (value, expected) => {
      expect(formatColorValue(hex(value))).toBe(expected);
    });

    it('should reject a color format it does not know', () => {
      expect(() => formatColorValue(hex('oklch(0.5 0.1 200)', 'oklch'))).toThrow('Unsupported color');
    });

    it('should reject a value that is not a color', () => {
      expect(() => formatColorValue(num(1))).toThrow('Expected a "color" value, got a "number" value');
    });

    it('should reject a reference, which the resolve-references rule is expected to have resolved', () => {
      expect(() => formatColorValue({ type: 'reference', tokenId: 'red' })).toThrow(
        'Expected a "color" value, got a "reference" value',
      );
    });
  });

  describe('formatShadowValue', () => {
    it('should render layers separated by comma, with inset', () => {
      const value = composite({
        '0': shadowLayer(hex('#00000026')),
        '1': shadowLayer(hex('#ffffff80'), { inset: { type: 'boolean', value: true }, x: num(-1.5, 'px') }),
      });

      expect(formatShadowValue(value)).toBe('0px 2px 8px 0px #00000026, inset -1.5px 2px 8px 0px #ffffff80');
    });

    it('should default the length unit to px', () => {
      expect(formatShadowValue(composite({ '0': shadowLayer(hex('#000'), { x: num(1) }) }))).toBe(
        '1px 2px 8px 0px #000000ff',
      );
    });

    it('should throw when a layer lacks a field', () => {
      const fields = { ...(shadowLayer(hex('#000')) as CompositeValue).value };
      delete fields.x;

      expect(() => formatShadowValue(composite({ '0': composite(fields) }))).toThrow('Missing "x"');
    });
  });

  describe('formatGradientValue', () => {
    const white = hex('#ffffffff');
    const transparent = hex('#ffffff00');

    it.each([
      ['left to right', { x: 0, y: 0.5 }, { x: 1, y: 0.5 }, 90],
      ['top to bottom', { x: 0.5, y: 0 }, { x: 0.5, y: 1 }, 180],
      ['bottom to top', { x: 0.5, y: 1 }, { x: 0.5, y: 0 }, 0],
      ['right to left', { x: 1, y: 0.5 }, { x: 0, y: 0.5 }, -90],
    ])('should render a linear gradient %s', (_, from, to, angle) => {
      const value = composite({ '0': gradientLayer('linear', [stop(0, white), stop(1, transparent)], from, to) });

      expect(formatGradientValue(value)).toBe(`linear-gradient(${angle}deg, #ffffffff 0%, #ffffff00 100%)`);
    });

    it('should render radial and angular layers, rounding stop positions', () => {
      const value = composite({
        '0': gradientLayer('radial', [stop(0, white), stop(0.3333333, transparent)]),
        '1': gradientLayer('angular', [stop(0.5, white)]),
      });

      expect(formatGradientValue(value)).toBe(
        'radial-gradient(circle, #ffffffff 0%, #ffffff00 33.333%), conic-gradient(#ffffffff 50%)',
      );
    });

    it('should render an unknown type as linear', () => {
      const value = composite({ '0': gradientLayer('diamond', [stop(0, white)]) });

      expect(formatGradientValue(value)).toBe('linear-gradient(90deg, #ffffffff 0%)');
    });
  });
});
