import { mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { ResolvedFigmaTokensConfig } from './config';
import { normalizeSnapshot } from './domain/normalize';
import { createPluginSnapshotExtractor } from './extractors/pluginSnapshot';
import type { OutputFile } from './generate/content';
import { generateOutputFiles, outputFileRelativePath } from './generate/files';
import { contentsMatchIgnoringProvenance } from './generate/parity';
import type { SnapshotV1 } from './snapshot/types';

export interface SyncChange {
  file: string;
  type: 'added' | 'updated' | 'deleted';
}

export interface SyncResult {
  brand: string;
  out: string;
  exported: number;
  warnings: string[];
  changes: SyncChange[];
}

export interface GenerateOptions {
  config: ResolvedFigmaTokensConfig;
  snapshot?: SnapshotV1;
  dryRun?: boolean;
  check?: boolean;
}

const GENERATED_ROOTS = new Set(['js', 'scss']);

const walkFiles = async (directory: string): Promise<string[]> => {
  const entries = await readdir(directory, { withFileTypes: true }).catch((error: NodeJS.ErrnoException) => {
    if (error.code === 'ENOENT') {
      return [];
    }

    throw error;
  });
  const files: string[] = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walkFiles(entryPath)));
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
};

const ensureTrailingNewline = (content: string): string => (content.endsWith('\n') ? content : `${content}\n`);

export const generateTokenFiles = async (
  config: ResolvedFigmaTokensConfig,
  snapshot?: SnapshotV1,
): Promise<{ files: OutputFile[]; warnings: string[] }> => {
  const extracted = snapshot ?? (await createPluginSnapshotExtractor(config.snapshot).extract());

  if (extracted.file.key && extracted.file.key !== config.fileKey) {
    throw new Error(`Snapshot file key ${extracted.file.key} does not match config fileKey ${config.fileKey}.`);
  }

  if (!extracted.file.key) {
    extracted.file.key = config.fileKey;
  }

  const document = normalizeSnapshot(extracted, config.fontStacks);

  return {
    files: generateOutputFiles(document),
    warnings: document.warnings,
  };
};

export const syncTokens = async ({ config, snapshot, dryRun = false, check = false }: GenerateOptions): Promise<SyncResult> => {
  const { files, warnings } = await generateTokenFiles(config, snapshot);
  const expected = new Map(files.map((file) => [outputFileRelativePath(file), ensureTrailingNewline(file.content)]));
  const changes: SyncChange[] = [];
  const existingFiles = (await walkFiles(config.out)).filter((filePath) => {
    const relative = path.relative(config.out, filePath).replace(/\\/g, '/');
    const root = relative.split('/')[0];

    return GENERATED_ROOTS.has(root);
  });

  for (const [relativePath, content] of expected) {
    const filePath = path.join(config.out, relativePath);
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

    if (!dryRun && !check) {
      await mkdir(path.dirname(filePath), { recursive: true });
      await writeFile(filePath, content);
    }

    changes.push({
      file: filePath,
      type: current === undefined ? 'added' : 'updated',
    });
  }

  for (const filePath of existingFiles) {
    const relative = path.relative(config.out, filePath).replace(/\\/g, '/');

    if (expected.has(relative)) {
      continue;
    }

    if (!dryRun && !check) {
      await unlink(filePath);
    }

    changes.push({
      file: filePath,
      type: 'deleted',
    });
  }

  changes.sort((first, second) => first.file.localeCompare(second.file));

  if (check && changes.length > 0) {
    throw new Error(
      `Generated tokens are out of date (${changes.length} file(s) differ). Run generate to update.\n${changes
        .map((change) => `${change.type} ${change.file}`)
        .join('\n')}`,
    );
  }

  return {
    brand: config.brand,
    out: config.out,
    exported: files.length,
    warnings,
    changes,
  };
};

export const compareGeneratedWithCommitted = async (
  config: ResolvedFigmaTokensConfig,
  snapshot?: SnapshotV1,
): Promise<string[]> => {
  const { files } = await generateTokenFiles(config, snapshot);
  const mismatches: string[] = [];

  for (const file of files) {
    const filePath = path.join(config.out, outputFileRelativePath(file));
    let committed: string;

    try {
      committed = await readFile(filePath, 'utf8');
    } catch {
      mismatches.push(`missing ${filePath}`);
      continue;
    }

    if (!contentsMatchIgnoringProvenance(ensureTrailingNewline(file.content), committed)) {
      mismatches.push(filePath);
    }
  }

  return mismatches;
};
