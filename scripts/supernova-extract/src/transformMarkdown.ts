import { rewriteAbsoluteSupernovaUrls, rewriteSupernovaLinks } from './rewriteLinks.js';

const leadingTabItem = /^[-*]\s+\[[^\]]+\]\([^)]+\)\s*$/u;
const iframePlaceholder = /Embedded content: \\?\[iframe\\?\]\(([^)]+)\)/gu;
const onThisPageBlock = /\n+On this page\n+(?:[-*]\s+\[[^\]]*\]\(#[^)]+\)\n?)+\s*$/u;
const emptyAnchorHeading = /^(#{1,6})\s*\[\]\([^)]+\)(?:\s+"[^"]*")?\s*$/gmu;

export function stripLeadingTabList(markdown: string): string {
  const lines = markdown.split('\n');
  let start = 0;

  while (start < lines.length && lines[start]?.trim() === '') {
    start += 1;
  }

  let end = start;

  while (end < lines.length && leadingTabItem.test(lines[end]?.trim() ?? '')) {
    end += 1;
  }

  if (end - start < 2) {
    return markdown;
  }

  while (end < lines.length && lines[end]?.trim() === '') {
    end += 1;
  }

  return [...lines.slice(0, start), ...lines.slice(end)].join('\n');
}

export function stripOnThisPage(markdown: string): string {
  return markdown.replace(onThisPageBlock, '\n').replace(/\n{3,}/gu, '\n\n').trimEnd();
}

export function stripEmptyAnchorHeadings(markdown: string): string {
  return markdown.replace(emptyAnchorHeading, '').replace(/\n{3,}/gu, '\n\n').trimEnd();
}

const unescapeMarkdownUrl = (src: string): string => src.replace(/\\_/gu, '_');

const HTML_ATTRIBUTE_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '"': '&quot;',
  '<': '&lt;',
  '>': '&gt;',
};

const escapeHtmlAttribute = (value: string): string =>
  value.replace(/[&"<>]/gu, (char) => HTML_ATTRIBUTE_ESCAPES[char] ?? char);

/**
 * Iframe sources come from third-party markdown. Keep only http(s) URLs and
 * escape them before they land in an HTML attribute.
 */
const iframeSrc = (src: string): string | null => {
  try {
    const url = new URL(unescapeMarkdownUrl(src.trim()));

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return null;
    }

    return escapeHtmlAttribute(url.href);
  } catch {
    return null;
  }
};

const CARD_LINK = /\[\n+([^\n[\]]+)\n+(?:([^\n[\]]+)\n+)?\]\(([^)\s]+)\)/gu;

/**
 * Collapse Supernova card links that Turndown emitted with blank lines inside
 * the label, which MDX will not parse as links.
 */
export function flattenMultilineMarkdownLinks(markdown: string): string {
  return markdown.replace(
    CARD_LINK,
    (_full, title: string, description: string | undefined, href: string) => {
      const label = title.trim();
      const desc = description?.trim();

      return desc ? `[${label}](${href}) — ${desc}\n\n` : `[${label}](${href})\n\n`;
    },
  );
}

export function restoreIframeEmbeds(markdown: string): string {
  return markdown.replace(iframePlaceholder, (_full, src: string) => {
    const safeSrc = iframeSrc(src);

    if (!safeSrc) {
      return '';
    }

    return `<iframe src="${safeSrc}" title="Embedded content" />`;
  });
}

const FENCE = /(```[\s\S]*?```)/u;
const IFRAME = /<iframe\b[^>]*\/>/gu;

/**
 * Canonical Pages compile as MDX (iframes). Escape leftover HTML/JSX so tags like
 * `<button>` and `{ cols: 2 }` stay prose instead of breaking the compiler.
 */
export function escapeMdxPunctuation(markdown: string): string {
  return markdown.split(FENCE).map((part) => {
    if (part.startsWith('```')) {
      return part;
    }

    const iframes: string[] = [];
    const withPlaceholders = part.replace(IFRAME, (tag) => {
      iframes.push(tag);

      return `\u0000IFRAME${String(iframes.length - 1)}\u0000`;
    });

    return withPlaceholders
      .replace(/</gu, '&lt;')
      .replace(/\{/gu, '\\{')
      .replace(/\}/gu, '\\}')
      .replace(/\u0000IFRAME(\d+)\u0000/gu, (_match, index: string) => iframes[Number(index)] ?? '');
  }).join('');
}

export function transformExtractedMarkdown(markdown: string): string {
  const withoutChrome = stripEmptyAnchorHeadings(stripOnThisPage(stripLeadingTabList(markdown)));
  const withCards = flattenMultilineMarkdownLinks(withoutChrome);
  const withEmbeds = restoreIframeEmbeds(withCards);
  const withLinks = rewriteAbsoluteSupernovaUrls(rewriteSupernovaLinks(withEmbeds));

  return escapeMdxPunctuation(withLinks).replace(/\n{3,}/gu, '\n\n').trimEnd();
}
