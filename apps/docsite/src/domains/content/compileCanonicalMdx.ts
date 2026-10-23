import rehypeMarkBlockTitle from '@local/domains/content/plugins/rehypeMarkBlockTitle.mjs';
import rehypeNormalizeHeadings from '@local/domains/content/plugins/rehypeNormalizeHeadings.mjs';
import { useMDXComponents as getMDXComponents } from '@local/mdx-components';
import type { MDXComponents } from 'mdx/types';
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
 * @param componentsOverride
 */
export const compileCanonicalSource = async (
  source: string,
  isCanonical = true,
  componentsOverride?: MDXComponents,
) => {
  const components = getMDXComponents(componentsOverride ?? {});

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
          ...(componentsOverride ? [rehypeMarkBlockTitle] : []),
          [rehypePrettyCode, { theme: 'tokyo-night' }],
        ],
      },
    },
  });
};
