import { type Token } from '@supernovaio/sdk-exporters';
import { exampleDeviceTokens } from '../../../tests/fixtures/exampleDeviceTokens';
import { exampleGroups } from '../../../tests/fixtures/exampleGroups';
import { buildDeviceDimensionMap } from '../deviceDimensionHelper';

const spacing = exampleDeviceTokens.get('stringRef1') as Token;

const deviceToken = (device: string, value: object): Token =>
  ({
    ...spacing,
    propertyValues: { ...spacing.propertyValues, device },
    value,
  }) as unknown as Token;

describe('buildDeviceDimensionMap', () => {
  it('should collect the dimension of each device by variable name and origin', () => {
    const map = buildDeviceDimensionMap(
      [deviceToken('Mobile', { measure: 16, unit: 'Pixels' }), deviceToken('Desktop', { measure: 32, unit: 'Pixels' })],
      exampleGroups,
    );

    const expected = {
      mobile: { measure: 16, unit: 'Pixels' },
      desktop: { measure: 32, unit: 'Pixels' },
    };

    expect(map.get(spacing.origin?.name?.toLowerCase() as string)).toEqual(expected);
    expect(
      [...map.values()].every((entries) => entries === map.get(spacing.origin?.name?.toLowerCase() as string)),
    ).toBe(true);
  });

  it('should collect a token without an origin by its variable name only', () => {
    const map = buildDeviceDimensionMap(
      [{ ...deviceToken('Mobile', { measure: 16, unit: 'Pixels' }), origin: undefined } as unknown as Token],
      exampleGroups,
    );

    expect(map.size).toBe(1);
    expect([...map.values()][0]).toEqual({ mobile: { measure: 16, unit: 'Pixels' } });
  });

  it('should keep the variable name when it does not end with the device', () => {
    const map = buildDeviceDimensionMap([deviceToken('Wide Screen', { measure: 8, unit: 'Pixels' })], exampleGroups);

    expect(map.get(spacing.origin?.name?.toLowerCase() as string)).toEqual({
      'wide screen': { measure: 8, unit: 'Pixels' },
    });
  });

  it('should skip a token without a device, a measure or a supported unit', () => {
    const map = buildDeviceDimensionMap(
      [
        spacing,
        deviceToken('Mobile', { measure: undefined, unit: 'Pixels' }),
        deviceToken('Mobile', { measure: 16, unit: 'Ms' }),
        { ...deviceToken('Mobile', {}), value: undefined } as unknown as Token,
      ],
      exampleGroups,
    );

    expect(map.size).toBe(0);
  });
});
