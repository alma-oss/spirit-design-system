import type { DesignToken, NumberValue, TokenValue } from '../../core/types';
import { exampleDeviceTokens } from '../../../tests/fixtures/internal-model/exampleDeviceTokens';
import { buildDeviceDimensionMap } from '../deviceDimensionHelper';

const spacing = exampleDeviceTokens.get('stringRef1')!;
const spacingOriginName = spacing.metadata.originName?.toLowerCase() as string;

const px = (value: number): NumberValue => ({ type: 'number', value, unit: 'px' });

const deviceToken = (device: string, value: TokenValue): DesignToken => ({
  ...spacing,
  metadata: { ...spacing.metadata, device },
  value,
});

describe('buildDeviceDimensionMap', () => {
  it('should collect the dimension of each device by variable name and origin', () => {
    const map = buildDeviceDimensionMap([deviceToken('Mobile', px(16)), deviceToken('Desktop', px(32))]);

    const expected = {
      mobile: { measure: 16, unit: 'px' },
      desktop: { measure: 32, unit: 'px' },
    };

    expect(map.get(spacingOriginName)).toEqual(expected);
    expect([...map.values()].every((entries) => entries === map.get(spacingOriginName))).toBe(true);
  });

  it('should collect a token without an origin by its variable name only', () => {
    const token = deviceToken('Mobile', px(16));
    const map = buildDeviceDimensionMap([{ ...token, metadata: { ...token.metadata, originName: undefined } }]);

    expect(map.size).toBe(1);
    expect([...map.values()][0]).toEqual({ mobile: { measure: 16, unit: 'px' } });
  });

  it('should keep the variable name when it does not end with the device', () => {
    const map = buildDeviceDimensionMap([deviceToken('Wide Screen', px(8))]);

    expect(map.get(spacingOriginName)).toEqual({
      'wide screen': { measure: 8, unit: 'px' },
    });
  });

  it('should prefer the value the adapter resolved for an alias', () => {
    const alias = deviceToken('Mobile', { type: 'reference', tokenId: 'gone', resolved: px(12) });

    expect([...buildDeviceDimensionMap([alias]).values()][0]).toEqual({ mobile: { measure: 12, unit: 'px' } });
  });

  it('should skip a token without a device, a number or a supported unit', () => {
    const map = buildDeviceDimensionMap([
      spacing,
      deviceToken('Mobile', { type: 'number', value: 16, unit: 'ms' }),
      deviceToken('Mobile', { type: 'number', value: 16 }),
      deviceToken('Mobile', { type: 'string', value: '16px' }),
    ]);

    expect(map.size).toBe(0);
  });
});
