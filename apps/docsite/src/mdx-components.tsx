import { Heading, UNSTABLE_Table } from '@alma-oss/spirit-web-react';
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <Heading elementType="h1" size="xlarge" {...props}>
        {children}
      </Heading>
    ),
    h2: ({ children, ...props }) => (
      <Heading elementType="h2" size="large" {...props}>
        {children}
      </Heading>
    ),
    h3: ({ children, ...props }) => (
      <Heading elementType="h3" size="medium" {...props}>
        {children}
      </Heading>
    ),
    h4: ({ children, ...props }) => (
      <Heading elementType="h4" size="small" {...props}>
        {children}
      </Heading>
    ),
    h5: ({ children, ...props }) => (
      <Heading elementType="h5" size="xsmall" {...props}>
        {children}
      </Heading>
    ),
    h6: ({ children, ...props }) => (
      <Heading elementType="h6" size="xsmall" {...props}>
        {children}
      </Heading>
    ),
    table: ({ children, ...props }) => (
      <UNSTABLE_Table isBordered isStriped {...props}>
        {children}
      </UNSTABLE_Table>
    ),
    ...components,
  };
}
