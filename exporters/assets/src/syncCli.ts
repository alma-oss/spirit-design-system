import { DELIVER_FLAGS_REQUIRING_VALUE, registerDeliverCommand, type DeliverCliDependencies } from './cli/deliver';
import {
  createBaseProgram,
  registerSyncCommand,
  runCliProgram,
  SYNC_FLAGS_REQUIRING_VALUE,
  type SyncCliDependencies,
} from './cli/shared';
import { loadRepositoryConfig } from './repository/load';

export type RunSyncCliOptions = SyncCliDependencies & DeliverCliDependencies;

export const runSyncCli = (argv: string[], options: RunSyncCliOptions = {}): Promise<void> => {
  const log = options.log ?? console.log;
  const program = createBaseProgram();

  return runCliProgram(
    argv,
    registerSyncCommand(
      registerDeliverCommand(program, { ...options, log }),
      { ...options, log },
      (configPath, repositoryRoot) => loadRepositoryConfig(configPath, repositoryRoot!),
      true,
    ),
    log,
    [...SYNC_FLAGS_REQUIRING_VALUE, ...DELIVER_FLAGS_REQUIRING_VALUE],
  );
};
