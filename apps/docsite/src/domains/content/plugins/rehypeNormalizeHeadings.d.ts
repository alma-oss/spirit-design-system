declare module '@local/domains/content/plugins/rehypeNormalizeHeadings.mjs' {
  export const normalizeMarkdownHeadingLevel: (
    stack: { original: number; normalized: number }[],
    rawLevel: number,
  ) => number;

  const rehypeNormalizeHeadings: () => (tree: { children?: unknown[] }) => void;

  export default rehypeNormalizeHeadings;
}
