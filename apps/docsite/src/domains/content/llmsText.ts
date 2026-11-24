import { DOCUMENTATION_MENU } from './documentationMenu';
import { type DocumentedPage } from './documentedPages';

export const SITE_ORIGIN = 'https://spiritdesignsystem.com';

const SITE_TITLE = 'Spirit Design System';
const SITE_SUMMARY = 'Documentation for the Spirit Design System';

export const markdownPageUrl = (path: string): string => `${SITE_ORIGIN}${path}?format=md`;

const pagesInSection = (pages: DocumentedPage[], section: (typeof DOCUMENTATION_MENU)[number]['id']) =>
  pages.filter((page) => page.section === section);

const siteHeader = (): string[] => [`# ${SITE_TITLE}`, '', `> ${SITE_SUMMARY}`, ''];

/**
 * llms.txt index. Every link points at the public `?format=md` URL.
 *
 * @param pages Documented pages in menu order
 */
export const renderLlmsTxt = (pages: DocumentedPage[]): string => {
  const lines = siteHeader();

  DOCUMENTATION_MENU.forEach((section) => {
    const sectionPages = pagesInSection(pages, section.id);

    if (sectionPages.length === 0) {
      return;
    }

    lines.push(`## ${section.label}`, '');

    sectionPages.forEach((page) => {
      const description = page.description ? `: ${page.description}` : '';

      lines.push(`- [${page.title}](${markdownPageUrl(page.path)})${description}`);
    });

    lines.push('');
  });

  return `${lines.join('\n').trim()}\n`;
};

/**
 * llms-full.txt. Each indexed page is inlined after a heading and its absolute URL.
 * The body is the same markdown `?format=md` returns for that path.
 *
 * @param pages Documented pages in menu order, including bodies
 */
export const renderLlmsFull = (pages: DocumentedPage[]): string => {
  const lines = siteHeader();

  DOCUMENTATION_MENU.forEach((section) => {
    const sectionPages = pagesInSection(pages, section.id);

    if (sectionPages.length === 0) {
      return;
    }

    lines.push(`## ${section.label}`, '');

    sectionPages.forEach((page) => {
      lines.push(`### ${page.title}`, '', markdownPageUrl(page.path), '', page.body.trimEnd(), '');
    });
  });

  return `${lines.join('\n').trim()}\n`;
};
