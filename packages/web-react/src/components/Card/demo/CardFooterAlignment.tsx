import React from 'react';
import { ButtonLink } from '../../ButtonLink';
import { Grid } from '../../Grid';
import Card from '../Card';
import CardBody from '../CardBody';
import CardEyebrow from '../CardEyebrow';
import CardFooter from '../CardFooter';
import CardLink from '../CardLink';
import CardTitle from '../CardTitle';

const CardFooterAlignment = () => (
  <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }}>
    <Card isBoxed>
      <CardBody>
        <CardEyebrow>Footer alignment</CardEyebrow>
        <CardTitle isHeading>
          <CardLink href="#">Left</CardLink>
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
      <CardBody>
        <CardEyebrow>Footer alignment</CardEyebrow>
        <CardTitle isHeading>
          <CardLink href="#">Center</CardLink>
        </CardTitle>
        {/* User content */}
        <p>Lorem ipsum dolor sit amet.</p>
        {/* End user content */}
      </CardBody>
      <CardFooter alignmentX="center">
        <ButtonLink href="#" color="primary" size="small">
          Primary
        </ButtonLink>
        <ButtonLink href="#" color="secondary" size="small">
          Secondary
        </ButtonLink>
      </CardFooter>
    </Card>
    <Card isBoxed>
      <CardBody>
        <CardEyebrow>Footer alignment</CardEyebrow>
        <CardTitle isHeading>
          <CardLink href="#">Right</CardLink>
        </CardTitle>
        {/* User content */}
        <p>Lorem ipsum dolor sit amet.</p>
        {/* End user content */}
      </CardBody>
      <CardFooter alignmentX="right">
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

export default CardFooterAlignment;
