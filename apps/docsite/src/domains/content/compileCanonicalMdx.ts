import rehypeNormalizeHeadings from '@local/domains/content/plugins/rehypeNormalizeHeadings.mjs';
import { useMDXComponents as getMDXComponents } from '@local/mdx-components';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

/**
 * Canonical Pages are authored as MDX. Repository Markdown (changelogs, migration
 * guides) is GitHub-flavoured Markdown with raw HTML, so it compiles as `md` and
 * keeps its HTML through `rehype-raw` instead of being parsed as JSX.
 *
 * @param source
 * @param isCanonical
 */
export const compileCanonicalSource = async (source: string, isCanonical = true) => {
  const components = getMDXComponents({});

  return compileMDX<{ title?: string }>({
    source,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        format: isCanonical ? 'mdx' : 'md',
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          ...(isCanonical ? [] : [rehypeRaw]),
          rehypeNormalizeHeadings,
          [rehypePrettyCode, { theme: 'tokyo-night' }],
        ],
      },
    },
  });
};
