import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

import { ROOT_CONFIG_FILE } from '../../constants';
import type { ListedRepository } from './app';

const execFileAsync = promisify(execFile);

export const sparseCheckoutRepository = async (
  repository: ListedRepository,
  directory: string,
  exec: typeof execFileAsync = execFileAsync,
): Promise<void> => {
  try {
    await exec(
      'git',
      [
        'clone',
        '--depth',
        '1',
        '--filter=blob:none',
        '--sparse',
        `https://x-access-token:${repository.token}@github.com/${repository.owner}/${repository.name}.git`,
        directory,
      ],
      { env: { ...process.env, GIT_TERMINAL_PROMPT: '0' }, timeout: 15_000 },
    );
    await exec('git', ['sparse-checkout', 'set', '--cone', ROOT_CONFIG_FILE], { cwd: directory });
  } catch {
    throw new Error(`Unable to checkout ${repository.owner}/${repository.name}.`);
  }
};
