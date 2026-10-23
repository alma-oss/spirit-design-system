import { FIGMA_URL, GITHUB_URL, REPOSITORY_URL, STORYBOOK_URL } from '@local/config/externalLinks';
import { isValidComponentSlug, slugToComponentName } from '@local/domains/components/utils/componentSlug';
import { componentDocsDirectory } from '@local/domains/routing/routes';

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
    return GITHUB_URL;
  }

  return `${REPOSITORY_URL}/tree/main/${componentDocsDirectory}/${slugToComponentName(slug)}`;
};

export const getComponentPageLinks = (slug: string, source?: ComponentPageLinkSource | null): PageLink[] => [
  { label: 'Open in Storybook', href: source?.storybookUrl || STORYBOOK_URL },
  { label: 'Open on GitHub', href: componentGithubUrl(slug) },
  { label: 'Open in Figma', href: source?.figmaUrl || FIGMA_URL },
];

export const listingPageLinks: PageLink[] = [
  { label: 'Open in Storybook', href: STORYBOOK_URL },
  { label: 'Open on GitHub', href: GITHUB_URL },
  { label: 'Open in Figma', href: FIGMA_URL },
];
