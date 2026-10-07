'use client';

import { Grid, GridItem, PartnerLogo, ProductLogo } from '@alma-oss/spirit-web-react';
import styles from './LogoStrip.module.scss';
import PageSection from './PageSection';

const LOGOS_PATH = '/logos';

interface Logo {
  name: string;
  file: string;
  isPartner?: boolean;
  /** Height of the logo as designed. */
  heightClassName: string;
}

const logos: Logo[] = [
  { name: 'Alma Career', file: 'alma-career.svg', isPartner: true, heightClassName: styles.HeightAlma },
  { name: 'Jobs.cz', file: 'jobs-cz.svg', heightClassName: styles.HeightProduct },
  { name: 'Práce.cz', file: 'prace-cz.svg', heightClassName: styles.HeightPrace },
  { name: 'CVonline.lt', file: 'cvonline.svg', heightClassName: styles.HeightProduct },
  { name: 'Seduo', file: 'seduo.svg', heightClassName: styles.HeightProduct },
];

// The logos are grey until hovered, then their own colors fade in.
const LogoImages = ({ name, file }: Pick<Logo, 'name' | 'file'>) => (
  <>
    <img className={styles.Grey} src={`${LOGOS_PATH}/grey/${file}`} alt={name} />
    <img className={styles.Color} src={`${LOGOS_PATH}/color/${file}`} alt="" aria-hidden="true" />
  </>
);

const LogoStrip = () => (
  <PageSection size="medium" hasTopLine backgroundColor="primary">
    <Grid cols={{ mobile: 2, tablet: 5 }} spacing="space-1000" alignmentY="center">
      {logos.map(({ name, file, isPartner, heightClassName }) => (
        <GridItem key={name} UNSAFE_className={styles.Cell}>
          {isPartner ? (
            <PartnerLogo size="small" hasSafeArea={false} UNSAFE_className={`${styles.Logo} ${heightClassName}`}>
              <LogoImages name={name} file={file} />
            </PartnerLogo>
          ) : (
            <ProductLogo UNSAFE_className={`${styles.Logo} ${heightClassName}`}>
              <LogoImages name={name} file={file} />
            </ProductLogo>
          )}
        </GridItem>
      ))}
    </Grid>
  </PageSection>
);

export default LogoStrip;
