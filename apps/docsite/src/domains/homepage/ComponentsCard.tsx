'use client';

import { Card, CardArtwork, CardBody, CardFooter, CardLink, CardTitle, Icon, Link } from '@alma-oss/spirit-web-react';
import { routes } from '@local/domains/routing/routes';
import NextLink from 'next/link';

const ComponentsCard = () => (
  <Card direction="horizontal" isBoxed>
    <CardArtwork>
      <Icon name="file" />
    </CardArtwork>
    <CardBody>
      <CardTitle isHeading>
        <CardLink elementType={NextLink} href={routes.components}>
          Components
        </CardLink>
      </CardTitle>
      <p>Our components are collection of interface elements that can be reused across the Spirit Design System.</p>
    </CardBody>
    <CardFooter alignmentX="right">
      <Link elementType={NextLink} href={routes.components} color="primary">
        See all components
      </Link>
    </CardFooter>
  </Card>
);

export default ComponentsCard;
