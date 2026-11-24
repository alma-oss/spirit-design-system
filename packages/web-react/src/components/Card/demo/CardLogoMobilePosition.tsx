import React from 'react';
import { ButtonLink } from '../../ButtonLink';
import { Grid } from '../../Grid';
import { PartnerLogo } from '../../PartnerLogo';
import Card from '../Card';
import CardBody from '../CardBody';
import CardEyebrow from '../CardEyebrow';
import CardFooter from '../CardFooter';
import CardLink from '../CardLink';
import CardLogo from '../CardLogo';
import CardMedia from '../CardMedia';
import CardTitle from '../CardTitle';
import { LOGO, MEDIA_IMAGE } from './constants';

const CardLogoMobilePosition = () => (
  <div className="spirit-feature-enable-v6-card-logo-mobile-position">
    <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }}>
      <Card isBoxed>
        <CardMedia>{MEDIA_IMAGE}</CardMedia>
        <CardLogo>
          <PartnerLogo size="small">{LOGO}</PartnerLogo>
        </CardLogo>
        <CardBody>
          <CardEyebrow>Logo</CardEyebrow>
          <CardTitle isHeading>
            <CardLink href="#">Boxed card with the logo in the corner of the media on mobile</CardLink>
          </CardTitle>
        </CardBody>
        <CardFooter>
          <ButtonLink href="#" color="primary" size="small">
            Primary
          </ButtonLink>
        </CardFooter>
      </Card>
    </Grid>
  </div>
);

export default CardLogoMobilePosition;
