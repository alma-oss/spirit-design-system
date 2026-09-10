import { appendFile } from 'node:fs/promises';

import {
  createBaseProgram,
  readOption,
  registerSyncCommand,
  runCliProgram,
  SYNC_FLAGS_REQUIRING_VALUE,
  type SyncCliDependencies,
} from './cli/shared';
import { loadConfig } from './config';
import { ConfigError } from './errors';
import { discoverSyncTargets, formatGitHubActionsOutput } from './providers/github';

interface CliOptions extends SyncCliDependencies {
  discover?: typeof discoverSyncTargets;
  logError?: (message: string) => void;
  writeOutput?: (path: string, contents: string) => Promise<void>;
}

interface DiscoverCliOptions {
  fileKey?: string | boolean;
}

const FLAGS_REQUIRING_VALUE = [...SYNC_FLAGS_REQUIRING_VALUE, '--file-key'];

const createProgram = (options: CliOptions, log: (message: string) => void, logError: (message: string) => void) => {
  return registerSyncCommand(createBaseProgram(), { ...options, log }, (configPath, repositoryRoot) =>
    loadConfig(configPath, { repositoryRoot }),
  )
    .command('discover')
    .describe('Discover GitHub App repositories that opt into asset sync')
    .option('--file-key', 'Only include configs for this Figma file key')
    .action(async (opts: DiscoverCliOptions) => {
      const optionValues = opts as DiscoverCliOptions & Record<string, string | boolean | undefined>;
      const fileKey = readOption(optionValues, 'fileKey', 'file-key') ?? process.env.DISPATCH_FILE_KEY;

      if (process.env.GITHUB_EVENT_NAME === 'repository_dispatch' && !fileKey?.trim()) {
        throw new ConfigError('DISPATCH_FILE_KEY is required for repository_dispatch.');
      }

      const discover = options.discover ?? discoverSyncTargets;
      const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
      const result = await discover({
        appId: process.env.GH_APP_CLIENT_ID,
        fileKey: fileKey || undefined,
        log: logError,
        privateKey: process.env.GH_APP_PRIVATE_KEY,
        redact: isGitHubActions,
      });

      if (process.env.GITHUB_OUTPUT) {
        const writeOutput = options.writeOutput ?? appendFile;
        await writeOutput(process.env.GITHUB_OUTPUT, formatGitHubActionsOutput(result));
        logError(`Discovered ${result.include.length} asset sync target(s).`);
      } else {
        log(JSON.stringify(result));
      }
    });
};

export const runCli = async (argv: string[], options: CliOptions = {}): Promise<void> => {
  const log = options.log ?? console.log;
  const logError = options.logError ?? console.error;

  await runCliProgram(argv, createProgram(options, log, logError), log, FLAGS_REQUIRING_VALUE);
};
