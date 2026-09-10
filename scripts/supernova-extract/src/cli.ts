import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sade from 'sade';
import { stringify as stringifyYaml } from 'yaml';

import { urlToRelativeMarkdownPath } from './buildOutputPath.js';
import { titleForCanonicalPage } from './pageTitle.js';
import { isExcludedCatalogPage, isExcludedComponentSubpage, isExcludedRepoBackedPage } from './filterUrls.js';
import { extractMarkdownFromHtml } from './htmlToMarkdown.js';
import {
  deleteStaleOwnedPaths,
  readOwnedPaths,
  removeStagingDump,
  resolveOwnedPath,
  writeOwnedPaths,
} from './ownedPaths.js';
import { fetchSitemapUrlList } from './parseSitemap.js';
import { transformExtractedMarkdown } from './transformMarkdown.js';
import type { ExtractManifest, ManifestPageEntry, PageStatus } from './types.js';

const { dirname } = path;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '../../..');
const SCRIPT_DIR = path.resolve(__dirname, '..');

const DEFAULT_SITEMAP = 'https://spirit.supernova-docs.io/latest/sitemap.xml';
const DEFAULT_OWNED_PATHS = path.join(SCRIPT_DIR, 'owned-paths.json');
const DEFAULT_REPORT = path.join(SCRIPT_DIR, 'REPORT.md');

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchText(url: string, timeoutMs = 60000): Promise<string> {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      signal: c.signal,
      headers: {
        'User-Agent': 'spirit-supernova-extract/1.0 (+https://github.com/alma-oss/spirit-design-system)',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9',
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

function buildMarkdownFile(data: Record<string, string | undefined>, body: string): string {
  const yaml = stringifyYaml(data, { lineWidth: 0 }).trim();

  return `---\n${yaml}\n---\n\n${body}\n`;
}

type WorkItem = {
  sourceUrl: string;
  outFile: string;
  sourcePath: string;
  sourceSection: string;
  /** Index into `pages` for this URL. */
  pageIndex: number;
};

function renderReport(m: ExtractManifest): string {
  const { stats, pages, generatedAt, sitemapUrl } = m;
  const lines = [
    '# Supernova Extract Report',
    '',
    `- **Generated at:** ${generatedAt}`,
    `- **Sitemap:** <${sitemapUrl}>`,
    '',
    '## Summary',
    '',
    `| Total in sitemap | To extract (after filter) | Extracted (ok) | Failed | Skipped (filter) |`,
    `| --- | ---: | ---: | ---: | ---: |`,
    `| ${stats.totalInSitemap} | ${stats.toExtract} | ${stats.extracted} | ${stats.failed} | ${stats.skipped} |`,
    '',
    '## Skipped Pages',
    '',
    'Excluded component web / html / react tabs, the all-components catalog, and repo-backed migrations / releases.',
    '',
  ];

  const sk = pages.filter((x) => x.status === 'skipped' && x.message?.includes('Excluded:'));

  if (sk.length === 0) {
    lines.push('_None._', '');
  } else {
    for (const p of sk) {
      lines.push(`- <${p.sourceUrl}>`);
    }

    lines.push('');
  }

  lines.push('## Failures', '');

  const failed = pages.filter((x) => x.status === 'error');

  if (failed.length === 0) {
    lines.push('_None._', '');
  } else {
    for (const p of failed) {
      lines.push(`- <${p.sourceUrl}> — ${p.message ?? 'Error'}`);
    }

    lines.push('');
  }

  lines.push('---', '', 'Owned paths: [owned-paths.json](./owned-paths.json).', '');

  return lines.join('\n');
}

async function runFromOptions(opts: {
  sitemap?: string;
  out?: string;
  concurrency?: string;
  delay?: string;
  'dry-run'?: boolean;
}): Promise<ExtractManifest> {
  const sitemapUrl = opts.sitemap ?? DEFAULT_SITEMAP;
  const repoRoot = path.resolve(process.cwd(), opts.out ?? REPO_ROOT);
  const concurrency = Math.max(1, Math.min(10, parseInt(String(opts.concurrency ?? '2'), 10) || 2));
  const delay = Math.max(0, parseInt(String(opts.delay ?? '200'), 10) || 0);
  const dryRun = Boolean(opts['dry-run']);
  // eslint-disable-next-line no-console -- progress
  const log = console.log;
  // eslint-disable-next-line no-console -- error surface
  const err = console.error;

  log(`Sitemap: ${sitemapUrl}`);
  log(`Repository root: ${repoRoot}`);

  const allUrls = await fetchSitemapUrlList(sitemapUrl);
  const takenPaths = new Set<string>();
  const pages: ManifestPageEntry[] = [];
  const work: WorkItem[] = [];

  for (const u of allUrls) {
    let pageUrl: URL;

    try {
      pageUrl = new URL(u);
    } catch {
      pages.push({
        sourceUrl: u,
        sourcePath: u,
        outFile: '',
        status: 'error' as PageStatus,
        message: 'Invalid URL in sitemap',
      });
      // eslint-disable-next-line no-continue
      continue;
    }

    if (isExcludedComponentSubpage(pageUrl) || isExcludedCatalogPage(pageUrl) || isExcludedRepoBackedPage(pageUrl)) {
      const message = isExcludedRepoBackedPage(pageUrl)
        ? 'Excluded: already in the repository (docs/migrations, CHANGELOGs, release schedule)'
        : isExcludedCatalogPage(pageUrl)
          ? 'Excluded: all-components catalog (docsite /components is generated from packages)'
          : 'Excluded: component web, html, or react subpage (sourced from package READMEs)';

      pages.push({
        sourceUrl: u,
        sourcePath: pageUrl.pathname,
        outFile: '',
        status: 'skipped' as PageStatus,
        message,
      });
      // eslint-disable-next-line no-continue
      continue;
    }

    let relativePath: string;
    let sourceSection: string;

    try {
      ({ relativePath, sourceSection } = urlToRelativeMarkdownPath(pageUrl));
      resolveOwnedPath(repoRoot, relativePath);
    } catch (e) {
      pages.push({
        sourceUrl: u,
        sourcePath: pageUrl.pathname,
        outFile: '',
        status: 'skipped' as PageStatus,
        message: e instanceof Error ? `Excluded: ${e.message}` : `Excluded: ${String(e)}`,
      });
      // eslint-disable-next-line no-continue
      continue;
    }

    if (relativePath.startsWith('packages/web-react/src/components/')) {
      const componentDir = path.dirname(path.dirname(resolveOwnedPath(repoRoot, relativePath)));

      try {
        const stat = await fs.stat(componentDir);

        if (!stat.isDirectory()) {
          throw new Error('not a directory');
        }
      } catch {
        pages.push({
          sourceUrl: u,
          sourcePath: pageUrl.pathname,
          outFile: '',
          status: 'skipped' as PageStatus,
          message: `Excluded: no matching web-react component directory for ${relativePath}`,
        });
        // eslint-disable-next-line no-continue
        continue;
      }
    }

    if (takenPaths.has(relativePath)) {
      pages.push({
        sourceUrl: u,
        sourcePath: pageUrl.pathname,
        outFile: '',
        status: 'skipped' as PageStatus,
        message: `Excluded: destination already claimed (${relativePath})`,
      });
      // eslint-disable-next-line no-continue
      continue;
    }

    takenPaths.add(relativePath);

    const pageIndex = pages.length;

    work.push({ sourceUrl: u, outFile: relativePath, sourcePath: pageUrl.pathname, sourceSection, pageIndex });
    pages.push({
      sourceUrl: u,
      sourcePath: pageUrl.pathname,
      outFile: relativePath,
      status: 'pending' as PageStatus,
    });
  }

  async function processItem(w: WorkItem): Promise<void> {
    // eslint-disable-next-line security/detect-object-injection
    const rec = pages[w.pageIndex] as ManifestPageEntry;

    if (dryRun) {
      rec.status = 'ok' as PageStatus;
      rec.message = `dry-run — would write ${w.outFile}`;

      return;
    }

    if (delay > 0) {
      await sleep(delay);
    }

    let html: string;

    try {
      html = await fetchText(w.sourceUrl);
    } catch (e) {
      rec.status = 'error' as PageStatus;
      rec.message = e instanceof Error ? e.message : String(e);
      err(`[fetch] ${w.sourceUrl}:`, rec.message);

      return;
    }

    let extractedTitle: string;
    let markdown: string;

    try {
      ({ title: extractedTitle, markdown } = extractMarkdownFromHtml(html, w.sourceUrl));
    } catch (e) {
      rec.status = 'error' as PageStatus;
      rec.message = e instanceof Error ? e.message : String(e);
      err(`[parse] ${w.sourceUrl}:`, rec.message);

      return;
    }

    const title = titleForCanonicalPage(w.outFile, extractedTitle);
    rec.title = title;

    const outAbs = resolveOwnedPath(repoRoot, w.outFile);
    const fileBody = buildMarkdownFile({ title }, transformExtractedMarkdown(markdown));

    await fs.mkdir(path.dirname(outAbs), { recursive: true });
    await fs.writeFile(outAbs, fileBody, 'utf8');
    rec.status = 'ok' as PageStatus;
  }

  // Parallel pool with atomic index
  let cursor = 0;

  async function worker() {
    for (;;) {
      const i = cursor;
      cursor += 1;
      if (i >= work.length) {
        return;
      }

      // eslint-disable-next-line security/detect-object-injection
      await processItem(work[i] as WorkItem);
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);

  for (const p of pages) {
    if (p.status === ('pending' as PageStatus)) {
      p.status = 'error' as PageStatus;
      p.message = p.message ?? 'Left pending (bug)';
    }
  }

  const skipped = pages.filter((p) => p.status === 'skipped').length;
  const failed = pages.filter((p) => p.status === 'error').length;
  const ok = pages.filter((p) => p.status === 'ok' && !dryRun).length;
  const okDry = pages.filter((p) => p.status === 'ok' && dryRun).length;

  const manifest: ExtractManifest = {
    generatedAt: new Date().toISOString(),
    sitemapUrl,
    pages,
    stats: {
      totalInSitemap: allUrls.length,
      toExtract: work.length,
      extracted: dryRun ? 0 : ok,
      failed: dryRun ? 0 : failed,
      skipped,
      ...(dryRun ? { dryRunPlanned: okDry } : {}),
    },
  };

  if (!dryRun) {
    const nextOwned = pages.filter((p) => p.status === 'ok' && p.outFile).map((p) => p.outFile);
    const previousOwned = await readOwnedPaths(DEFAULT_OWNED_PATHS);

    await deleteStaleOwnedPaths(repoRoot, previousOwned, new Set(nextOwned));
    await removeStagingDump(repoRoot);
    await writeOwnedPaths(DEFAULT_OWNED_PATHS, nextOwned);
    await fs.writeFile(DEFAULT_REPORT, renderReport(manifest), 'utf8');
    log(`Wrote ${DEFAULT_OWNED_PATHS}`);
    log(`Wrote ${DEFAULT_REPORT}`);
  } else {
    log(`Dry run — ${okDry} pages would be written (no files created)`);
  }

  return manifest;
}

sade('supernova-extract', true)
  .version('1.0.0')
  .option('-s, --sitemap', 'Sitemap URL', DEFAULT_SITEMAP)
  .option(
    '-o, --out',
    'Repository root for Canonical Page destinations (default: repository root)',
  )
  .option('-c, --concurrency', 'Parallel fetches (default: 2)')
  .option('-d, --delay', 'Delay in ms before each page fetch in a worker (default: 200)', '200')
  .option('--dry-run', 'Fetch sitemap only; no page fetches or files — resolve target paths')
  .action(
    async (opts: { sitemap?: string; out?: string; concurrency?: string; delay?: string; 'dry-run'?: boolean }) => {
      const manifest = await runFromOptions(opts);
      // eslint-disable-next-line no-console -- result
      console.log(
        `Done. toExtract=${String(manifest.stats.toExtract)} extracted=${String(
          manifest.stats.extracted,
        )} failed=${String(manifest.stats.failed)} skippedFilter=${String(manifest.stats.skipped)}`,
      );
    },
  )
  .parse(process.argv);
