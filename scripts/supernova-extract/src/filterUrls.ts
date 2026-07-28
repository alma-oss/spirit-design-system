/**
 * Skip component implementation subpages that are sourced from the repo in apps/docsite:
 * - `web-*` and `html-*` (Spirit Web / HTML tab — package README + previews)
 * - `react-*` (Spirit Web React — package README)
 */
export function isExcludedComponentSubpage(url: URL): boolean {
  const { pathname } = url;

  return /\/components\/[^/]+\/(web|react|html)-/u.test(pathname);
}
