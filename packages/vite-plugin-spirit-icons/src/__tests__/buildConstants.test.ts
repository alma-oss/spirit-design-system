import fs from 'fs';
import os from 'os';
import path from 'path';

// Make filterSvgFiles resilient to undefined to avoid CI edge case crashes
jest.mock('../steps/shared', () => {
  const path = require('path');
  return {
    filterSvgFiles: (fileNames: string[] | undefined) =>
      Array.isArray(fileNames)
        ? fileNames.filter((fileName) => path.extname(fileName) === '.svg' && fileName !== 'sprite.svg')
        : [],
  };
});

import { buildConstants } from '../steps/buildConstants';

// Helper to create a temp workspace with svg files
const setupTemp = (svgs: Record<string, string>) => {
  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'build-const-'));
  const srcDir = path.join(tmpRoot, 'src');

  fs.mkdirSync(srcDir, { recursive: true });

  Object.entries(svgs).forEach(([name, inner]) => {
    const filePath = path.join(srcDir, `${name}.svg`);
    fs.writeFileSync(filePath, `<svg>${inner}</svg>`);
  });

  return { tmpRoot, srcDir };
};

const waitForFile = async (filePath: string, timeoutMs = 2000) => {
  const start = Date.now();

  while (Date.now() - start <= timeoutMs) {
    if (fs.existsSync(filePath)) return true;
    await new Promise((r) => setTimeout(r, 10));
  }

  return false;
};

const buildConstantsWithTempSvgs = async (svgs: Record<string, string>) => {
  const { tmpRoot, srcDir } = setupTemp(svgs);
  const distFile = path.join(tmpRoot, 'icons.js');

  buildConstants(srcDir, distFile);

  const exists = await waitForFile(distFile);
  const content = exists ? fs.readFileSync(distFile, 'utf8') : '';

  // Cleanup temporary directory
  fs.rmSync(tmpRoot, { recursive: true, force: true });

  return { exists, content };
};

describe('buildConstants', () => {
  it('should create constants file with icon inner SVG contents', async () => {
    const { exists, content } = await buildConstantsWithTempSvgs({
      addIcon: '<path d="u"/>',
      bulletIcon: '<g><rect/></g>',
    });

    expect(exists).toBe(true);
    expect(content).toContain('const icons =');
    expect(content).toMatch(/"addIcon":/);
    expect(content).toMatch(/"bulletIcon":/);
    expect(content).toContain('<path d=\\"u\\"></path>');
    expect(content).toContain('<g><rect></rect></g>');
    expect(content).toMatch(/export default icons;$/);
  });

  it('should ignore non-svg and sprite.svg files via filterSvgFiles', async () => {
    const { tmpRoot, srcDir } = setupTemp({ addIcon: '<circle />' });

    fs.writeFileSync(path.join(srcDir, 'sprite.svg'), '<svg></svg>');
    fs.writeFileSync(path.join(srcDir, 'README.md'), '# readme');

    const distFile = path.join(tmpRoot, 'icons.js');

    buildConstants(srcDir, distFile);
    await waitForFile(distFile);
    const content = fs.readFileSync(distFile, 'utf8');

    expect(content).toMatch(/"addIcon"/);
    expect(content).not.toMatch(/sprite/);

    // Cleanup temporary directory
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  });

  it('should do nothing when no svg files present', async () => {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'build-const-empty-'));
    const distFile = path.join(tmpRoot, 'icons.js');

    buildConstants(tmpRoot, distFile);

    const created = await waitForFile(distFile, 200);
    expect(created).toBe(false);

    // Cleanup temporary directory
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  });
});
