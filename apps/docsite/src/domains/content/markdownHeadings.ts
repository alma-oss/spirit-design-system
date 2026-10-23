import type { SpiritHeadingProps } from '@alma-oss/spirit-web-react';

export const MARKDOWN_HEADING_TAGS = ['h2', 'h3', 'h4', 'h5', 'h6'] as const;

export type MarkdownHeadingTag = (typeof MARKDOWN_HEADING_TAGS)[number];

export type MarkdownHeadingProps = Pick<SpiritHeadingProps, 'size' | 'marginTop' | 'marginBottom' | 'fontWeight'>;

/**
 * Page shells already render the single h1 at `xlarge`. Markdown headings sit under it
 * and step down the Heading scale. h5 and h6 share `xsmall`; weight separates them.
 */
export const markdownHeadingPropsByTag: Record<MarkdownHeadingTag, MarkdownHeadingProps> = {
  h2: { size: 'large', marginTop: 'space-1200', marginBottom: 'space-600' },
  h3: { size: 'medium', marginTop: 'space-1000', marginBottom: 'space-600' },
  h4: { size: 'small', marginTop: 'space-800', marginBottom: 'space-500' },
  h5: { size: 'xsmall', marginTop: 'space-700', marginBottom: 'space-400' },
  h6: { size: 'xsmall', marginTop: 'space-600', marginBottom: 'space-400', fontWeight: 'regular' },
};

/**
 * Component pages keep the smaller heading scale they had before the shared markdown scale.
 * The block's own padding supplies the space above its first heading.
 */
export const componentBlockHeadingPropsByTag: Record<MarkdownHeadingTag, MarkdownHeadingProps> = {
  h2: { size: 'small', marginTop: 'space-1200', marginBottom: 'space-600' },
  h3: { size: 'xsmall', marginTop: 'space-1200', marginBottom: 'space-600' },
  h4: { size: 'xsmall', marginTop: 'space-1200', marginBottom: 'space-600' },
  h5: { size: 'xsmall', marginTop: 'space-1200', marginBottom: 'space-600' },
  h6: { size: 'xsmall', marginTop: 'space-1200', marginBottom: 'space-600' },
};

// The first heading of a block sits in the block padding. Later headings keep the block scale.
export const componentBlockHeadingProps = (tag: MarkdownHeadingTag, isBlockTitle = false): MarkdownHeadingProps =>
  isBlockTitle
    ? { ...componentBlockHeadingPropsByTag[tag], fontWeight: 'semibold', marginTop: 'space-0' }
    : componentBlockHeadingPropsByTag[tag];
