'use client';

import { Button } from '@alma-oss/spirit-web-react';
import NextLink from 'next/link';

const ExploreMoreButton = () => (
  <Button elementType={NextLink} size="large" href="/design/intro">
    Explore more
  </Button>
);

export default ExploreMoreButton;
