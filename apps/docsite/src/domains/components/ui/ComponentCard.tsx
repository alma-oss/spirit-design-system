'use client';

import { Card, CardBody, CardLink, CardTitle } from '@alma-oss/spirit-web-react';
import { routes } from '@local/domains/routing/routes';
import NextLink from 'next/link';
import React from 'react';

interface ComponentCardProps {
  component: string;
}

const ComponentCard = ({ component }: ComponentCardProps) => (
  <li className="d-grid">
    <Card direction="horizontal" isBoxed>
      <CardBody>
        <CardTitle isHeading>
          <CardLink elementType={NextLink} href={routes.component(component)}>
            {component}
          </CardLink>
        </CardTitle>
      </CardBody>
    </Card>
  </li>
);

export default ComponentCard;
