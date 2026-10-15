import { Section } from '@alma-oss/spirit-web-react';
import { type ComponentProps } from 'react';
import './PageSection.scss';

type SectionSize = 'small' | 'medium' | 'large' | 'xlarge';

// The same vertical padding `Section` `size` applies. Split top and bottom use the tokens directly.
const sectionPadding = {
  small: { mobile: 'space-1000', tablet: 'space-1100' },
  medium: { mobile: 'space-1100', tablet: 'space-1300' },
  large: { mobile: 'space-1200', tablet: 'space-1400' },
  xlarge: { mobile: 'space-1400', tablet: 'space-1600' },
} as const;

interface PageSectionProps extends Pick<
  ComponentProps<typeof Section>,
  'backgroundColor' | 'children' | 'hasContainer'
> {
  /** Vertical padding, matching `Section` `size`. */
  size: SectionSize;
  paddingTop?: SectionSize;
  paddingBottom?: SectionSize;
  /** Draws a full-width line at the top of the section. It joins the rails at the container edges. */
  hasTopLine?: boolean;
  /** Draws the lines at the container edges. They run through the whole section. */
  hasRails?: boolean;
  className?: string;
}

const PageSection = ({
  size,
  paddingTop = size,
  paddingBottom = size,
  hasTopLine = false,
  hasRails = true,
  hasContainer = true,
  backgroundColor = undefined,
  className = undefined,
  children,
}: PageSectionProps) => (
  <Section
    hasContainer={hasContainer}
    backgroundColor={backgroundColor}
    {...(paddingTop === paddingBottom
      ? { size: paddingTop }
      : { paddingTop: sectionPadding[paddingTop], paddingBottom: sectionPadding[paddingBottom] })}
    UNSAFE_className={
      ['PageSection', hasRails && 'PageSection--rails', hasTopLine && 'PageSection--topLine', className]
        .filter(Boolean)
        .join(' ') || undefined
    }
  >
    {children}
  </Section>
);

export default PageSection;
