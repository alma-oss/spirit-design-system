import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import sade from 'sade';

import { loadConfig } from './config';
import { ConfigError } from './errors';
import { syncAssets } from './sync';
import type { SyncResult } from './types';

interface PackageManifest {
  description: string;
  version: string;
}

interface CliOptions {
  fetch?: typeof fetch;
  log?: (message: string) => void;
  sync?: typeof syncAssets;
  token?: string;
}

const readPackageManifest = (): PackageManifest => {
  const packageJsonUrl = new URL('../package.json', import.meta.url);

  return JSON.parse(readFileSync(fileURLToPath(packageJsonUrl), 'utf8')) as PackageManifest;
};

const printResult = (result: SyncResult, log: (message: string) => void): void => {
  result.targets.forEach((target) => {
    const added = target.changes.filter(({ type }) => type === 'added').length;
    const updated = target.changes.filter(({ type }) => type === 'updated').length;
    const deleted = target.changes.filter(({ type }) => type === 'deleted').length;

    log(
      `${target.brand}: exported ${target.exported} assets to ${target.out} (${added} added, ${updated} updated, ${deleted} deleted)`,
    );
  });
};

const createProgram = (options: CliOptions, log: (message: string) => void) => {
  const { description, version } = readPackageManifest();

  return sade('spirit-assets')
    .version(version)
    .describe(description)
    .command('sync')
    .describe('Synchronize assets from Figma into configured directories')
    .option('-c, --config', 'Path to the configuration file')
    .action(async (opts: { config?: string | boolean }) => {
      if (opts.config !== undefined && typeof opts.config !== 'string') {
        throw new ConfigError('--config requires a path.');
      }

      const config = await loadConfig(opts.config);
      const sync = options.sync ?? syncAssets;
      const result = await sync({
        config,
        fetch: options.fetch,
        token: options.token ?? process.env.FIGMA_ACCESS_TOKEN ?? '',
      });

      printResult(result, log);
    });
};

export const runCli = async (argv: string[], options: CliOptions = {}): Promise<void> => {
  const log = options.log ?? console.log;
  const originalLog = console.log;
  const processArgv = ['node', 'spirit-assets', ...argv];

  console.log = log;

  try {
    const parsed = createProgram(options, log).parse(processArgv, { lazy: true });

    if (!parsed) {
      return;
    }

    await parsed.handler.apply(null, parsed.args);
  } finally {
    console.log = originalLog;
  }
};
