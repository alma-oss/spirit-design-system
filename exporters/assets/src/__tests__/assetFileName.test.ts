import { toAssetFileName } from '../assetFileName';
import { AssetDiscoveryError } from '../errors';

describe('toAssetFileName', () => {
  it.each([
    { expected: 'add-item', prefix: 'Icons/', sourceName: 'Icons/Add Item' },
    { expected: 'cafe-name', prefix: 'Icons/', sourceName: 'Icons/ Čafé__--Name! ' },
    { expected: 'card', prefix: 'Illustration/', sourceName: 'Illustration/Card.svg' },
    { expected: 'card', prefix: 'Illustration/', sourceName: 'Illustration/Card.SVG' },
    { expected: 'benefit-health', prefix: 'Icons/', sourceName: 'Icons/benefit-health' },
    { expected: 'logo-colored', prefix: 'Icons/', sourceName: 'Icons/logo-colored' },
  ])('normalizes "$sourceName" with prefix "$prefix" to "$expected"', ({ expected, prefix, sourceName }) => {
    expect(toAssetFileName(sourceName, prefix)).toBe(expected);
  });

  it.each(['Icons/!!!', 'Icons/.svg', 'Icons/ --- '])(
    'throws when "%s" does not produce a valid filename',
    (sourceName) => {
      expect(() => toAssetFileName(sourceName, 'Icons/')).toThrow(AssetDiscoveryError);
      expect(() => toAssetFileName(sourceName, 'Icons/')).toThrow(/does not produce a valid filename/);
    },
  );
});
