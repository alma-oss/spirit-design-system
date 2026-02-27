import fs from 'fs';
import os from 'os';
import path from 'path';

// Ensure shared.filterSvgFiles is resilient to undefined in CI fs edge cases
jest.mock('../steps/shared', () => {
  const p = require('path');
  return {
    filterSvgFiles: (fileNames: string[] | undefined) =>
      Array.isArray(fileNames)
        ? fileNames.filter((fileName) => p.extname(fileName) === '.svg' && fileName !== 'sprite.svg')
        : [],
  };
});

import { toPascalCase, prepareSvgForReactComponent } from '../steps/prepareSvgReact';

/** Wait until directory contains expected file count (polling) */
const waitForFilesCount = async (dir: string, expectedCount: number, timeoutMs = 2000) => {
  const start = Date.now();
  const pollInterval = 10;
  const maxIterations = Math.ceil(timeoutMs / pollInterval);

  for (let i = 0; i < maxIterations; i++) {
    const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
    if (files.length >= expectedCount) return true;
    if (Date.now() - start > timeoutMs) return false;
    await new Promise((r) => setTimeout(r, pollInterval));
  }

  return false;
};

/** Helper that runs exported prepareSvgForReactComponent with temp dirs */
const prepareSvgReactWithTempSvgs = async (inputFileNames: string[]) => {
  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'prepare-svg-react-'));
  const srcDir = path.join(tmpRoot, 'src');
  const destDir = path.join(tmpRoot, 'dest');

  fs.mkdirSync(srcDir, { recursive: true });
  fs.mkdirSync(destDir, { recursive: true });

  inputFileNames.forEach((name) => {
    fs.writeFileSync(path.join(srcDir, name), '<svg></svg>');
  });

  prepareSvgForReactComponent(srcDir, destDir);

  // Wait deterministically for all expected outputs (exclude sprite.svg and non-svg inputs)
  const expectedCount = inputFileNames.filter((n) => n.endsWith('.svg') && n !== 'sprite.svg').length;
  await waitForFilesCount(destDir, expectedCount);

  const produced = fs.readdirSync(destDir).sort();

  // Cleanup
  fs.rmSync(tmpRoot, { recursive: true, force: true });

  return produced;
};

describe('toPascalCase', () => {
  it('converts simple filename', () => {
    expect(toPascalCase('add.svg')).toBe('Add');
  });

  it('removes hyphens and capitalizes each segment', () => {
    expect(toPascalCase('folder-dualtone.svg')).toBe('FolderDualtone');
  });

  it('normalizes mixed case input', () => {
    expect(toPascalCase('WIFI-icon.svg')).toBe('WifiIcon');
  });

  it('handles numbers and keeps them in place', () => {
    expect(toPascalCase('3d-cube-icon.svg')).toBe('3dCubeIcon');
  });

  it('handles single word without extension safety', () => {
    expect(toPascalCase('bullet')).toBe('Bullet');
  });
});

describe('prepareSvgReact script', () => {
  it('copies svg files (excluding sprite.svg) and converts names to PascalCase + Icon suffix', async () => {
    const produced = await prepareSvgReactWithTempSvgs([
      'add.svg',
      'folder-dualtone.svg',
      'logo-facebook-colored.svg',
      'sprite.svg',
    ]);

    expect(produced).toEqual(['AddIcon.svg', 'FolderDualtoneIcon.svg', 'LogoFacebookColoredIcon.svg']);
  });

  it('handles filenames with uppercase letters and multiple hyphens', async () => {
    const produced = await prepareSvgReactWithTempSvgs(['API-status-check.svg', 'FLAG-COLORED.svg']);

    expect(produced).toEqual(['ApiStatusCheckIcon.svg', 'FlagColoredIcon.svg']);
  });
});
