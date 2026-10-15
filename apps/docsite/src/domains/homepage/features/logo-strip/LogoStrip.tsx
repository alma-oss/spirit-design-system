'use client';

import { Grid, GridItem, PartnerLogo, ProductLogo } from '@alma-oss/spirit-web-react';
import PageSection from '../../ui/PageSection';
import './LogoStrip.scss';

const LOGOS_PATH = '/logos';

interface Logo {
  name: string;
  file: string;
  isPartner?: boolean;
}

const logos: Logo[] = [
  { name: 'Alma Career', file: 'alma-career.svg', isPartner: true },
  { name: 'Jobs.cz', file: 'jobs-cz.svg' },
  { name: 'Práce.cz', file: 'prace-cz.svg' },
  { name: 'CVonline.lt', file: 'cvonline.svg' },
  { name: 'Seduo', file: 'seduo.svg' },
];

const LogoImage = ({ name, file, isPartner = false, isColor = false }: Logo & { isColor?: boolean }) => {
  const image = (
    <img
      src={`${LOGOS_PATH}/${isColor ? 'color' : 'grey'}/${file}`}
      alt={isColor ? '' : name}
      aria-hidden={isColor ? true : undefined}
    />
  );

  if (isPartner) {
    return (
      <PartnerLogo size="small" hasSafeArea={false}>
        {image}
      </PartnerLogo>
    );
  }

  return <ProductLogo>{image}</ProductLogo>;
};

const LogoStrip = () => (
  <PageSection size="medium" hasTopLine backgroundColor="primary">
    <Grid cols={{ mobile: 2, tablet: 5 }} spacing="space-1000" alignmentY="center">
      {logos.map((logo) => (
        <GridItem key={logo.name} UNSAFE_className="LogoStrip__cell">
          <Grid cols={1} alignmentX="center" alignmentY="center">
            <GridItem columnStart={1} rowStart={1} UNSAFE_className="LogoStrip__grey">
              <LogoImage {...logo} />
            </GridItem>
            <GridItem columnStart={1} rowStart={1} UNSAFE_className="LogoStrip__color">
              <LogoImage {...logo} isColor />
            </GridItem>
          </Grid>
        </GridItem>
      ))}
    </Grid>
  </PageSection>
);

export default LogoStrip;
