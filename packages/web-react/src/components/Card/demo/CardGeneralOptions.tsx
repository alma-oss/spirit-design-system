import React from 'react';
import { Button, ButtonLink } from '../../Button';
import { Grid } from '../../Grid';
import Card from '../Card';
import CardBody from '../CardBody';
import CardEyebrow from '../CardEyebrow';
import CardFooter from '../CardFooter';
import CardLink from '../CardLink';
import CardMedia from '../CardMedia';
import CardTitle from '../CardTitle';
import { MEDIA_IMAGE } from './constants';

const CardGeneralOptions = () => (
  <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }}>
    <Card>
      <CardMedia>{MEDIA_IMAGE}</CardMedia>
      <CardBody>
        <CardEyebrow>Eyebrow title</CardEyebrow>
        <CardTitle isHeading>
          <CardLink href="#">Basic card</CardLink>
        </CardTitle>
        {/* User content */}
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean fermentum risus id tortor. Integer lacinia.
          Sed vel lectus.
        </p>
        <div className="link-primary link-underlined">Read more</div>
        {/* End user content */}
      </CardBody>
    </Card>

    <Card isBoxed>
      <CardMedia>{MEDIA_IMAGE}</CardMedia>
      <CardBody>
        <CardEyebrow>Eyebrow title</CardEyebrow>
        <CardTitle isHeading>
          <CardLink href="#">Boxed card</CardLink>
        </CardTitle>
        {/* User content */}
        <p>Lorem ipsum dolor sit amet.</p>
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
      <CardBody>
        <CardEyebrow>Eyebrow title</CardEyebrow>
        <CardTitle isHeading>
          <CardLink href="#">Boxed card, expanded media</CardLink>
        </CardTitle>
        {/* User content */}
        <p>Lorem ipsum dolor sit amet.</p>
        {/* End user content */}
      </CardBody>
      <CardFooter>
        <Button color="primary" size="small">
          Primary
        </Button>
        <Button color="secondary" size="small">
          Secondary
        </Button>
      </CardFooter>
    </Card>
  </Grid>
);

export default CardGeneralOptions;
