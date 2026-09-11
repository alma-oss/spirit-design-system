const FENCE = /(```[\s\S]*?```)/u;
const IFRAME = /<iframe\b[^>]*\/>/gu;
const IFRAME_PLACEHOLDER = /__SPIRIT_IFRAME_(\d+)__/gu;

/**
 * Repo-backed GitHub markdown is not MDX. Escape leftover HTML/JSX so tags like
 * `<details>` and `{ cols: 2 }` stay prose instead of breaking the compiler.
 *
 * @param markdown
 */
export const escapeMdxPunctuation = (markdown: string): string =>
  markdown
    .split(FENCE)
    .map((part) => {
      if (part.startsWith('```')) {
        return part;
      }

      const iframes: string[] = [];
      const withPlaceholders = part.replace(IFRAME, (tag) => {
        iframes.push(tag);

        return `__SPIRIT_IFRAME_${String(iframes.length - 1)}__`;
      });

      return withPlaceholders
        .replace(/</gu, '&lt;')
        .replace(/\{/gu, '\\{')
        .replace(/\}/gu, '\\}')
        .replace(IFRAME_PLACEHOLDER, (_match, index: string) => iframes[Number(index)] ?? '');
    })
    .join('');
