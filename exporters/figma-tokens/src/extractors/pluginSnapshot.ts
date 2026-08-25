import { readFile } from 'node:fs/promises';
import type { SnapshotV1 } from '../snapshot/types';
import { validateSnapshot } from '../snapshot/validate';
import type { SnapshotExtractor } from './types';

export const createPluginSnapshotExtractor = (snapshotPath: string): SnapshotExtractor => ({
  extract: async () => {
    let parsed: unknown;

    try {
      parsed = JSON.parse(await readFile(snapshotPath, 'utf8'));
    } catch (error) {
      throw new Error(`Unable to read Figma token snapshot at ${snapshotPath}: ${String(error)}`, { cause: error });
    }

    return validateSnapshot(parsed);
  },
});

export const extractPluginSnapshot = (value: unknown): SnapshotV1 => validateSnapshot(value);
