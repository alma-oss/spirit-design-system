import sade from 'sade';

import packageJson from '../package.json';
import { filterTargets } from './config/resolve';
import { ConfigError } from './errors';
import { loadRepositoryConfig } from './repository/load';
import { syncAssets } from './sync';
import type { SyncResult } from './types';

interface SyncCliOptions {
  brand?: string | boolean;
  config?: string | boolean;
  out?: string | boolean;
  repositoryRoot?: string | boolean;
}

export interface RunSyncCliOptions {
  fetch?: typeof fetch;
  log?: (message: string) => void;
  sync?: typeof syncAssets;
  token?: string;
}

const FLAGS_REQUIRING_VALUE = ['-c', '--config', '--repository-root', '--brand', '--out'];

const assertFlagsHaveValues = (argv: string[]): void => {
  FLAGS_REQUIRING_VALUE.forEach((flag) => {
    const index = argv.indexOf(flag);

    if (index !== -1) {
      const next = argv[index + 1];

      if (next === undefined || next.startsWith('-')) {
        throw new ConfigError(`${flag} requires a value.`);
      }
    }
  });
};

const requireStringOption = (value: string | boolean | undefined): string | undefined =>
  typeof value === 'string' ? value : undefined;

const readOption = (
  opts: Record<string, string | boolean | undefined>,
  camelCaseKey: string,
  kebabCaseKey: string,
): string | undefined => requireStringOption(opts[camelCaseKey] ?? opts[kebabCaseKey]);

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

export const runSyncCli = async (argv: string[], options: RunSyncCliOptions = {}): Promise<void> => {
  const log = options.log ?? console.log;
  const originalLog = console.log;
  const processArgv = ['node', 'spirit-assets', ...argv];

  console.log = log;

  try {
    assertFlagsHaveValues(argv);
    const program = sade('spirit-assets')
      .version(packageJson.version)
      .describe(packageJson.description)
      .command('sync')
      .describe('Synchronize assets from Figma into configured directories')
      .option('-c, --config', 'Path to the configuration file')
      .option('--repository-root', 'Confine outputs to this repository checkout')
      .option('--brand', 'Synchronize only this brand')
      .option('--out', 'Synchronize only this output path')
      .action(async (opts: SyncCliOptions) => {
        const optionValues = opts as SyncCliOptions & Record<string, string | boolean | undefined>;
        const configPath = readOption(optionValues, 'config', 'c');
        const repositoryRoot = readOption(optionValues, 'repositoryRoot', 'repository-root');
        const brand = readOption(optionValues, 'brand', 'brand');
        const out = readOption(optionValues, 'out', 'out');

        if (!repositoryRoot) {
          throw new ConfigError('--repository-root is required.');
        }

        const config = filterTargets(await loadRepositoryConfig(configPath, repositoryRoot), brand, out);
        const sync = options.sync ?? syncAssets;
        const result = await sync({
          config,
          fetch: options.fetch,
          token: options.token ?? process.env.FIGMA_ACCESS_TOKEN ?? '',
        });

        printResult(result, log);
      });

    const parsed = program.parse(processArgv, { lazy: true });

    if (!parsed) {
      return;
    }

    await parsed.handler.apply(null, parsed.args);
  } finally {
    console.log = originalLog;
  }
};
