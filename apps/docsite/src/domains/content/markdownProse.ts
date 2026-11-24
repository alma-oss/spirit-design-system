import { parseCanonicalFrontmatter } from './parseFrontmatter';

const FENCE = /^\s*(```|~~~)/;
const LIST_ITEM = /^([-*]|\d+\.)\s/;
const HEADING = /^#{1,6}\s+\S/;
const HORIZONTAL_RULE = /^(-{3,}|\*{3,}|_{3,})$/;
const LINK = /!\[[^\]]*\]\([^)]*\)|\[(?:[^\]]*)\](?:\([^)]*\)|\[[^\]]*\])|<https?:\/\/[^>\s]+>/g;
const H1 = /^#\s+\S/m;

const stripMarkdown = (text: string) =>
  text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\[[^\]]*\]/g, '$1')
    .replace(/\[([^\]]*)\]/g, '$1')
    .replace(/[`*_]/g, '')
    .trim();

const isSkippedLine = (text: string) =>
  LIST_ITEM.test(text) ||
  text.startsWith('|') ||
  text.startsWith('>') ||
  HEADING.test(text) ||
  HORIZONTAL_RULE.test(text);

const isLinkOnly = (paragraph: string) => paragraph.replace(LINK, '').trim() === '';

const proseParagraphs = (source: string): string[] => {
  const paragraphs: string[] = [];
  let fence: string | null = null;
  let current: string[] = [];

  const flush = () => {
    const text = current.join(' ').replace(/\s+/g, ' ').trim();

    current = [];

    if (text) {
      paragraphs.push(text);
    }
  };

  source.split(/\r?\n/).forEach((line) => {
    const fenceMatch = line.match(FENCE);

    if (fenceMatch) {
      const marker = fenceMatch[1] ?? '';

      fence = fence === marker ? null : (fence ?? marker);
      flush();

      return;
    }

    if (fence) {
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

/**
 * First prose sentence in a markdown file.
 * Link-only paragraphs, lists, tables, quotes, headings, and fenced examples are skipped.
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

  const sentence = proseParagraphs(body)
    .filter((paragraph) => !isLinkOnly(paragraph))
    .map(stripMarkdown)
    .find((text) => text && !text.startsWith('⚠️'));

  if (!sentence) {
    return '';
  }

  return sentence.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? sentence;
};

/**
 * Documentation markdown with front matter removed.
 * A missing H1 is filled from the front-matter title, then `fallbackTitle`.
 * Fenced code is left unchanged.
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
  } else if (!H1.test(trimmed) && title) {
    content = `# ${title}\n\n${trimmed}`;
  }

  return content ? `${content}\n` : '';
};
