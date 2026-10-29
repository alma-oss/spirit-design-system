import { normalizeColor, rgbaToHex } from '../color';

describe('color', () => {
  it('normalizes Figma colors', () => {
    expect(rgbaToHex({ r: 1, g: 1, b: 1, a: 1 })).toBe('#fff');
    expect(rgbaToHex({ r: 0, g: 0, b: 0, a: 1 })).toBe('#000');
    expect(normalizeColor('d80090ff')).toBe('#d80090');
    expect(normalizeColor('0000001a')).toBe('#0000001a');
  });
});
