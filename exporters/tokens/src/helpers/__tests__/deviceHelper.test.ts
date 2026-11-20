import { getDeviceTokenValue } from '../deviceHelpers';

describe('deviceHelper', () => {
  describe('getDeviceTokenValue', () => {
    it('returns the concatenated token value and device', () => {
      const result = getDeviceTokenValue('value', 'device');

      expect(result).toBe('value-device');
    });

    it('returns camelCase token value when hasJsOutput is true', () => {
      const result = getDeviceTokenValue('value', 'device', true);

      expect(result).toBe('valueDevice');
    });

    it('returns the concatenated token value and multiword device', () => {
      const result = getDeviceTokenValue('value', 'Device-Name');

      expect(result).toBe('value-device-name');
    });

    it('returns the concatenated token value and multiword device when hasJsOutput is true', () => {
      const result = getDeviceTokenValue('value', 'Device-Name', true);

      expect(result).toBe('valueDeviceName');
    });
  });
});
