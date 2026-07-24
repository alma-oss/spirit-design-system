import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sade from 'sade';
import { stringify as stringifyYaml } from 'yaml';

import { urlToRelativeMarkdownPath } from './buildOutputPath.js';
import { isExcludedComponentSubpage } from './filterUrls.js';
import { extractMarkdownFromHtml } from './htmlToMarkdown.js';
import { fetchSitemapUrlList } from './parseSitemap.js';
import type { ExtractManifest, ManifestPageEntry, PageStatus } from './types.js';

const { dirname } = path;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '../../..');

const DEFAULT_SITEMAP = 'https://spirit.supernova-docs.io/latest/sitemap.xml';
const DEFAULT_OUT = path.join(REPO_ROOT, 'apps/docsite/content/supernova');

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

function resolveCollision(relPath: string, taken: Set<string>, originalUrl: string): string {
  if (!taken.has(relPath)) {
    taken.add(relPath);

    return relPath;
  }

  const ext = path.extname(relPath);
  const file = path.basename(relPath, ext);
  const directory = path.dirname(relPath);
  const hash = Buffer.from(originalUrl).toString('base64url').slice(0, 10);
  const withHash = path.join(directory, `${file}__${hash}${ext}`);

  if (!taken.has(withHash)) {
    taken.add(withHash);

    return withHash;
  }

  let n = 2;
  let candidate: string;

  do {
    candidate = path.join(directory, `${file}-${n}${ext}`);
    n += 1;
  } while (taken.has(candidate));

  taken.add(candidate);

  return candidate;
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
    '## Skipped (filter: component web / html / react)',
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

  lines.push('---', '', 'Full data: [manifest.json](./manifest.json).', '');

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
  const outDir = path.resolve(process.cwd(), opts.out ?? DEFAULT_OUT);
  const concurrency = Math.max(1, Math.min(10, parseInt(String(opts.concurrency ?? '2'), 10) || 2));
  const delay = Math.max(0, parseInt(String(opts.delay ?? '200'), 10) || 0);
  const dryRun = Boolean(opts['dry-run']);
  // eslint-disable-next-line no-console -- progress
  const log = console.log;
  // eslint-disable-next-line no-console -- error surface
  const err = console.error;

  log(`Sitemap: ${sitemapUrl}`);
  log(`Output: ${outDir}`);

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

    if (isExcludedComponentSubpage(pageUrl)) {
      pages.push({
        sourceUrl: u,
        sourcePath: pageUrl.pathname,
        outFile: '',
        status: 'skipped' as PageStatus,
        message: 'Excluded: component web, html, or react subpage (sourced from package READMEs)',
      });
      // eslint-disable-next-line no-continue
      continue;
    }

    const { relativePath, sourceSection } = urlToRelativeMarkdownPath(pageUrl);
    const outFile = resolveCollision(relativePath, takenPaths, u);
    const pageIndex = pages.length;

    work.push({ sourceUrl: u, outFile, sourcePath: pageUrl.pathname, sourceSection, pageIndex });
    pages.push({
      sourceUrl: u,
      sourcePath: pageUrl.pathname,
      outFile: outFile,
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

    let title: string;
    let markdown: string;

    try {
      ({ title, markdown } = extractMarkdownFromHtml(html, w.sourceUrl));
      rec.title = title;
    } catch (e) {
      rec.status = 'error' as PageStatus;
      rec.message = e instanceof Error ? e.message : String(e);
      err(`[parse] ${w.sourceUrl}:`, rec.message);

      return;
    }

    const outAbs = path.join(outDir, w.outFile);
    const generatedAt = new Date().toISOString();
    const fileBody = buildMarkdownFile(
      {
        title,
        sourceUrl: w.sourceUrl,
        sourcePath: w.sourcePath,
        sourceSection: w.sourceSection,
        lastExtractedAt: generatedAt,
      },
      markdown,
    );

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
    await fs.mkdir(outDir, { recursive: true });
    const mPath = path.join(outDir, 'manifest.json');

    await fs.writeFile(mPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
    const rPath = path.join(outDir, 'REPORT.md');

    await fs.writeFile(rPath, renderReport(manifest), 'utf8');
    log(`Wrote ${mPath}`);
    log(`Wrote ${rPath}`);
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
    'Output directory (markdown + manifest; default: apps/docsite/content/supernova from repo root)',
  )
  .option('-c, --concurrency', 'Parallel fetches (default: 2)')
  .option('-d, --delay', 'Delay in ms before each page fetch in a worker (default: 200)', '200')
  .option('--dry-run', 'No network; no files — only resolve URLs and target paths')
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
