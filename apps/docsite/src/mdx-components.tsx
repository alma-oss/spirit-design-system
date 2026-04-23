import { Heading, ScrollView, UNSTABLE_Table } from '@alma-oss/spirit-web-react';
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: () => null,
    h2: ({ children, ...props }) => (
      <Heading elementType="h2" size="small" marginBottom="space-600" marginTop="space-1200" {...props}>
        {children}
      </Heading>
    ),
    h3: ({ children, ...props }) => (
      <Heading elementType="h3" size="xsmall" marginBottom="space-600" marginTop="space-1200" {...props}>
        {children}
      </Heading>
    ),
    h4: ({ children, ...props }) => (
      <Heading elementType="h4" size="xsmall" marginBottom="space-600" marginTop="space-1200" {...props}>
        {children}
      </Heading>
    ),
    h5: ({ children, ...props }) => (
      <Heading elementType="h5" size="xsmall" marginBottom="space-600" marginTop="space-1200" {...props}>
        {children}
      </Heading>
    ),
    h6: ({ children, ...props }) => (
      <Heading elementType="h6" size="xsmall" marginBottom="space-600" marginTop="space-1200" {...props}>
        {children}
      </Heading>
    ),
    table: ({ children, ...props }) => (
      <div className="d-grid mb-1200">
        <ScrollView direction="horizontal" isScrollbarDisabled overflowDecorators="shadows">
          <UNSTABLE_Table {...props}>{children}</UNSTABLE_Table>
        </ScrollView>
      </div>
    ),
    ...components,
  };
}
