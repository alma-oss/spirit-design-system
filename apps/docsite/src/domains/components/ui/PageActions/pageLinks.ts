import { isValidComponentSlug, slugToComponentName } from '@local/domains/components/utils/componentSlug';
import { componentDocsDirectory } from '@local/domains/routing/routes';

export const DOCSITE_STORYBOOK_URL = 'https://spirit-design-system-storybook.netlify.app/';
export const DOCSITE_GITHUB_URL = 'https://github.com/alma-oss/spirit-design-system/';
export const DOCSITE_FIGMA_URL = 'https://www.figma.com/design/w9Ca4hvkuYLshsrHu1bYwT/Spirit-UI-KIT';

const REPOSITORY_URL = 'https://github.com/alma-oss/spirit-design-system';

export interface PageLink {
  label: string;
  href: string;
}

export interface ComponentPageLinkSource {
  storybookUrl?: string;
  figmaUrl?: string;
}

export const componentGithubUrl = (slug: string): string => {
  if (!isValidComponentSlug(slug)) {
    return DOCSITE_GITHUB_URL;
  }

  return `${REPOSITORY_URL}/tree/main/${componentDocsDirectory}/${slugToComponentName(slug)}`;
};

export const getComponentPageLinks = (slug: string, source?: ComponentPageLinkSource | null): PageLink[] => [
  { label: 'Open in Storybook', href: source?.storybookUrl || DOCSITE_STORYBOOK_URL },
  { label: 'Open on GitHub', href: componentGithubUrl(slug) },
  { label: 'Open in Figma', href: source?.figmaUrl || DOCSITE_FIGMA_URL },
];

export const listingPageLinks: PageLink[] = [
  { label: 'Open in Storybook', href: DOCSITE_STORYBOOK_URL },
  { label: 'Open on GitHub', href: DOCSITE_GITHUB_URL },
  { label: 'Open in Figma', href: DOCSITE_FIGMA_URL },
];
