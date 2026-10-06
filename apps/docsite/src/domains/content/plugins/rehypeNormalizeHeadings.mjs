const HEADING_TAG = /^h([1-6])$/;
const PAGE_HEADING_LEVEL = 1;
const MIN_MARKDOWN_HEADING_LEVEL = 2;
const MAX_HEADING_LEVEL = 6;

export const normalizeMarkdownHeadingLevel = (stack, rawLevel) => {
  while (stack.length > 0 && stack.at(-1).original >= rawLevel) {
    stack.pop();
  }

  const parentNormalized = stack.at(-1)?.normalized ?? PAGE_HEADING_LEVEL;
  const level = Math.min(MAX_HEADING_LEVEL, Math.max(MIN_MARKDOWN_HEADING_LEVEL, parentNormalized + 1));

  stack.push({ original: rawLevel, normalized: level });

  return level;
};

const isSkippedContainer = (node) => node.type === 'element' && (node.tagName === 'pre' || node.tagName === 'code');

const walk = (node, stack) => {
  if (!node?.children || isSkippedContainer(node)) {
    return;
  }

  node.children = node.children.flatMap((child) => {
    const match = child?.type === 'element' ? HEADING_TAG.exec(child.tagName ?? '') : null;

    if (match) {
      const rawLevel = Number(match[1]);

      if (rawLevel === 1) {
        stack.length = 0;

        return [];
      }

      child.tagName = `h${normalizeMarkdownHeadingLevel(stack, rawLevel)}`;
    }

    walk(child, stack);

    return [child];
  });
};

const rehypeNormalizeHeadings = () => (tree) => {
  walk(tree, []);
};

export default rehypeNormalizeHeadings;
