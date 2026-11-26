import { getContentRoot, getRepoRoot } from '@local/config/paths';
import { type DocumentedPageSection } from '../../../../routing/documentationMenu';
import { firstProseSentence, renderMarkdownDocument } from '../markdownProse';

export type { DocumentedPageSection };

export interface DocumentedPageOptions {
  contentRoot?: string;
  repoRoot?: string;
}

export interface DocumentedPage {
  path: string;
  title: string;
  section: DocumentedPageSection;
  description: string;
  body: string;
}

export interface Roots {
  contentRoot: string;
  repoRoot: string;
}

export const resolveRoots = (options?: DocumentedPageOptions): Roots => ({
  contentRoot: options?.contentRoot ?? getContentRoot(),
  repoRoot: options?.repoRoot ?? getRepoRoot(),
});

export const pagePath = (slug: string[]): string => `/${slug.join('/')}`;

export const bulletList = (items: string[]): string => (items.length > 0 ? `${items.join('\n')}\n` : '');

export const pageFromSource = (
  pathName: string,
  section: DocumentedPageSection,
  title: string,
  raw: string,
  fallbackDescription: string,
  documentTitle = title,
): DocumentedPage => ({
  path: pathName,
  title,
  section,
  description: firstProseSentence(raw) || fallbackDescription || title,
  body: renderMarkdownDocument(raw, documentTitle),
});
