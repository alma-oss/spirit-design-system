import sade from 'sade';

import packageJson from '../package.json';
import { filterSources, loadConfig } from './config';
import { ConfigError } from './errors';
import { syncTokens } from './sync';
import type { SyncResult } from './types';

interface SyncCliOptions {
  brand?: string | boolean;
  config?: string | boolean;
  dryRun?: boolean;
}

export interface CliOptions {
  fetch?: typeof fetch;
  log?: (message: string) => void;
  sync?: typeof syncTokens;
  token?: string;
}

const FLAGS_REQUIRING_VALUE = ['-c', '--config', '--brand'] as const;

const assertFlagsHaveValues = (argv: string[]): void => {
  FLAGS_REQUIRING_VALUE.forEach((flag) => {
    const index = argv.indexOf(flag);
    const inlineValue = argv.find((argument) => argument.startsWith(`${flag}=`));

    if (inlineValue === `${flag}=`) {
      throw new ConfigError(`${flag} requires a value.`);
    }

    if (index !== -1) {
      const next = argv[index + 1];

      if (next === undefined || next.startsWith('-')) {
        throw new ConfigError(`${flag} requires a value.`);
      }
    }
  });
};

const readOption = (
  opts: Record<string, string | boolean | undefined>,
  camelCaseKey: string,
  kebabCaseKey: string,
): string | undefined => {
  const value = opts[camelCaseKey] ?? opts[kebabCaseKey];

  return typeof value === 'string' ? value : undefined;
};

const printResult = (result: SyncResult, log: (message: string) => void, dryRun: boolean): void => {
  result.sources.forEach((source) => {
    const added = source.changes.filter(({ type }) => type === 'added').length;
    const updated = source.changes.filter(({ type }) => type === 'updated').length;
    const deleted = source.changes.filter(({ type }) => type === 'deleted').length;
    const action = dryRun ? 'would export' : 'exported';

    log(
      `${source.brand}: ${action} ${source.exported} files to ${source.out} (${added} added, ${updated} updated, ${deleted} deleted)`,
    );
    source.warnings.forEach((warning) => log(`warning: ${warning}`));
  });
};

export const runCli = async (argv: string[], options: CliOptions = {}): Promise<void> => {
  const log = options.log ?? console.log;
  const program = sade('figma-tokens')
    .version(packageJson.version)
    .describe(packageJson.description)
    .command('sync')
    .describe('Synchronize design tokens from Figma into configured directories')
    .option('-c, --config', 'Path to the Spirit configuration file')
    .option('--brand', 'Synchronize only this brand')
    .option('--dry-run', 'Report changes without writing files')
    .action(async (opts: SyncCliOptions) => {
      const optionValues = opts as SyncCliOptions & Record<string, string | boolean | undefined>;
      const configPath = readOption(optionValues, 'config', 'c');
      const brand = readOption(optionValues, 'brand', 'brand');
      const dryRun = optionValues.dryRun === true || optionValues['dry-run'] === true;
      const loadedConfig = filterSources(await loadConfig(configPath), brand);
      const sync = options.sync ?? syncTokens;
      const result = await sync({
        config: loadedConfig,
        dryRun,
        fetch: options.fetch,
        token: options.token ?? process.env.FIGMA_ACCESS_TOKEN,
      });

      printResult(result, log, dryRun);
    });
  const originalLog = console.log;

  console.log = log;

  try {
    assertFlagsHaveValues(argv);
    const parsed = program.parse(['node', 'figma-tokens', ...argv], {
      lazy: true,
      string: ['config', 'c', 'brand'],
    });

    if (!parsed) {
      return;
    }

    await parsed.handler.apply(null, parsed.args);
  } finally {
    console.log = originalLog;
  }
};
