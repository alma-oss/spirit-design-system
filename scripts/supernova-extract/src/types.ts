export type PageStatus = 'ok' | 'error' | 'skipped' | 'pending';

export interface ManifestPageEntry {
  sourceUrl: string;
  sourcePath: string;
  outFile: string;
  status: PageStatus;
  message?: string;
  title?: string;
}

export interface ExtractManifest {
  generatedAt: string;
  sitemapUrl: string;
  stats: {
    totalInSitemap: number;
    /** Count of pages that would be extracted (after filter). */
    toExtract: number;
    /** Files written (ok) — 0 in dry run. */
    extracted: number;
    failed: number;
    /** Filter: component web / html / react implementation tabs. */
    skipped: number;
    /** Dry run only: pages that would be written. */
    dryRunPlanned?: number;
  };
  pages: ManifestPageEntry[];
}
