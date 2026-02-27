import path from 'path';

// Mock fs before importing the module to suppress side effects from the bottom call in buildSvg.ts
const readdirMock = jest.fn();
const readFileSyncMock = jest.fn();
const writeFileSyncMock = jest.fn();

jest.mock('fs');
jest.mock('@alma-oss/spirit-design-tokens', () => ({
  cssVariablePrefix: 'spirit-',
}));

// Import mocked modules
import fs from 'fs';
import { cssVariablePrefix } from '@alma-oss/spirit-design-tokens';

// Now we can safely import buildSvg after all mocks are in place
import { normalizeSvgColors, normalizeAndCopySvg, DUALTONE_COLOR_BACKGROUND_DEFAULT, DUALTONE_COLOR_BORDER_DEFAULT } from '../steps/buildSvg';

// Setup the mocks
const mockFs = fs as jest.Mocked<typeof fs>;
mockFs.readdirSync = readdirMock;
mockFs.readFileSync = readFileSyncMock;
mockFs.writeFileSync = writeFileSyncMock;

describe('buildSvg', () => {
  describe('normalizeSvgColors', () => {

    it('should replace dualtone default colors with CSS variables', () => {
      const svgName = 'user-dualtone.svg';
      const svgContent = `<?xml version="1.0"?><svg viewBox="0 0 24 24"><rect fill="${DUALTONE_COLOR_BACKGROUND_DEFAULT}" /><path fill="${DUALTONE_COLOR_BORDER_DEFAULT}" /></svg>`;

      const output = normalizeSvgColors(svgName, svgContent);

      expect(output).toContain(
        `var(--${cssVariablePrefix}icon-dualtone-color-background, ${DUALTONE_COLOR_BACKGROUND_DEFAULT})`,
      );
      expect(output).toContain(
        `var(--${cssVariablePrefix}icon-dualtone-color-border, ${DUALTONE_COLOR_BORDER_DEFAULT})`,
      );
      expect(output.startsWith('<?xml')).toBe(true);
    });

    it('should keep colored icons unchanged', () => {
      const svgName = 'flag-colored.svg';
      const svgContent = '<svg viewBox="0 0 24 24"><path fill="#ABCDEF" /><path fill="#123456" /></svg>';

      const output = normalizeSvgColors(svgName, svgContent);

      expect(output).toBe(svgContent);
    });

    it('should normalize default icons to use currentColor and ignore fill="none"', () => {
      const svgName = 'close.svg';
      const svgContent =
        '<svg viewBox="0 0 24 24"><path fill="#000000" /><path fill="none" stroke="#FF0000" /><circle fill="#ABCDEF" /></svg>';

      const output = normalizeSvgColors(svgName, svgContent);

      expect(output).not.toContain('#000000');
      expect(output).not.toContain('#ABCDEF');
      expect(output.match(/fill="currentColor"/g)?.length).toBe(2);
      expect(output).toContain('fill="none"');
    });
  });

  describe('normalizeAndCopySvg', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      // Default side effect suppression for initial import already done; ensure fresh mocks for each test
      (readdirMock as jest.Mock).mockReturnValue([]);
    });

    it('should build sprite and write normalized SVGs', async () => {
      const srcDir = '/virtual/src';
      const distDir = '/virtual/dist';

      const files = ['alpha.svg', 'beta-dualtone.svg', 'gamma-colored.svg', 'sprite.svg']; // sprite.svg should be ignored from input list
      (readdirMock as jest.Mock).mockReturnValueOnce(files);

      // Provide file contents depending on file name
      (readFileSyncMock as jest.Mock).mockImplementation((filePath: string) => {
        const name = path.basename(filePath);
        if (name === 'alpha.svg') {
          return '<svg viewBox="0 0 24 24"><path fill="#000000" /></svg>';
        }
        if (name === 'beta-dualtone.svg') {
          return `<svg viewBox="0 0 24 24"><rect fill="${DUALTONE_COLOR_BACKGROUND_DEFAULT}" /><path fill="${DUALTONE_COLOR_BORDER_DEFAULT}" /></svg>`;
        }
        if (name === 'gamma-colored.svg') {
          return '<svg viewBox="0 0 24 24"><path fill="#FF0000" /><path fill="#00FF00" /></svg>';
        }
        return '';
      });

      normalizeAndCopySvg(srcDir, distDir);

      // Expect writeFileSync called once per input SVG (excluding sprite.svg) plus once for the sprite file
      // So alpha, beta-dualtone, gamma-colored, sprite.svg => 4 writes
      expect(writeFileSyncMock).toHaveBeenCalledTimes(4);

      // Last call should be sprite.svg (by implementation order)
      const lastCallPath = (writeFileSyncMock as jest.Mock).mock.calls.at(-1)[0];

      expect(lastCallPath).toBe(path.join(distDir, 'sprite.svg'));

      const spriteContent = (writeFileSyncMock as jest.Mock).mock.calls.at(-1)[1];

      // Sprite should contain symbol ids
      expect(spriteContent).toContain('<symbol id="alpha"');
      expect(spriteContent).toContain('<symbol id="beta-dualtone"');
      expect(spriteContent).toContain('<symbol id="gamma-colored"');
      // Sprite wrapper
      expect(spriteContent.startsWith('<svg')).toBe(true);
      expect(spriteContent.trim().endsWith('</svg>')).toBe(true);
    });

    it('should do nothing when only sprite.svg present (no writes expected)', async () => {
      (readdirMock as jest.Mock).mockReturnValueOnce(['sprite.svg']);

      normalizeAndCopySvg('/virtual/src', '/virtual/dist');

      // No writes because filter removes sprite.svg and list becomes empty
      expect(writeFileSyncMock).not.toHaveBeenCalled();
    });
  });
});
