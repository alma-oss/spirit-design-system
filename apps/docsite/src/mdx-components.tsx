import { UNSTABLE_Table } from '@alma-oss/spirit-web-react';
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    table: ({ children, ...props }) => (
      <UNSTABLE_Table isBordered isStriped {...props}>
        {children}
      </UNSTABLE_Table>
    ),
    ...components,
  };
}
