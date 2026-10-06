// @ts-nocheck -- MDX intrinsic element props include LegacyRef (string refs), which conflicts with Spirit Heading ref typing when spreading MDX props.
import { Heading, ScrollView, UNSTABLE_Table } from '@alma-oss/spirit-web-react';
import { markdownHeadingPropsByTag, type MarkdownHeadingTag } from '@local/domains/content/markdownHeadings';
import Embed from '@local/domains/content/ui/Embed';
import type { MDXComponents } from 'mdx/types';

const markdownHeading = (tag: MarkdownHeadingTag) => (props) => (
  <Heading {...props} elementType={tag} {...markdownHeadingPropsByTag[tag]} />
);

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: () => null,
    h2: markdownHeading('h2'),
    h3: markdownHeading('h3'),
    h4: markdownHeading('h4'),
    h5: markdownHeading('h5'),
    h6: markdownHeading('h6'),
    table: ({ children, ...props }) => (
      <div className="d-grid mb-1200">
        <ScrollView direction="horizontal" isScrollbarDisabled>
          <UNSTABLE_Table {...props}>{children}</UNSTABLE_Table>
        </ScrollView>
      </div>
    ),
    iframe: Embed,
    ...components,
  };
}
