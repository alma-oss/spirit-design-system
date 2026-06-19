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

const CardLogoDemo = () => (
  <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }}>
    <Card>
      <CardMedia>{MEDIA_IMAGE}</CardMedia>
      <CardLogo>
        <PartnerLogo>{LOGO}</PartnerLogo>
      </CardLogo>
      <CardBody>
        <CardEyebrow>Logo</CardEyebrow>
        <CardTitle isHeading>
          <CardLink href="#">Basic card with media and logo</CardLink>
        </CardTitle>
        {/* User content */}
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean fermentum risus id tortor. Integer lacinia.
          Sed vel lectus.
        </p>
        {/* End user content */}
      </CardBody>
      <CardFooter>
        <ButtonLink href="#" color="primary" size="small">
          Primary
        </ButtonLink>
        <ButtonLink href="#" color="secondary" size="small">
          Secondary
        </ButtonLink>
      </CardFooter>
    </Card>

    <Card isBoxed>
      <CardMedia>{MEDIA_IMAGE}</CardMedia>
      <CardLogo>
        <PartnerLogo>{LOGO}</PartnerLogo>
      </CardLogo>
      <CardBody>
        <CardEyebrow>Logo</CardEyebrow>
        <CardTitle isHeading>
          <CardLink href="#">Boxed card with media and logo</CardLink>
        </CardTitle>
        {/* User content */}
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean fermentum risus id tortor. Integer lacinia.
          Sed vel lectus.
        </p>
        {/* End user content */}
      </CardBody>
      <CardFooter>
        <ButtonLink href="#" color="primary" size="small">
          Primary
        </ButtonLink>
        <ButtonLink href="#" color="secondary" size="small">
          Secondary
        </ButtonLink>
      </CardFooter>
    </Card>

    <Card isBoxed>
      <CardMedia isExpanded>{MEDIA_IMAGE}</CardMedia>
      <CardLogo>
        <PartnerLogo>{LOGO}</PartnerLogo>
      </CardLogo>
      <CardBody>
        <CardEyebrow>Logo</CardEyebrow>
        <CardTitle isHeading>
          <CardLink href="#">Boxed card with expanded media and logo</CardLink>
        </CardTitle>
        {/* User content */}
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean fermentum risus id tortor. Integer lacinia.
          Sed vel lectus.
        </p>
        {/* End user content */}
      </CardBody>
      <CardFooter>
        <ButtonLink href="#" color="primary" size="small">
          Primary
        </ButtonLink>
        <ButtonLink href="#" color="secondary" size="small">
          Secondary
        </ButtonLink>
      </CardFooter>
    </Card>
  </Grid>
);

export default CardLogoDemo;
