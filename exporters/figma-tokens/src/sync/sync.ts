import { FigmaApiError } from '../errors';
import type { ResolvedTokensConfig, SourceSyncResult, SyncResult } from '../types';
import { exportTokens } from './adapters/figma';
import { generateOutputFiles, outputFileRelativePath } from '../generate/files';
import { mirrorFiles } from './mirror';

export interface SyncOptions {
  config: ResolvedTokensConfig;
  dryRun?: boolean;
  fetch?: typeof fetch;
  token?: string;
}

export const syncTokens = async ({
  config,
  dryRun = false,
  fetch: fetchImplementation = fetch,
  token,
}: SyncOptions): Promise<SyncResult> => {
  if (!token) {
    throw new FigmaApiError('FIGMA_ACCESS_TOKEN is required.');
  }

  const sources: SourceSyncResult[] = [];

  for (const source of config.sources) {
    const document = await exportTokens(source.fileKey, source.fontStacks, token, fetchImplementation);
    const files = generateOutputFiles(document);
    const changes = await mirrorFiles(
      source.out,
      files.map((file) => ({ relativePath: outputFileRelativePath(file), content: file.content })),
      dryRun,
    );

    sources.push({
      brand: source.brand,
      changes,
      exported: files.length,
      out: source.out,
      warnings: document.warnings,
    });
  }

  return { sources };
};
