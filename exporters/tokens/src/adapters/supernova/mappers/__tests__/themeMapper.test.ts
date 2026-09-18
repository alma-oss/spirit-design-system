import { type TokenTheme } from '@supernovaio/sdk-exporters';
import { mapTheme } from '../themeMapper';

describe('themeMapper', () => {
  describe('mapTheme', () => {
    it('maps a token theme to the internal model', () => {
      const theme = {
        id: 'theme-1',
        name: 'Dark',
        codeName: 'dark',
      } as unknown as TokenTheme;

      const result = mapTheme(theme);

      expect(result).toEqual({ id: 'theme-1', name: 'Dark' });
    });
  });
});
