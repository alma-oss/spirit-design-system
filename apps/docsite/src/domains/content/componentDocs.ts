import fs from 'node:fs/promises';
import path from 'node:path';
import { isValidComponentSlug, slugToComponentName } from '../components/utils/componentSlug';
import { componentDocsDirectory, componentDocTabs, type ComponentDocTab } from '../routing/routes';
import { fileExists } from './contentRepository';
import { getRepoRoot } from './paths';
import { type PlaygroundConfig } from './ui/ComponentPlayground';

export interface ComponentTabAvailability {
  overview: boolean;
  design: boolean;
  accessibility: boolean;
  figma: boolean;
}

export type ComponentTab = ComponentDocTab;

const isComponentDocTab = (tab: string): tab is ComponentTab => (componentDocTabs as readonly string[]).includes(tab);

export const resolveComponentTabFile = (slug: string, tab: ComponentTab, repoRoot = getRepoRoot()): string | null => {
  if (!isValidComponentSlug(slug) || !isComponentDocTab(tab)) {
    return null;
  }

  return path.join(repoRoot, componentDocsDirectory, slugToComponentName(slug), 'docs', `${tab}.md`);
};

const componentDirectory = (slug: string, repoRoot: string) =>
  path.join(repoRoot, componentDocsDirectory, slugToComponentName(slug));

/**
 * Interactive playground definition (`docs/playground.json`), present only for components that have one.
 *
 * @param slug
 * @param repoRoot
 */
export interface ComponentPlaygroundFile extends PlaygroundConfig {
  /** Tab route segments (e.g. `web-preview`) that are not offered for this component. */
  hiddenTabs?: string[];
}

export const getComponentPlayground = async (
  slug: string,
  repoRoot = getRepoRoot(),
): Promise<ComponentPlaygroundFile | null> => {
  if (!isValidComponentSlug(slug)) {
    return null;
  }

  try {
    const raw = await fs.readFile(path.join(componentDirectory(slug, repoRoot), 'docs', 'playground.json'), 'utf8');

    return JSON.parse(raw) as ComponentPlaygroundFile;
  } catch {
    return null;
  }
};

export const getComponentTabAvailability = async (
  slug: string,
  repoRoot = getRepoRoot(),
): Promise<ComponentTabAvailability> => {
  const availability = await Promise.all(
    componentDocTabs.map(async (tab) => {
      const filePath = resolveComponentTabFile(slug, tab, repoRoot);

      return filePath ? fileExists(filePath) : false;
    }),
  );

  const [overview = false, design = false, accessibility = false, figmaFile = false] = availability;
  const playground = figmaFile ? await getComponentPlayground(slug, repoRoot) : null;

  // The Figma tab only embeds the Figma file; a component whose playground links to Figma does not need it.
  const figma = figmaFile && !playground?.figmaUrl;

  return { overview, design, accessibility, figma };
};

const stripMarkdown = (text: string) =>
  text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_]/g, '')
    .trim();

/**
 * One-sentence component description: the first sentence of the first paragraph below the README title.
 *
 * @param slug
 * @param repoRoot
 */
export const getComponentDescription = async (slug: string, repoRoot = getRepoRoot()): Promise<string> => {
  if (!isValidComponentSlug(slug)) {
    return '';
  }

  try {
    const readme = await fs.readFile(path.join(componentDirectory(slug, repoRoot), 'README.md'), 'utf8');
    const paragraph = readme
      .split(/\r?\n\s*\r?\n/)
      .map((block) => block.trim())
      .find((block) => block && !/^(#|```|[-*>|]|\d+\.)/.test(block));

    if (!paragraph) {
      return '';
    }

    const text = stripMarkdown(paragraph.replace(/\s*\r?\n\s*/g, ' '));

    return text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;
  } catch {
    return '';
  }
};

export const isComponentTabHidden = async (slug: string, segment: string, repoRoot = getRepoRoot()): Promise<boolean> =>
  Boolean((await getComponentPlayground(slug, repoRoot))?.hiddenTabs?.includes(segment));
