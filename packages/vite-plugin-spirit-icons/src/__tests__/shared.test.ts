import {
  filterSvgFiles,
  getIconType,
  ICON_TYPE_COLORED,
  ICON_TYPE_DUALTONE,
  stripSvgClipPaths,
} from '../steps/shared';

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

  describe('stripSvgClipPaths', () => {
    it('should leave SVG without clip paths unchanged', () => {
      const svgContent = '<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="currentColor" /></svg>';

      expect(stripSvgClipPaths(svgContent)).toBe(svgContent);
    });

    it('should remove clipPath inside defs and empty defs wrapper', () => {
      const svgContent =
        '<svg viewBox="0 0 24 24"><defs><clipPath id="a"><rect width="24" height="24" /></clipPath></defs><path d="M0 0h24v24H0z" /></svg>';

      expect(stripSvgClipPaths(svgContent)).toBe(
        '<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" /></svg>',
      );
    });

    it('should remove standalone clipPath elements', () => {
      const svgContent =
        '<svg viewBox="0 0 24 24"><clipPath id="a"><rect width="24" height="24" /></clipPath><path d="M0 0h24v24H0z" /></svg>';

      expect(stripSvgClipPaths(svgContent)).toBe(
        '<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" /></svg>',
      );
    });

    it('should remove the clip-path attribute and keep the g element', () => {
      const svgContent = '<svg viewBox="0 0 24 24"><g clip-path="url(#a)"><path d="M0 0h24v24H0z" /></g></svg>';

      expect(stripSvgClipPaths(svgContent)).toBe(
        '<svg viewBox="0 0 24 24"><g><path d="M0 0h24v24H0z" /></g></svg>',
      );
    });

    it('should keep other g attributes while removing clip-path', () => {
      const svgContent =
        '<svg viewBox="0 0 24 24"><g id="icon" clip-path="url(#a)" fill="none"><path d="M0 0h24v24H0z" /></g></svg>';

      expect(stripSvgClipPaths(svgContent)).toBe(
        '<svg viewBox="0 0 24 24"><g id="icon" fill="none"><path d="M0 0h24v24H0z" /></g></svg>',
      );
    });

    it('should keep nested groups intact', () => {
      const svgContent =
        '<svg viewBox="0 0 24 24"><g clip-path="url(#a)"><g id="inner"><path d="M0 0h24v24H0z" /></g><path d="M1 1h2v2H1z" /></g><rect width="24" height="24" /></svg>';

      expect(stripSvgClipPaths(svgContent)).toBe(
        '<svg viewBox="0 0 24 24"><g><g id="inner"><path d="M0 0h24v24H0z" /></g><path d="M1 1h2v2H1z" /></g><rect width="24" height="24" /></svg>',
      );
    });

    it('should remove clip-path attributes from nested groups', () => {
      const svgContent =
        '<svg viewBox="0 0 24 24"><g clip-path="url(#a)"><g clip-path="url(#b)"><path d="M0 0h24v24H0z" /></g></g></svg>';

      expect(stripSvgClipPaths(svgContent)).toBe(
        '<svg viewBox="0 0 24 24"><g><g><path d="M0 0h24v24H0z" /></g></g></svg>',
      );
    });

    it('should remove clip-path attributes from non-group elements', () => {
      const svgContent = '<svg viewBox="0 0 24 24"><path clip-path="url(#a)" d="M0 0h24v24H0z" /></svg>';

      expect(stripSvgClipPaths(svgContent)).toBe(
        '<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" /></svg>',
      );
    });

    it('should strip clip path definitions and attributes together', () => {
      const svgContent =
        '<svg viewBox="0 0 24 24"><defs><clipPath id="a"><rect width="24" height="24" /></clipPath></defs><g clip-path="url(#a)"><path d="M0 0h24v24H0z" /></g></svg>';

      expect(stripSvgClipPaths(svgContent)).toBe(
        '<svg viewBox="0 0 24 24"><g><path d="M0 0h24v24H0z" /></g></svg>',
      );
    });
  });
});
