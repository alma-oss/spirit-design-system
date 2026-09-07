#!/usr/bin/env node
import path from 'node:path';
import { loadConfig } from './config';
import { syncTokens, type SyncResult } from './sync';

const DEFAULT_CONFIG_PATH = 'figma-tokens.config.json';

interface CliOptions {
  log?: (message: string) => void;
  sync?: typeof syncTokens;
}

const printUsage = (log: (message: string) => void): void => {
  log(`Usage: figma-tokens <generate|check> [--config <path>] [--snapshot <path>] [--dry-run]

Commands:
  generate  Write SCSS and TypeScript token files from a plugin snapshot
  check     Exit with an error when generated files would change

The snapshot is produced by the local Figma plugin. REST variable extraction is not implemented.
`);
};

const readOption = (args: string[], name: string): string | undefined => {
  const index = args.indexOf(name);

  if (index === -1) {
    return undefined;
  }

  const value = args[index + 1];

  if (!value || value.startsWith('-')) {
    throw new Error(`${name} requires a path.`);
  }

  return path.resolve(value);
};

const printResult = (result: SyncResult, log: (message: string) => void, dryRun: boolean): void => {
  const added = result.changes.filter(({ type }) => type === 'added').length;
  const updated = result.changes.filter(({ type }) => type === 'updated').length;
  const deleted = result.changes.filter(({ type }) => type === 'deleted').length;
  const action = dryRun ? 'would export' : 'exported';

  log(
    `${result.brand}: ${action} ${result.exported} files to ${result.out} (${added} added, ${updated} updated, ${deleted} deleted)`,
  );
  result.warnings.forEach((warning) => log(`warning: ${warning}`));
};

export const runCli = async (argv: string[], options: CliOptions = {}): Promise<void> => {
  const [command, ...args] = argv;
  const log = options.log ?? console.log;

  if (command === '--help' || command === '-h') {
    printUsage(log);
    return;
  }

  if (command !== 'generate' && command !== 'check') {
    printUsage(log);
    throw new Error(command ? `Unknown command: ${command}` : 'A command is required.');
  }

  const configPath = readOption(args, '--config') ?? path.resolve(DEFAULT_CONFIG_PATH);
  const snapshotOverride = readOption(args, '--snapshot');
  const dryRun = args.includes('--dry-run');
  const config = await loadConfig(configPath);
  const resolvedConfig = snapshotOverride ? { ...config, snapshot: snapshotOverride } : config;
  const sync = options.sync ?? syncTokens;
  const result = await sync({
    config: resolvedConfig,
    dryRun: command === 'generate' && dryRun,
    check: command === 'check',
  });

  printResult(result, log, command === 'generate' && dryRun);
};
