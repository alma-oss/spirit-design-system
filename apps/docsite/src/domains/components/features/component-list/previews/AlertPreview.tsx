'use client';

import { Alert, Link } from '@alma-oss/spirit-web-react';
import React from 'react';

const AlertPreview = () => (
  <Alert color="informative">
    Alert message with a{' '}
    <Link href="/components" color="inherit" underlined="always">
      link
    </Link>
  </Alert>
);

export default AlertPreview;
