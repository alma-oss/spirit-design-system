const FENCE = /^\s*(```|~~~)/;
const HEADING = /^(#{1,6})\s+(.*?)\s*#*\s*$/;
const THEMATIC_BREAK = /^\s*([-*_])(\s*\1){2,}\s*$/;
const BOLD_ONLY = /^\*\*(.+)\*\*$/;
const BLOCK_TITLE_LEVEL = 2;

interface Line {
  text: string;
  /** Heading level (1-6), 0 for anything else. Frontmatter and fenced code are never headings. */
  level: number;
  isBreak: boolean;
  isFrontmatter: boolean;
}

const classifyLines = (source: string): Line[] => {
  const rawLines = source.split(/\r?\n/);
  let index = 0;
  const lines: Line[] = [];

  if (rawLines[0]?.trim() === '---') {
    const end = rawLines.findIndex((line, lineIndex) => lineIndex > 0 && line.trim() === '---');

    if (end > 0) {
      rawLines.slice(0, end + 1).forEach((text) => lines.push({ text, level: 0, isBreak: false, isFrontmatter: true }));
      index = end + 1;
    }
  }

  let fence: string | null = null;

  rawLines.slice(index).forEach((text, offset) => {
    const fenceMatch = text.match(FENCE);

    if (fenceMatch) {
      fence = fence === fenceMatch[1] ? null : (fence ?? fenceMatch[1] ?? null);
    }

    const previous = rawLines[index + offset - 1];
    const isAfterBlankLine = previous === undefined || previous.trim() === '';

    lines.push({
      text,
      level: !fence && !fenceMatch ? (text.match(HEADING)?.[1]?.length ?? 0) : 0,
      // A line of dashes right below a paragraph is a Setext heading underline, not a separator.
      isBreak: !fence && !fenceMatch && isAfterBlankLine && THEMATIC_BREAK.test(text),
      isFrontmatter: false,
    });
  });

  return lines;
};

const retitle = (text: string, level: number) => {
  const content = text.match(HEADING)?.[2] ?? '';

  return `${'#'.repeat(level)} ${content.match(BOLD_ONLY)?.[1] ?? content}`;
};

/**
 * Splits Markdown into blocks, each starting at a section heading, for pages that render every section as a separate
 * block. The section level is the shallowest of `##` and `###` used in the document. Along the way:
 *
 * - thematic breaks (`---`) are dropped, the blocks are separated visually instead,
 * - headings are shifted so that section headings become `##` and the page keeps a consistent hierarchy,
 * - a heading that opens the first block ahead of the first section (e.g. a status table) becomes a `##` too,
 * - a heading wrapped entirely in bold loses the bold, the heading already is bold.
 *
 * Front matter and anything inside fenced code stay untouched and end up in the first block.
 *
 * @param source
 */
export const splitMarkdownSections = (source: string): string[] => {
  const lines = classifyLines(source);
  const sectionLevel = Math.min(...lines.map(({ level }) => level).filter((level) => level === 2 || level === 3), 3);
  const shift = sectionLevel - BLOCK_TITLE_LEVEL;
  const firstSectionIndex = lines.findIndex(({ level }) => level === sectionLevel);
  const firstHeadingIndex = lines.findIndex(({ level }) => level > 0);
  const hasLeadingHeading = firstHeadingIndex >= 0 && (firstSectionIndex < 0 || firstHeadingIndex < firstSectionIndex);
  const blocks: string[][] = [[]];
  let hasBody = false;

  lines.forEach((line, index) => {
    if (line.isBreak) {
      return;
    }

    let { text } = line;

    if (line.level >= BLOCK_TITLE_LEVEL) {
      const isLeadingTitle = hasLeadingHeading && index === firstHeadingIndex;
      const level = isLeadingTitle ? BLOCK_TITLE_LEVEL : Math.max(BLOCK_TITLE_LEVEL, line.level - shift);

      text = retitle(text, level);
    }

    const startsSection = line.level === sectionLevel || (hasLeadingHeading && index === firstHeadingIndex);
    // Front matter does not count as content, so the first section never ends up in a block of its own.
    if (startsSection && hasBody) {
      blocks.push([]);
      hasBody = false;
    }

    hasBody = hasBody || (!line.isFrontmatter && text.trim() !== '');

    blocks[blocks.length - 1]?.push(text);
  });

  return blocks.map((block) => block.join('\n').trimEnd()).filter(Boolean);
};
