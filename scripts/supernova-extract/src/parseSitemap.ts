const LOC_RE = /<loc>([^<]+)<\/loc>/gi;

const SITEMAP_FETCH_TIMEOUT_MS = 90_000;

export async function fetchSitemapUrlList(sitemapUrl: string): Promise<string[]> {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), SITEMAP_FETCH_TIMEOUT_MS);

  let res: Response;

  try {
    res = await fetch(sitemapUrl, { signal: c.signal });
  } finally {
    clearTimeout(t);
  }

  if (!res.ok) {
    throw new Error(`Sitemap request failed: ${res.status} ${res.statusText}`);
  }

  const text = await res.text();
  const out: string[] = [];

  for (const m of text.matchAll(LOC_RE)) {
    if (m[1]) {
      out.push(m[1].trim());
    }
  }

  return Array.from(new Set(out));
}
