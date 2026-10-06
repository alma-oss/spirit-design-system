// @ts-nocheck -- MDX intrinsic element props include LegacyRef (string refs), which conflicts with Spirit Heading ref typing when spreading MDX props.
import { Heading, ScrollView, UNSTABLE_Table } from '@alma-oss/spirit-web-react';
import {
  componentBlockHeadingProps,
  markdownHeadingPropsByTag,
  MARKDOWN_HEADING_TAGS,
  type MarkdownHeadingProps,
  type MarkdownHeadingTag,
} from '@local/domains/content/markdownHeadings';
import Embed from '@local/domains/content/ui/Embed';
import type { MDXComponents } from 'mdx/types';

const markdownHeading =
  (tag: MarkdownHeadingTag, propsByTag: Record<MarkdownHeadingTag, MarkdownHeadingProps>) => (props) => (
    <Heading {...props} elementType={tag} {...propsByTag[tag]} />
  );

const componentBlockHeading = (tag: MarkdownHeadingTag) => (props) => {
  // MDX passes the block-title flag as a hast property, which is not a declared React prop.
  // eslint-disable-next-line react/prop-types, react/destructuring-assignment
  const isBlockTitle = Boolean(props['data-block-title'] || props.dataBlockTitle);
  const headingProps = { ...props };

  delete headingProps['data-block-title'];
  delete headingProps.dataBlockTitle;

  return <Heading {...headingProps} elementType={tag} {...componentBlockHeadingProps(tag, isBlockTitle)} />;
};

export const componentBlockHeadingComponents = Object.fromEntries(
  MARKDOWN_HEADING_TAGS.map((tag) => [tag, componentBlockHeading(tag)]),
);

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: () => null,
    h2: markdownHeading('h2', markdownHeadingPropsByTag),
    h3: markdownHeading('h3', markdownHeadingPropsByTag),
    h4: markdownHeading('h4', markdownHeadingPropsByTag),
    h5: markdownHeading('h5', markdownHeadingPropsByTag),
    h6: markdownHeading('h6', markdownHeadingPropsByTag),
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
