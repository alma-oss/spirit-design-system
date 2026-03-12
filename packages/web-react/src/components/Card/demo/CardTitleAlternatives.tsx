import React from 'react';
import { Grid } from '../../Grid';
import { Heading } from '../../Heading';
import { Text } from '../../Text';
import Card from '../Card';
import CardBody from '../CardBody';
import CardLink from '../CardLink';
import CardMedia from '../CardMedia';
import { MEDIA_IMAGE } from './constants';

const CardTitleAlternatives = () => (
  <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }}>
    <Card isBoxed>
      <CardMedia isExpanded>{MEDIA_IMAGE}</CardMedia>
      <CardBody>
        <Heading elementType="h4" size="xsmall" emphasis="semibold" textColor="primary" marginBottom="space-500">
          <CardLink href="#">Card title</CardLink>
        </Heading>
        <p>Card content. The whole card is clickable via the title link.</p>
      </CardBody>
    </Card>

    <Card isBoxed>
      <CardMedia isExpanded>{MEDIA_IMAGE}</CardMedia>
      <CardBody>
        <Text elementType="h4" size="large" emphasis="regular" textColor="primary" marginBottom="space-500">
          <CardLink href="#">Card title</CardLink>
        </Text>
        <p>Card content. The whole card is clickable via the title link.</p>
      </CardBody>
    </Card>

    <Card isBoxed>
      <CardMedia isExpanded>{MEDIA_IMAGE}</CardMedia>
      <CardBody>
        <Heading elementType="h4" size="medium" emphasis="bold" textColor="secondary" marginBottom="space-700">
          Card title
        </Heading>
        <p>Card content. The whole card is clickable via the title link.</p>
      </CardBody>
    </Card>
  </Grid>
);

export default CardTitleAlternatives;
