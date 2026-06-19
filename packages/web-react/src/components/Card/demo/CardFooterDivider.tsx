import React from 'react';
import { Flex } from '../../Flex';
import { Grid } from '../../Grid';
import { Icon } from '../../Icon';
import { Link } from '../../Link';
import { PartnerLogo } from '../../PartnerLogo';
import { Tag } from '../../Tag';
import { Text } from '../../Text';
import { VisuallyHidden } from '../../VisuallyHidden';
import Card from '../Card';
import CardBody from '../CardBody';
import CardFooter from '../CardFooter';
import CardLink from '../CardLink';
import CardLogo from '../CardLogo';
import CardMedia from '../CardMedia';
import CardTitle from '../CardTitle';
import { LOGO, MEDIA_IMAGE } from './constants';

const CardFooterDivider = () => (
  <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }}>
    <Card isBoxed>
      <CardMedia size="small" isExpanded>
        {MEDIA_IMAGE}
      </CardMedia>
      <CardLogo>
        <PartnerLogo>{LOGO}</PartnerLogo>
      </CardLogo>
      <CardBody>
        <CardTitle isHeading>
          <CardLink href="#">Alma Career Czech Republic s.r.o.</CardLink>
        </CardTitle>
        <Flex alignmentY="center" elementType="dl" spacing="space-0">
          <VisuallyHidden elementType="dt">Branch:</VisuallyHidden>
          <dd className="mr-600">Consultancy</dd>
          <VisuallyHidden elementType="dt">Number of employees:</VisuallyHidden>
          <Icon name="profile" boxSize={20} marginRight="space-300" />
          <dd>250–499</dd>
        </Flex>
        <Text marginBottom="space-0">
          In a nutshell, we connect… the right people with the right companies. We are Alma Career, a technology group,
          that is improving the world of work in 9 European countries.
        </Text>
      </CardBody>
      <CardFooter hasDivider>
        <Tag isSubtle size="small">
          2 open positions
        </Tag>
      </CardFooter>
    </Card>

    <Card isBoxed>
      <CardMedia size="small" isExpanded>
        {MEDIA_IMAGE}
      </CardMedia>
      <CardBody>
        <CardTitle isHeading>
          <CardLink href="#">JobBoard Technologies s.r.o.</CardLink>
        </CardTitle>
        <Flex alignmentY="center" elementType="dl" spacing="space-0">
          <VisuallyHidden elementType="dt">Branch:</VisuallyHidden>
          <dd className="mr-600">IT & Software</dd>
          <VisuallyHidden elementType="dt">Number of employees:</VisuallyHidden>
          <Icon name="profile" boxSize={20} marginRight="space-300" />
          <dd>250–499</dd>
        </Flex>
        <Text marginBottom="space-0">
          In a nutshell, we connect… the right people with the right companies. We are Alma Career, a technology group,
          that is improving the world of work in 9 European countries.
        </Text>
      </CardBody>
      <CardFooter hasDivider>
        <Link href="#open-positions">5 open positions</Link>
      </CardFooter>
    </Card>
  </Grid>
);

export default CardFooterDivider;
