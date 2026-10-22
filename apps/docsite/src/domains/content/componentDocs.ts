import fs from 'node:fs/promises';
import path from 'node:path';
import {
  parsePlaygroundFile,
  type PlaygroundFile,
} from '../components/features/component-detail/ui/ComponentPlayground/playgroundConfig';
import { isValidComponentSlug, slugToComponentName } from '../components/utils/componentSlug';
import { componentDocsDirectory, componentDocTabs, type ComponentDocTab } from '../routing/routes';
import { fileExists } from './contentRepository';
import { getRepoRoot } from './paths';

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
 * An unknown component or a control that does not match the schema is treated as no playground.
 *
 * @param slug
 * @param repoRoot
 */
export const getComponentPlayground = async (
  slug: string,
  repoRoot = getRepoRoot(),
): Promise<PlaygroundFile | null> => {
  if (!isValidComponentSlug(slug)) {
    return null;
  }

  try {
    const raw = await fs.readFile(path.join(componentDirectory(slug, repoRoot), 'docs', 'playground.json'), 'utf8');

    return parsePlaygroundFile(JSON.parse(raw));
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

// Opens or closes a fenced example. The same marker (` ``` ` or `~~~`) closes the fence it opened.
const FENCE = /^\s*(```|~~~)/;

// A bullet (`- item`, `* item`) or a numbered item. The space keeps `---` and `**bold**` out.
const LIST_ITEM = /^([-*]|\d+\.)\s/;

// `##` or deeper. This is where the intro ends.
const SECTION_HEADING = /^#{2,}\s+\S/;

// The single README title. Prose is collected only after it.
const TITLE_HEADING = /^#\s+\S/;

const stripMarkdown = (text: string) =>
  text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\[[^\]]*\]/g, '$1')
    .replace(/\[([^\]]+)\]/g, '$1')
    .replace(/[`*_]/g, '')
    .trim();

// A list item, a table row (`|`), or a blockquote (`>`). None of these is a description.
const isSkippedIntroLine = (text: string) => LIST_ITEM.test(text) || text.startsWith('|') || text.startsWith('>');

/**
 * Paragraphs between the README title and the first section heading.
 * Lines inside a fence are ignored, so a blank line in an example cannot split it into a paragraph.
 * A paragraph that starts with the unstable warning is dropped; the header already shows that state.
 * A README that opens with a section returns no paragraphs.
 *
 * @param source README contents
 * @returns {string[]} Intro paragraphs with whitespace collapsed, still containing Markdown links
 */
const introParagraphs = (source: string): string[] => {
  const paragraphs: string[] = [];
  let fence: string | null = null;
  let inIntro = false;
  let current: string[] = [];

  const flush = () => {
    const text = current.join(' ').replace(/\s+/g, ' ').trim();

    current = [];

    if (text && !text.startsWith('⚠️')) {
      paragraphs.push(text);
    }
  };

  source.split(/\r?\n/).some((line) => {
    const fenceMatch = line.match(FENCE);

    if (fenceMatch) {
      const marker = fenceMatch[1] ?? '';

      fence = fence === marker ? null : (fence ?? marker);

      return false;
    }

    if (fence) {
      return false;
    }

    if (SECTION_HEADING.test(line)) {
      flush();

      return true;
    }

    if (TITLE_HEADING.test(line)) {
      inIntro = true;

      return false;
    }

    if (!inIntro) {
      return false;
    }

    const trimmed = line.trim();

    if (trimmed === '' || isSkippedIntroLine(trimmed)) {
      flush();

      return false;
    }

    current.push(trimmed);

    return false;
  });

  flush();

  return paragraphs;
};

/**
 * One-sentence component description from the first paragraph between the README title and the first section.
 * A README that opens with a section has no description.
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
    const paragraph = introParagraphs(readme).find((text) => stripMarkdown(text));

    if (!paragraph) {
      return '';
    }

    const text = stripMarkdown(paragraph);

    return text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;
  } catch {
    return '';
  }
};

export const isComponentTabHidden = async (slug: string, segment: string, repoRoot = getRepoRoot()): Promise<boolean> =>
  Boolean((await getComponentPlayground(slug, repoRoot))?.hiddenTabs?.includes(segment));
