'use client';

import { Card, CardBody, CardLink, CardTitle } from '@alma-oss/spirit-web-react';
import { routes } from '@local/domains/routing/routes';
import NextLink from 'next/link';
import React from 'react';

interface HelperCardProps {
  helper: string;
  title: string;
}

const HelperCard = ({ helper, title }: HelperCardProps) => (
  <Card direction="horizontal" elementType="li" isBoxed>
    <CardBody>
      <CardTitle isHeading>
        <CardLink elementType={NextLink} href={routes.helper(helper)}>
          {title}
        </CardLink>
      </CardTitle>
    </CardBody>
  </Card>
);

export default HelperCard;
