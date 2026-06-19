import React from 'react';
import { ButtonLink } from '../../Button';
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

const CardResponsiveCard = () => (
  <Grid cols={{ mobile: 1, tablet: 2 }}>
    <Card direction={{ mobile: 'vertical', tablet: 'horizontal', desktop: 'horizontal-reversed' }} isBoxed>
      <CardMedia size="medium">{MEDIA_IMAGE}</CardMedia>
      <CardLogo>
        <PartnerLogo size="small" hasSafeArea>
          {LOGO}
        </PartnerLogo>
      </CardLogo>
      <CardBody>
        <CardEyebrow>Responsive card layout</CardEyebrow>
        <CardTitle isHeading>
          <CardLink href="#">Vertical → horizontal → reversed horizontal</CardLink>
        </CardTitle>
        {/* User content */}
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
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
    <Card direction={{ mobile: 'vertical', tablet: 'horizontal', desktop: 'horizontal-reversed' }} isBoxed>
      <CardMedia size="medium" isExpanded>
        {MEDIA_IMAGE}
      </CardMedia>
      <CardLogo>
        <PartnerLogo size="small" hasSafeArea>
          {LOGO}
        </PartnerLogo>
      </CardLogo>
      <CardBody>
        <CardEyebrow>Responsive card layout</CardEyebrow>
        <CardTitle isHeading>
          <CardLink href="#">Vertical → horizontal → reversed horizontal, expanded media</CardLink>
        </CardTitle>
        {/* User content */}
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
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

export default CardResponsiveCard;
