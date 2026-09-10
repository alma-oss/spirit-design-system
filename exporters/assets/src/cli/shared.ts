import { writeFile } from 'node:fs/promises';

import sade from 'sade';

import packageJson from '../../package.json';
import { filterTargets } from '../config/resolve';
import { ConfigError } from '../errors';
import { syncAssets } from '../sync';
import { resolvePublishNotes } from '../sync/adapters/figma/publishNotes';
import type { ResolvedAssetsConfig, SyncResult } from '../types';

interface SyncCliOptions {
  brand?: string | boolean;
  config?: string | boolean;
  out?: string | boolean;
  publishNotesPath?: string | boolean;
  repositoryRoot?: string | boolean;
}

export interface SyncCliDependencies {
  fetch?: typeof fetch;
  log?: (message: string) => void;
  resolveNotes?: typeof resolvePublishNotes;
  sync?: typeof syncAssets;
  token?: string;
  writeFile?: (path: string, contents: string) => Promise<void>;
}

export type LoadSyncConfig = (
  configPath: string | undefined,
  repositoryRoot: string | undefined,
) => Promise<ResolvedAssetsConfig>;

export const SYNC_FLAGS_REQUIRING_VALUE = [
  '-c',
  '--config',
  '--repository-root',
  '--brand',
  '--out',
  '--publish-notes-path',
] as const;

const assertFlagsHaveValues = (argv: string[], flags: readonly string[]): void => {
  flags.forEach((flag) => {
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

const requireStringOption = (value: string | boolean | undefined): string | undefined =>
  typeof value === 'string' ? value : undefined;

export const readOption = (
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

export const createBaseProgram = () =>
  sade('spirit-assets').version(packageJson.version).describe(packageJson.description);

export const registerSyncCommand = (
  program: ReturnType<typeof createBaseProgram>,
  options: SyncCliDependencies & { log: (message: string) => void },
  loadSyncConfig: LoadSyncConfig,
  requireRepositoryRoot = false,
) =>
  program
    .command('sync')
    .describe('Synchronize assets from Figma into configured directories')
    .option('-c, --config', 'Path to the configuration file')
    .option('--repository-root', 'Confine outputs to this repository checkout')
    .option('--brand', 'Synchronize only this brand')
    .option('--out', 'Synchronize only this output path')
    .option('--publish-notes-path', 'Write Figma publish notes to this file')
    .action(async (opts: SyncCliOptions) => {
      const optionValues = opts as SyncCliOptions & Record<string, string | boolean | undefined>;
      const configPath = readOption(optionValues, 'config', 'c');
      const repositoryRoot = readOption(optionValues, 'repositoryRoot', 'repository-root');
      const brand = readOption(optionValues, 'brand', 'brand');
      const out = readOption(optionValues, 'out', 'out');
      const publishNotesPath = readOption(optionValues, 'publishNotesPath', 'publish-notes-path');

      if (requireRepositoryRoot && !repositoryRoot) {
        throw new ConfigError('--repository-root is required.');
      }

      const loadedConfig = await loadSyncConfig(configPath, repositoryRoot);

      if (publishNotesPath) {
        const resolveNotes = options.resolveNotes ?? resolvePublishNotes;
        const notes = await resolveNotes({
          description: process.env.DISPATCH_DESCRIPTION,
          fetch: options.fetch,
          fileKey: loadedConfig.fileKey,
          logError: options.log,
          token: options.token ?? process.env.FIGMA_ACCESS_TOKEN,
        });
        const writeNotes = options.writeFile ?? writeFile;
        await writeNotes(publishNotesPath, notes);
      }

      const config = filterTargets(loadedConfig, brand, out);
      const sync = options.sync ?? syncAssets;
      const result = await sync({
        config,
        fetch: options.fetch,
        token: options.token ?? process.env.FIGMA_ACCESS_TOKEN ?? '',
      });

      printResult(result, options.log);
    });

export const runCliProgram = async (
  argv: string[],
  program: ReturnType<typeof createBaseProgram>,
  log: (message: string) => void,
  flagsRequiringValue: readonly string[],
): Promise<void> => {
  const originalLog = console.log;
  const processArgv = ['node', 'spirit-assets', ...argv];

  console.log = log;

  try {
    assertFlagsHaveValues(argv, flagsRequiringValue);
    const stringOptions = flagsRequiringValue.map((flag) => flag.replace(/^-+/, ''));
    const parsed = program.parse(processArgv, { lazy: true, string: stringOptions });

    if (!parsed) {
      return;
    }

    await parsed.handler.apply(null, parsed.args);
  } finally {
    console.log = originalLog;
  }
};
