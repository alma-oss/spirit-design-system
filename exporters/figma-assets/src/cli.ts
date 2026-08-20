#!/usr/bin/env node
import path from 'node:path';

import { loadConfig } from './config';
import { syncAssets } from './sync';
import type { SyncResult } from './types';

const DEFAULT_CONFIG_PATH = 'figma-assets.config.json';

interface CliOptions {
  fetch?: typeof fetch;
  log?: (message: string) => void;
  sync?: typeof syncAssets;
  token?: string;
}

const printUsage = (log: (message: string) => void): void => {
  log(`Usage: figma-assets sync [--config <path>]

Environment:
  FIGMA_ACCESS_TOKEN  Figma personal access token with file read access
`);
};

const readConfigArgument = (args: string[]): string => {
  const configIndex = args.indexOf('--config');

  if (configIndex === -1) {
    return path.resolve(DEFAULT_CONFIG_PATH);
  }

  const configPath = args[configIndex + 1];

  if (!configPath || configPath.startsWith('-')) {
    throw new Error('--config requires a path.');
  }

  return path.resolve(configPath);
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

export const runCli = async (argv: string[], options: CliOptions = {}): Promise<void> => {
  const [command, ...args] = argv;
  const log = options.log ?? console.log;

  if (command === '--help' || command === '-h') {
    printUsage(log);
    return;
  }

  if (command !== 'sync') {
    printUsage(log);
    throw new Error(command ? `Unknown command: ${command}` : 'A command is required.');
  }

  const configPath = readConfigArgument(args);
  const config = await loadConfig(configPath);
  const sync = options.sync ?? syncAssets;
  const result = await sync({
    config,
    token: options.token ?? process.env.FIGMA_ACCESS_TOKEN ?? '',
    fetch: options.fetch,
  });

  printResult(result, log);
};
