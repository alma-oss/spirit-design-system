import { parseCanonicalFrontmatter } from '../../parseFrontmatter';

const LIST_ITEM = /^([-*]|\d+\.)\s/;
const HEADING = /^#{1,6}\s+\S/;
const HORIZONTAL_RULE = /^(-{3,}|\*{3,}|_{3,})$/;
const LINK = /!\[[^\]]*\]\([^)]*\)|\[(?:[^\]]*)\](?:\([^)]*\)|\[[^\]]*\])|<https?:\/\/[^>\s]+>/g;
const H1 = /^#\s+\S/;

interface Fence {
  marker: string;
  length: number;
}

const openingFence = (line: string): Fence | null => {
  const match = line.match(/^\s*(`{3,}|~{3,})/);
  const run = match?.[1];

  if (!run) {
    return null;
  }

  return { marker: run[0] ?? '', length: run.length };
};

const closesFence = (line: string, fence: Fence): boolean => {
  const match = line.match(/^\s*(`{3,}|~{3,})\s*$/);
  const run = match?.[1];

  return Boolean(run && run[0] === fence.marker && run.length >= fence.length);
};

const stripMarkdown = (text: string) =>
  text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\[[^\]]*\]/g, '$1')
    .replace(/\[([^\]]*)\]/g, '$1')
    .replace(/(\*\*|__)(.+?)\1/g, '$2')
    .replace(/(^|\s)([*_])(\S(?:.*?\S)?)\2(?=\s|$)/g, '$1$3')
    .replace(/`([^`]+)`/g, '$1')
    .trim();

const isSkippedLine = (text: string) =>
  LIST_ITEM.test(text) ||
  text.startsWith('|') ||
  text.startsWith('>') ||
  text.startsWith('<') ||
  HEADING.test(text) ||
  HORIZONTAL_RULE.test(text);

const isLinkOnly = (paragraph: string) => paragraph.replace(LINK, '').trim() === '';

const firstSentence = (text: string): string => {
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const rest = text.slice(index + 1);
    const isBoundary = (char === '.' || char === '!' || char === '?') && (rest === '' || /^\s+[A-Z]/.test(rest));

    if (isBoundary) {
      return text.slice(0, index + 1);
    }
  }

  return text;
};

const proseParagraphs = (source: string): string[] => {
  const paragraphs: string[] = [];
  let fence: Fence | null = null;
  let current: string[] = [];

  const flush = () => {
    const text = current.join(' ').replace(/\s+/g, ' ').trim();

    current = [];

    if (text) {
      paragraphs.push(text);
    }
  };

  source.split(/\r?\n/).forEach((line) => {
    if (fence) {
      if (closesFence(line, fence)) {
        fence = null;
      }

      return;
    }

    const opened = openingFence(line);

    if (opened) {
      fence = opened;
      flush();

      return;
    }

    const trimmed = line.trim();

    if (trimmed === '' || isSkippedLine(trimmed)) {
      flush();

      return;
    }

    current.push(trimmed);
  });

  flush();

  return paragraphs;
};

const hasProseH1 = (body: string): boolean => {
  let fence: Fence | null = null;
  let found = false;

  body.split(/\r?\n/).forEach((line) => {
    if (fence) {
      if (closesFence(line, fence)) {
        fence = null;
      }

      return;
    }

    const opened = openingFence(line);

    if (opened) {
      fence = opened;

      return;
    }

    if (H1.test(line)) {
      found = true;
    }
  });

  return found;
};

/**
 * First prose sentence in a markdown file.
 * Link-only paragraphs, lists, tables, quotes, headings, raw HTML, and fenced examples are skipped.
 *
 * @param raw Markdown source, with or without front matter
 */
export const firstProseSentence = (raw: string): string => {
  let body = raw;

  try {
    body = parseCanonicalFrontmatter(raw).body;
  } catch {
    body = raw;
  }

  // The unstable warning is component status, not a description. The component
  // header already shows it, and getComponentDescription drops the same paragraphs.
  const sentence = proseParagraphs(body)
    .filter((paragraph) => !isLinkOnly(paragraph))
    .map(stripMarkdown)
    .find((text) => text && !text.startsWith('⚠️'));

  if (!sentence) {
    return '';
  }

  return firstSentence(sentence);
};

/**
 * Documentation markdown with front matter removed.
 * A missing H1 is filled from the front-matter title, then `fallbackTitle`.
 * An H1 inside a fence does not count. Fenced code is left unchanged.
 *
 * @param raw Markdown source
 * @param fallbackTitle Used when the file has no H1 and no front-matter title
 */
export const renderMarkdownDocument = (raw: string, fallbackTitle: string): string => {
  let data = { title: '' };
  let body = raw;

  try {
    ({ data, body } = parseCanonicalFrontmatter(raw));
  } catch {
    data = { title: '' };
    body = raw;
  }

  const trimmed = body.replace(/^\n+/, '').replace(/\s+$/, '');
  const title = data.title || fallbackTitle;
  let content = trimmed;

  if (!trimmed) {
    content = title ? `# ${title}` : '';
  } else if (!hasProseH1(trimmed) && title) {
    content = `# ${title}\n\n${trimmed}`;
  }

  return content ? `${content}\n` : '';
};
