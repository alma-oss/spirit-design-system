import { mkdir, readdir, readFile, rmdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { CHANGE_TYPES } from '../constants';
import { ConfigError } from '../errors';
import type { SyncChange } from '../types';

interface OutputEntry {
  kind: 'directory' | 'file';
  path: string;
}

const collectOutputEntries = async (directory: string): Promise<OutputEntry[]> => {
  const entries = await readdir(directory, { withFileTypes: true }).catch((error: NodeJS.ErrnoException) => {
    if (error.code === 'ENOENT') {
      return [];
    }

    throw error;
  });
  const collected: OutputEntry[] = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isSymbolicLink()) {
      throw new ConfigError(`Output directory contains a symlink: ${entryPath}`);
    }

    if (entry.isDirectory()) {
      collected.push({ kind: 'directory', path: entryPath }, ...(await collectOutputEntries(entryPath)));
      continue;
    }

    if (!entry.isFile()) {
      throw new ConfigError(`Output directory contains an unsupported entry: ${entryPath}`);
    }

    collected.push({ kind: 'file', path: entryPath });
  }

  return collected;
};

const relativePath = (out: string, filePath: string): string => path.relative(out, filePath).split(path.sep).join('/');

const directoryDepth = (directoryPath: string): number => directoryPath.split(path.sep).length;

export interface MirrorFile {
  content: string;
  relativePath: string;
}

export const mirrorFiles = async (out: string, files: MirrorFile[], dryRun: boolean): Promise<SyncChange[]> => {
  const expected = new Map(
    files.map((file) => [file.relativePath, file.content.endsWith('\n') ? file.content : `${file.content}\n`]),
  );
  const existingEntries = await collectOutputEntries(out);
  const changes: SyncChange[] = [];

  if (!dryRun) {
    await mkdir(out, { recursive: true });
  }

  for (const [relative, content] of expected) {
    const filePath = path.join(out, relative);
    let current: string | undefined;

    try {
      current = await readFile(filePath, 'utf8');
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error;
      }
    }

    if (current === content) {
      continue;
    }

    if (!dryRun) {
      await mkdir(path.dirname(filePath), { recursive: true });
      await writeFile(filePath, content);
    }

    changes.push({
      file: filePath,
      type: current === undefined ? CHANGE_TYPES.ADDED : CHANGE_TYPES.UPDATED,
    });
  }

  const expectedDirectories = new Set(
    [...expected.keys()].flatMap((file) => {
      const parts = file.split('/');

      return parts.slice(0, -1).map((_, index) => parts.slice(0, index + 1).join('/'));
    }),
  );
  const filesToDelete = existingEntries.filter(
    (entry) => entry.kind === 'file' && !expected.has(relativePath(out, entry.path)),
  );
  const directoriesToDelete = existingEntries
    .filter((entry) => entry.kind === 'directory' && !expectedDirectories.has(relativePath(out, entry.path)))
    .sort(
      (first, second) =>
        directoryDepth(second.path) - directoryDepth(first.path) || second.path.localeCompare(first.path),
    );

  for (const file of filesToDelete) {
    if (!dryRun) {
      await unlink(file.path);
    }

    changes.push({ file: file.path, type: CHANGE_TYPES.DELETED });
  }

  for (const directory of directoriesToDelete) {
    if (!dryRun) {
      await rmdir(directory.path);
    }

    changes.push({ file: directory.path, type: CHANGE_TYPES.DELETED });
  }

  return changes.sort((first, second) => first.file.localeCompare(second.file));
};
