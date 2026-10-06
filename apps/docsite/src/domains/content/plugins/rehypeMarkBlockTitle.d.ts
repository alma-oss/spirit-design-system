declare module '@local/domains/content/plugins/rehypeMarkBlockTitle.mjs' {
  const rehypeMarkBlockTitle: () => (tree: {
    children?: { type?: string; tagName?: string; properties?: Record<string, unknown> }[];
  }) => void;

  export default rehypeMarkBlockTitle;
}
