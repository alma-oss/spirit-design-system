/**
 * Normalizes URL by joining segments and removing duplicate slashes.
 * Always adds a trailing slash, which is appropriate for e2e test URLs pointing to directories.
 * Preserves protocol:// while removing other duplicate slashes.
 *
 * @param baseUrl - The base URL (e.g., 'http://localhost:3456' or 'https://example.com/')
 * @param segments - Path segments to join
 * @returns Normalized URL with single slashes and a trailing slash
 *
 * @example
 * normalizeUrl('http://localhost:3456', 'packages/web', 'src/components', 'Button')
 * // => 'http://localhost:3456/packages/web/src/components/Button/'
 *
 * normalizeUrl('http://localhost:3456/', '/packages/web/', '/src/components/', 'Modal')
 * // => 'http://localhost:3456/packages/web/src/components/Modal/'
 *
 * // Handles inconsistent slashes in input
 * normalizeUrl('https://example.com:3456/', 'packages/web-react', 'src/components')
 * // => 'https://example.com:3456/packages/web-react/src/components/'
 */
export const normalizeUrl = (baseUrl: string, ...segments: string[]): string => {
  const joined = [baseUrl, ...segments].join('/');
  // Replace multiple slashes with single slash, but preserve protocol://
  let normalized = joined.replace(/([^:]\/)\/+/g, '$1');

  // Ensure trailing slash
  if (!normalized.endsWith('/')) {
    normalized += '/';
  }

  return normalized;
};
