import { useMDXComponents as getMDXComponents } from '@local/mdx-components';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

export const compileCanonicalSource = async (source: string) => {
  const components = getMDXComponents({});

  return compileMDX<{ title?: string }>({
    source,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, { theme: 'tokyo-night' }]],
      },
    },
  });
};
