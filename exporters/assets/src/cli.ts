import { readFileSync } from 'node:fs';
import { appendFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import sade from 'sade';

import { filterTargets, loadConfig } from './config';
import { discoverSyncTargets } from './discover';
import { ConfigError } from './errors';
import { syncAssets } from './sync';
import type { SyncResult } from './types';

interface PackageManifest {
  description: string;
  version: string;
}

interface CliOptions {
  discover?: typeof discoverSyncTargets;
  fetch?: typeof fetch;
  log?: (message: string) => void;
  logError?: (message: string) => void;
  sync?: typeof syncAssets;
  token?: string;
  writeOutput?: (path: string, contents: string) => Promise<void>;
}

interface SyncCliOptions {
  brand?: string | boolean;
  config?: string | boolean;
  out?: string | boolean;
  repositoryRoot?: string | boolean;
}

interface DiscoverCliOptions {
  fileKey?: string | boolean;
}

const readPackageManifest = (): PackageManifest => {
  const packageJsonUrl = new URL('../package.json', import.meta.url);

  return JSON.parse(readFileSync(fileURLToPath(packageJsonUrl), 'utf8')) as PackageManifest;
};

const FLAGS_REQUIRING_VALUE = ['-c', '--config', '--repository-root', '--brand', '--out', '--file-key'];

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

const createProgram = (options: CliOptions, log: (message: string) => void, logError: (message: string) => void) => {
  const { description, version } = readPackageManifest();

  return sade('spirit-assets')
    .version(version)
    .describe(description)
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
      const config = filterTargets(await loadConfig(configPath, { repositoryRoot }), brand, out);
      const sync = options.sync ?? syncAssets;
      const result = await sync({
        config,
        fetch: options.fetch,
        token: options.token ?? process.env.FIGMA_ACCESS_TOKEN ?? '',
      });

      printResult(result, log);
    })
    .command('discover')
    .describe('Discover GitHub App repositories that opt into asset sync')
    .option('--file-key', 'Only include configs for this Figma file key')
    .action(async (opts: DiscoverCliOptions) => {
      const optionValues = opts as DiscoverCliOptions & Record<string, string | boolean | undefined>;
      const fileKey = readOption(optionValues, 'fileKey', 'file-key') ?? process.env.DISPATCH_FILE_KEY;
      const discover = options.discover ?? discoverSyncTargets;
      const result = await discover({
        appId: process.env.GH_APP_CLIENT_ID,
        fileKey: fileKey || undefined,
        log: logError,
        privateKey: process.env.GH_APP_PRIVATE_KEY,
      });
      const json = JSON.stringify(result);

      log(json);

      if (process.env.GITHUB_OUTPUT) {
        const writeOutput = options.writeOutput ?? appendFile;
        const hasTargets = result.include.length > 0;

        await writeOutput(process.env.GITHUB_OUTPUT, `matrix<<MATRIX\n${json}\nMATRIX\nhas-targets=${hasTargets}\n`);
      }
    });
};

export const runCli = async (argv: string[], options: CliOptions = {}): Promise<void> => {
  const log = options.log ?? console.log;
  const logError = options.logError ?? console.error;
  const originalLog = console.log;
  const processArgv = ['node', 'spirit-assets', ...argv];

  console.log = log;

  try {
    assertFlagsHaveValues(argv);
    const parsed = createProgram(options, log, logError).parse(processArgv, { lazy: true });

    if (!parsed) {
      return;
    }

    await parsed.handler.apply(null, parsed.args);
  } finally {
    console.log = originalLog;
  }
};
