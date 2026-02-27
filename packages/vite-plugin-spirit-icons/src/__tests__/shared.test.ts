import { filterSvgFiles, getIconType, ICON_TYPE_COLORED, ICON_TYPE_DUALTONE } from '../steps/shared';

describe('shared icon helpers', () => {
  describe('filterSvgFiles', () => {
    it('should return only .svg files and exclude sprite.svg', () => {
      const input = ['user.svg', 'sprite.svg', 'logo.png', 'add-user-dualtone.svg', 'flag-colored.svg', 'README.md'];
      const result = filterSvgFiles(input);

      expect(result).toEqual(['user.svg', 'add-user-dualtone.svg', 'flag-colored.svg']);
    });

    it('should return empty array when no svg files provided', () => {
      expect(filterSvgFiles(['a.png', 'b.txt'])).toEqual([]);
    });
  });

  describe('getIconType', () => {
    it('should detect dualtone icons', () => {
      expect(getIconType('add-user-dualtone.svg')).toBe(ICON_TYPE_DUALTONE);
    });

    it('should detect colored icons', () => {
      expect(getIconType('flag-colored.svg')).toBe(ICON_TYPE_COLORED);
    });

    it('should return default for icons without a suffix', () => {
      expect(getIconType('user.svg')).toBe('default');
    });

    it('should return default for non-matching svg names', () => {
      expect(getIconType('user-colored.png')).toBe('default');
    });
  });
});
