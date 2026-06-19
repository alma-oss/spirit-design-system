import React from 'react';
import { ButtonLink } from '../../ButtonLink';
import { Grid } from '../../Grid';
import Card from '../Card';
import CardBody from '../CardBody';
import CardEyebrow from '../CardEyebrow';
import CardFooter from '../CardFooter';
import CardLink from '../CardLink';
import CardMedia from '../CardMedia';
import CardTitle from '../CardTitle';
import { MEDIA_IMAGE } from './constants';

const CardMediaSizes = () => (
  <>
    <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }} marginBottom="space-1200">
      <Card isBoxed>
        <CardMedia size="small" isExpanded>
          {MEDIA_IMAGE}
        </CardMedia>
        <CardBody>
          <CardEyebrow>Media size</CardEyebrow>
          <CardTitle isHeading>
            <CardLink href="#">Small</CardLink>
          </CardTitle>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean fermentum risus id tortor. Integer lacinia.
            Sed vel lectus.
          </p>
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
        <CardMedia size="medium" isExpanded>
          {MEDIA_IMAGE}
        </CardMedia>
        <CardBody>
          <CardEyebrow>Media size</CardEyebrow>
          <CardTitle isHeading>
            <CardLink href="#">Medium</CardLink>
          </CardTitle>
          <p>Lorem ipsum dolor sit amet.</p>
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
        <CardMedia size="large" isExpanded>
          {MEDIA_IMAGE}
        </CardMedia>
        <CardBody>
          <CardEyebrow>Media size</CardEyebrow>
          <CardTitle isHeading>
            <CardLink href="#">Large</CardLink>
          </CardTitle>
          <p>Lorem ipsum dolor sit amet.</p>
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
        <CardMedia size="auto" isExpanded>
          {MEDIA_IMAGE}
        </CardMedia>
        <CardBody>
          <CardEyebrow>Media size</CardEyebrow>
          <CardTitle isHeading>
            <CardLink href="#">Auto</CardLink>
          </CardTitle>
          <p>Lorem ipsum dolor sit amet.</p>
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

    <Grid cols={1}>
      <Card direction="horizontal" isBoxed>
        <CardMedia size="small" isExpanded>
          {MEDIA_IMAGE}
        </CardMedia>
        <CardBody>
          <CardEyebrow>Media size</CardEyebrow>
          <CardTitle isHeading>
            <CardLink href="#">Small</CardLink>
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

      <Card direction="horizontal" isBoxed>
        <CardMedia size="medium" isExpanded>
          {MEDIA_IMAGE}
        </CardMedia>
        <CardBody>
          <CardEyebrow>Media size</CardEyebrow>
          <CardTitle isHeading>
            <CardLink href="#">Medium</CardLink>
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

      <Card direction="horizontal" isBoxed>
        <CardMedia size="large" isExpanded>
          {MEDIA_IMAGE}
        </CardMedia>
        <CardBody>
          <CardEyebrow>Media size</CardEyebrow>
          <CardTitle isHeading>
            <CardLink href="#">Large</CardLink>
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

      <Card direction="horizontal" isBoxed>
        <CardMedia size="auto" isExpanded>
          {MEDIA_IMAGE}
        </CardMedia>
        <CardBody>
          <CardEyebrow>Media size</CardEyebrow>
          <CardTitle isHeading>
            <CardLink href="#">Auto</CardLink>
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
    </Grid>
  </>
);

export default CardMediaSizes;
