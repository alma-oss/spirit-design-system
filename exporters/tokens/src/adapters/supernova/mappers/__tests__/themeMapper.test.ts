import { type TokenTheme } from '@supernovaio/sdk-exporters';
import { CollectionKind } from '../../../../core/types';
import { mapDevice, mapTheme } from '../themeMapper';

describe('themeMapper', () => {
  describe('mapTheme', () => {
    it('should map a token theme to the internal model', () => {
      const theme = {
        id: 'theme-1',
        name: 'Dark',
        codeName: 'dark',
      } as unknown as TokenTheme;

      const result = mapTheme(theme);

      expect(result).toEqual({ id: 'theme-1', name: 'Dark', codeName: 'dark', collection: CollectionKind.Color });
    });

    it('should map a theme overriding the devices collection to a device theme', () => {
      const theme = {
        id: 'theme-2',
        name: 'Mobile',
        codeName: 'mobile',
        brandId: 'brand-1',
        overriddenTokens: [{ propertyValues: { collection: 'devices-id' } }],
      } as unknown as TokenTheme;

      const result = mapTheme(theme, 'devices-id');

      expect(result).toEqual({
        id: 'theme-2',
        name: 'Mobile',
        codeName: 'mobile',
        collection: CollectionKind.Devices,
        device: 'mobile',
        brandId: 'brand-1',
      });
      expect(mapDevice(result)).toEqual({ name: 'mobile', themeId: 'theme-2' });
    });

    it('should leave out the code name and the brand a theme does not have', () => {
      const result = mapTheme({ id: 't', name: 'Dark', codeName: '', brandId: '' } as unknown as TokenTheme);

      expect(result.codeName).toBeUndefined();
      expect(result.brandId).toBeUndefined();
    });

    it('should leave out the device of a device theme without a code name', () => {
      const theme = {
        id: 't',
        name: 'Mobile',
        codeName: '',
        overriddenTokens: [{ propertyValues: { collection: 'd' } }],
      };

      expect(mapTheme(theme as unknown as TokenTheme, 'd').device).toBeUndefined();
    });

    it('should not map a color theme to a device', () => {
      expect(mapDevice(mapTheme({ id: 't', name: 'Dark', codeName: 'dark' } as unknown as TokenTheme))).toBeNull();
    });
  });
});
