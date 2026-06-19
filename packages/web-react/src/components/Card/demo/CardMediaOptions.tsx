import React from 'react';
import { ObjectFit } from '../../../constants';
import { ButtonLink } from '../../ButtonLink';
import { Grid, GridItem } from '../../Grid';
import Card from '../Card';
import CardBody from '../CardBody';
import CardEyebrow from '../CardEyebrow';
import CardFooter from '../CardFooter';
import CardLink from '../CardLink';
import CardMedia from '../CardMedia';
import CardTitle from '../CardTitle';
import { MEDIA_IMAGE } from './constants';

export const CardMediaOptions = () => (
  <Grid cols={{ mobile: 1, tablet: 2, desktop: 4 }} UNSAFE_style={{ gridAutoFlow: 'dense' }}>
    <GridItem UNSAFE_className="d-grid" rowEnd={{ desktop: 'span 2' }}>
      <Card isBoxed>
        <CardMedia>{MEDIA_IMAGE}</CardMedia>
        <CardBody>
          <CardEyebrow>Media options</CardEyebrow>
          <CardTitle isHeading>
            <CardLink href="#">Auto size</CardLink>
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
    </GridItem>

    <GridItem UNSAFE_className="d-grid" rowEnd={{ desktop: 'span 2' }}>
      <Card isBoxed>
        <CardMedia isExpanded>{MEDIA_IMAGE}</CardMedia>
        <CardBody>
          <CardEyebrow>Media options</CardEyebrow>
          <CardTitle isHeading>
            <CardLink href="#">Auto size, expanded</CardLink>
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
    </GridItem>

    <GridItem UNSAFE_className="d-grid" columnEnd={{ tablet: 'span 2' }}>
      <Card direction="horizontal" isBoxed>
        <CardMedia size="medium">{MEDIA_IMAGE}</CardMedia>
        <CardBody>
          <CardEyebrow>Media options</CardEyebrow>
          <CardTitle isHeading>
            <CardLink href="#">Medium size</CardLink>
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
    </GridItem>

    <GridItem UNSAFE_className="d-grid" columnEnd={{ tablet: 'span 2' }}>
      <Card direction="horizontal" isBoxed>
        <CardMedia size="medium" hasFilledHeight>
          {MEDIA_IMAGE}
        </CardMedia>
        <CardBody>
          <CardEyebrow>Media options</CardEyebrow>
          <CardTitle isHeading>
            <CardLink href="#">Medium size, filled height</CardLink>
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
    </GridItem>

    <GridItem UNSAFE_className="d-grid" columnEnd={{ tablet: 'span 2', desktop: 'span 4' }}>
      <Card direction="horizontal" isBoxed>
        <CardMedia size="medium" isExpanded>
          <img src="https://picsum.photos/id/200/360/240" alt="" />
        </CardMedia>
        <CardBody>
          <CardEyebrow>Media options</CardEyebrow>
          <CardTitle isHeading>
            <CardLink href="#">Medium size, expanded</CardLink>
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
    </GridItem>

    <GridItem UNSAFE_className="d-grid" columnEnd={{ tablet: 'span 2', desktop: 'span 4' }}>
      <Card direction="horizontal" isBoxed>
        <CardMedia size="medium" isExpanded backgroundColor="emotion-warning-basic" fit={ObjectFit.CONTAIN}>
          <img src="https://picsum.photos/id/200/360/240" alt="" />
        </CardMedia>
        <CardBody>
          <CardEyebrow>Media options</CardEyebrow>
          <CardTitle isHeading>
            <CardLink href="#">Medium size, expanded, warning background color, contain object fit</CardLink>
          </CardTitle>
          {/* User content */}
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean fermentum risus id tortor. Integer lacinia.
            Sed vel lectus.
          </p>
          {/* End user content */}
        </CardBody>
        <CardFooter>
          <ButtonLink href="#" size="small">
            Primary
          </ButtonLink>
          <ButtonLink href="#" color="secondary" size="small">
            Secondary
          </ButtonLink>
        </CardFooter>
      </Card>
    </GridItem>
  </Grid>
);
