'use client';

import { Section } from '@alma-oss/spirit-web-react';
import { type ComponentProps } from 'react';
import styles from './PageSection.module.scss';

type SectionSize = 'small' | 'medium' | 'large' | 'xlarge';
type SectionPadding = SectionSize | 'none';

interface PageSectionProps extends Pick<ComponentProps<typeof Section>, 'backgroundColor' | 'children'> {
  /** Vertical padding of the section, it is set on the container so that its edges run through the whole section. */
  size: SectionSize;
  paddingTop?: SectionPadding;
  paddingBottom?: SectionPadding;
  /** Draws a decorative full-width line at the top of the section, it joins the lines at the container edges. */
  hasTopLine?: boolean;
  /** Draws the lines at the container edges, they run through the whole section. */
  hasRails?: boolean;
  className?: string;
}

const PageSection = ({
  size,
  paddingTop = size,
  paddingBottom = size,
  hasTopLine = false,
  hasRails = true,
  backgroundColor = undefined,
  className = undefined,
  children,
}: PageSectionProps) => (
  <Section
    paddingY="space-0"
    backgroundColor={backgroundColor}
    UNSAFE_className={[hasTopLine && styles.TopLine, className].filter(Boolean).join(' ') || undefined}
    containerProps={{
      UNSAFE_className: [
        styles.Container,
        !hasRails && styles['Container--withoutRails'],
        styles[`PaddingTop--${paddingTop}`],
        styles[`PaddingBottom--${paddingBottom}`],
      ]
        .filter(Boolean)
        .join(' '),
    }}
  >
    {children}
  </Section>
);

export default PageSection;
