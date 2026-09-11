import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdtemp } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const bundlePath = path.resolve(__dirname, '../../dist-ci/spirit-assets.mjs');

describe('CI CLI bundle', () => {
  it('starts without the monorepo node_modules', async () => {
    expect(existsSync(bundlePath)).toBe(true);

    const cwd = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-ci-cli-'));
    const { stdout: help } = await execFileAsync(process.execPath, [bundlePath, '--help'], {
      cwd,
      timeout: 10_000,
    });
    const { stdout: syncHelp } = await execFileAsync(process.execPath, [bundlePath, 'sync', '--help'], {
      cwd,
      timeout: 10_000,
    });

    expect(help).toContain('sync');
    expect(syncHelp).toContain('--config');
  });
});
