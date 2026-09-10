#!/usr/bin/env node
import { runSyncCli } from '../syncCli.js';

runSyncCli(process.argv.slice(2)).catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
