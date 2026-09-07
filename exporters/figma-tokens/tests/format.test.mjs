import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeColor, rgbaToHex } from '../src/domain/color.ts';
import { pxToRem } from '../src/generate/units.ts';

test('rgbaToHex normalizes Figma 0-1 colors', () => {
  assert.equal(rgbaToHex({ r: 1, g: 1, b: 1, a: 1 }), '#fff');
  assert.equal(rgbaToHex({ r: 0, g: 0, b: 0, a: 1 }), '#000');
  assert.equal(normalizeColor('d80090ff'), '#d80090');
  assert.equal(normalizeColor('0000001a'), '#0000001a');
});

test('pxToRem converts, rounds, and trims zeros', () => {
  assert.equal(pxToRem(32, { baseFontSize: 16 }), '2rem');
  assert.equal(pxToRem(40, { baseFontSize: 16 }), '2.5rem');
  assert.equal(pxToRem(1, { baseFontSize: 16 }), '0.0625rem');
  assert.equal(pxToRem(32, { baseFontSize: 0 }), '32px');
});
