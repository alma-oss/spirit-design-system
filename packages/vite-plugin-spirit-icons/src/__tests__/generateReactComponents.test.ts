import fs from 'fs';
import os from 'os';
import path from 'path';
import { generateReactComponents } from '../steps/generateReactComponents';

describe('generateReactComponents', () => {
  let srcDir: string;
  let distDir: string;

  beforeEach(() => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'spirit-icons-'));
    srcDir = path.join(tmp, 'svg');
    distDir = path.join(tmp, 'react');
    fs.mkdirSync(srcDir);
  });

  afterEach(() => {
    fs.rmSync(path.dirname(srcDir), { recursive: true, force: true });
  });

  it('should generate a component with size, rest props and display name', async () => {
    fs.writeFileSync(
      path.join(srcDir, 'AddIcon.svg'),
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill-rule="evenodd"><path d="M0 0" fill="currentColor"/></svg>',
    );

    await generateReactComponents(srcDir, distDir);

    const output = fs.readFileSync(path.join(distDir, 'AddIcon.tsx'), 'utf8');

    expect(output).toContain('size?: number | string');
    expect(output).toContain("width={size || '24'}");
    expect(output).toContain("height={size || '24'}");
    expect(output).toContain('fill="currentColor"');
    expect(output).toContain('{...props}');
    expect(output).toContain('fillRule="evenodd"');
    expect(output).toContain("Icon.displayName = 'AddIcon'");
    expect(output).toContain('export default Icon');
    expect(output).not.toContain('xmlns');
  });

  it.each([
    ['class to className', '<svg viewBox="0 0 24 24"><path class="a" d="M0 0"/></svg>', 'className="a"'],
    [
      'xlink:href to xlinkHref',
      '<svg viewBox="0 0 24 24" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#a"/></svg>',
      'xlinkHref="#a"',
    ],
    [
      'child fill="none" kept as is',
      '<svg viewBox="0 0 24 24"><path d="M0 0" fill="none" stroke="currentColor"/></svg>',
      'fill="none"',
    ],
    [
      'root fill="none" replaced by currentColor',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M0 0" fill-rule="evenodd"/></svg>',
      '<svg viewBox="0 0 24 24" fill="currentColor"',
    ],
    [
      'colored child fill kept',
      '<svg viewBox="0 0 24 24" fill="none"><g><path d="M0 0" fill="#4285F4"/></g></svg>',
      'fill="#4285F4"',
    ],
    [
      'dualtone child fill kept',
      '<svg viewBox="0 0 24 24" fill="none"><path d="M0 0" fill="var(--icon-dualtone, #F2F2F2)"/></svg>',
      'fill="var(--icon-dualtone, #F2F2F2)"',
    ],
    [
      'size fixed to 24 regardless of source dimensions',
      '<svg width="48" height="16" viewBox="0 0 48 16"><path d="M0 0"/></svg>',
      "width={size || '24'}",
    ],
  ])('should handle %s', async (_name, svg, expected) => {
    fs.writeFileSync(path.join(srcDir, 'TestIcon.svg'), svg);

    await generateReactComponents(srcDir, distDir);

    expect(fs.readFileSync(path.join(distDir, 'TestIcon.tsx'), 'utf8')).toContain(expected);
  });

  it('should name the failing icon in the error', async () => {
    fs.writeFileSync(path.join(srcDir, 'BrokenIcon.svg'), '<svg><path</svg>');

    await expect(generateReactComponents(srcDir, distDir)).rejects.toThrow(
      /Failed to generate React component BrokenIcon/,
    );
  });

  it('should ignore non-svg files and sprite.svg', async () => {
    fs.writeFileSync(path.join(srcDir, 'sprite.svg'), '<svg/>');
    fs.writeFileSync(path.join(srcDir, 'note.txt'), 'x');

    await generateReactComponents(srcDir, distDir);

    expect(fs.existsSync(distDir)).toBe(false);
  });
});
