import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const MAIN_SELECTORS = ['main.docs-content', 'main[role="main"]', 'main', '[role="main"]'];

function createTurndown(): TurndownService {
  const t = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    emDelimiter: '_',
  });

  t.use(gfm);

  return t;
}

function findMainContent(document: Document): HTMLElement | null {
  for (const sel of MAIN_SELECTORS) {
    const el = document.querySelector(sel);

    if (el) {
      return el as HTMLElement;
    }
  }

  return null;
}

/**
 * Supernova data tables put blocks (`<p>`, etc.) inside cells. Turndown turns
 * those into extra newlines and breaks GFM pipe-table output (one row per line).
 * Collapse each cell to a single line of plain text before Turndown runs.
 */
function normalizeTableCellsForTurndown(root: HTMLElement, document: Document): void {
  for (const table of root.querySelectorAll('table')) {
    for (const cell of table.querySelectorAll<HTMLElement>('th, td')) {
      const text = cell.textContent?.replace(/\s+/g, ' ').trim() ?? '';

      while (cell.firstChild) {
        cell.removeChild(cell.firstChild);
      }

      cell.appendChild(document.createTextNode(text));
    }
  }
}

export interface PageExtractResult {
  title: string;
  markdown: string;
}

/**
 * Returns page title and markdown body. Throws if main content is missing.
 */
export function extractMarkdownFromHtml(html: string, pageUrl: string): PageExtractResult {
  const dom = new JSDOM(html, { url: pageUrl });
  const { document } = dom.window;
  const main = findMainContent(document);

  if (!main) {
    throw new Error('No main content region found (expected main.docs-content or main)');
  }

  const titleEl = main.querySelector('h1.page-title') ?? main.querySelector('h1');
  const title = titleEl?.textContent?.replace(/\s+/g, ' ').trim() ?? 'Untitled';

  main.querySelector('h1.page-title')?.parentElement?.remove();
  main.querySelector('.container-title')?.remove();
  main.querySelector('.container-footer')?.remove();
  main.querySelectorAll('script, style, noscript').forEach((n) => n.remove());

  main.querySelectorAll('iframe').forEach((iframe) => {
    const src = iframe.getAttribute('src')?.trim();
    const placeholder = document.createElement('p');
    const linkText = src ? `Embedded content: [iframe](${src})` : 'Embedded iframe (no src).';

    placeholder.appendChild(document.createTextNode(linkText));
    iframe.replaceWith(placeholder);
  });

  const hiddenInputs = main.querySelectorAll('input[type="search"], input[aria-label]');

  hiddenInputs.forEach((n) => {
    if (n.tagName === 'INPUT') {
      n.remove();
    }
  });

  normalizeTableCellsForTurndown(main, document);

  const turndown = createTurndown();
  let markdown = turndown
    .turndown(main.innerHTML)
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  // Supernova in-doc anchor links (copy-link affordance) become `[]( #id "…")` noise in ATX headings.
  markdown = markdown.replace(
    /^(#{1,6}\s+.+?)\s*\[([^\]]*)\]\((?:#[^)]+)\)(?:\s+"[^"]*")?\s*$/gmu,
    '$1',
  );

  return { title, markdown };
}
